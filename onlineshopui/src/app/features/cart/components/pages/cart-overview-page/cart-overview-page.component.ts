import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    computed,
    inject,
    signal
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    ValidationErrors
} from '@angular/forms';
import { take } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../../products/services/product.service';
import { OrdersService } from '../../../../orders/services/orders.service';
import { SpinnerComponent } from '../../../../../clib/components/spinner/spinner.component';
import { CartItemRowComponent } from '../../views/cart-item-row/cart-item-row.component';
import { CartSummaryComponent } from '../../views/cart-summary/cart-summary.component';
import { ModalComponent } from '../../../../../clib/components/modal/modal.component';
import { AppNavRoutes } from '../../../../../core/config/constants/navigation.constants';
import { NotificationsService } from '../../../../../core/services/notifications.service';
import { AddressDto } from '../../../../../core/types/dtos/location.dto';
import {
    buildProductsById,
    calculateCartSubtotal,
    toCreateOrderDto
} from '../../../utils/cart.utils';

function notBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    return value && value.trim().length > 0 ? null : { required: true };
}

@Component({
    selector: 'app-cart-overview-page',
    imports: [SpinnerComponent, CartItemRowComponent, CartSummaryComponent, ModalComponent, RouterLink, ReactiveFormsModule],
    templateUrl: './cart-overview-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartOverviewPageComponent implements OnInit {
    private readonly cartService = inject(CartService);
    private readonly productService = inject(ProductService);
    private readonly ordersService = inject(OrdersService);
    private readonly router = inject(Router);
    private readonly notificationsService = inject(NotificationsService);
    private readonly fb = inject(FormBuilder);

    readonly cartItems = this.cartService.items;
    readonly products = this.productService.products;
    readonly loading = this.productService.loading;
    readonly error = this.productService.error;
    readonly isSubmitting = signal(false);
    readonly isAddressModalOpen = signal(false);
    readonly productsLink = [
        '/',
        AppNavRoutes.Products.root,
        AppNavRoutes.Products.features.overview
    ];

    readonly productsById = computed(() => buildProductsById(this.products()));

    readonly subtotal = computed(() =>
        calculateCartSubtotal(this.cartItems(), this.productsById())
    );

    readonly itemCount = this.cartService.totalItems;

    readonly addressForm = this.fb.group({
        country: ['', [notBlank]],
        city: ['', [notBlank]],
        county: [''],
        streetAddress: ['', [notBlank]]
    });

    ngOnInit(): void {
        this.productService.loadAll().pipe(take(1)).subscribe();
    }

    onQuantityChange(productId: string, quantity: number): void {
        this.cartService.updateQuantity(productId, quantity);
    }

    onRemoveItem(productId: string): void {
        this.cartService.removeItem(productId);
    }

    onClearCart(): void {
        this.cartService.clear();
    }

    onCheckout(): void {
        if (this.cartItems().length === 0) return;
        this.isAddressModalOpen.set(true);
    }

    onAddressConfirmed(): void {
        this.addressForm.markAllAsTouched();
        if (this.addressForm.invalid) return;

        const { country, city, county, streetAddress } = this.addressForm.value;
        const address: AddressDto = {
            country: country!.trim(),
            city: city!.trim(),
            county: county?.trim() ?? '',
            streetAddress: streetAddress!.trim()
        };

        const payload = toCreateOrderDto(this.cartItems(), address);
        if (!payload) return;

        this.isAddressModalOpen.set(false);
        this.isSubmitting.set(true);
        this.ordersService
            .create(payload)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.isSubmitting.set(false);
                    this.cartService.clear();
                    this.addressForm.reset();
                    this.notificationsService.notifySuccess({
                        title: 'Order placed',
                        message: 'Your order is being processed.'
                    });
                    this.router.navigate([
                        '/',
                        AppNavRoutes.Orders.root,
                        AppNavRoutes.Orders.features.overview
                    ]);
                },
                error: err => {
                    console.error('Failed to create order:', err);
                    this.notificationsService.notifyError({
                        title: 'Order failed',
                        message: 'Please try again in a moment.'
                    });
                    this.isSubmitting.set(false);
                }
            });
    }

    onAddressModalClose(): void {
        this.addressForm.reset();
        this.isAddressModalOpen.set(false);
    }

    retry(): void {
        this.productService.loadAll().pipe(take(1)).subscribe();
    }
}
