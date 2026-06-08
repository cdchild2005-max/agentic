package msg.onlineshopapi.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierDto {

    private UUID id;
    private String name;
    private String contactName;
    private String email;
    private String phone;
    private String country;
    private String city;
    private String streetAddress;
}
