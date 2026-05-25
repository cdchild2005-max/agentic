CREATE TABLE suppliers
(
    id           UUID         PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255),
    email        VARCHAR(255),
    phone        VARCHAR(50),
    country      VARCHAR(100),
    city         VARCHAR(100),
    street_address VARCHAR(255)
);

ALTER TABLE products
    ADD COLUMN supplier_id UUID REFERENCES suppliers (id);
