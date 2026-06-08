INSERT INTO suppliers (id, name, contact_name, email, phone, country, city, street_address)
VALUES ('supp0001-0000-0000-0000-000000000001', 'TechSource Global', 'Alice Martin', 'alice@techsource.com', '+40-721-000-001', 'Romania', 'Cluj-Napoca', 'Strada Republicii 1'),
       ('supp0002-0000-0000-0000-000000000002', 'FashionHub Europe', 'Bob Ionescu', 'bob@fashionhub.eu', '+40-722-000-002', 'Romania', 'Bucharest', 'Calea Dorobantilor 20'),
       ('supp0003-0000-0000-0000-000000000003', 'HomeGoods Direct', 'Carol Pop', 'carol@homegoods.ro', '+40-723-000-003', 'Romania', 'Timisoara', 'Bulevardul Revolutiei 5'),
       ('supp0004-0000-0000-0000-000000000004', 'ActiveLife Supplies', 'Dan Popa', 'dan@activelife.com', '+40-724-000-004', 'Romania', 'Brasov', 'Strada Lunga 88');

UPDATE products SET supplier_id = 'supp0001-0000-0000-0000-000000000001'
WHERE id IN ('fade0001-0000-0000-0000-000000000001',
             'fade0002-0000-0000-0000-000000000002',
             'fade0003-0000-0000-0000-000000000003');

UPDATE products SET supplier_id = 'supp0002-0000-0000-0000-000000000002'
WHERE id IN ('fade0004-0000-0000-0000-000000000004',
             'fade0005-0000-0000-0000-000000000005');

UPDATE products SET supplier_id = 'supp0003-0000-0000-0000-000000000003'
WHERE id IN ('fade0006-0000-0000-0000-000000000006',
             'fade0007-0000-0000-0000-000000000007');

UPDATE products SET supplier_id = 'supp0004-0000-0000-0000-000000000004'
WHERE id IN ('fade0008-0000-0000-0000-000000000008',
             'fade0009-0000-0000-0000-000000000009',
             'fade000a-0000-0000-0000-00000000000a');
