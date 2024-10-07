-- Create 'category' table
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_image VARCHAR(255),
    is_remove BOOLEAN DEFAULT FALSE
);

CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    opening_hours VARCHAR(255),
    rating FLOAT CHECK (rating BETWEEN 0 AND 5),
    review_count INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Mở cửa',
    service_fee DECIMAL(5,2) DEFAULT 0.0
);
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    store_id INT REFERENCES stores(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    inventory INT NOT NULL DEFAULT 100,
    image_url VARCHAR(255),
    category VARCHAR(255)
);
-- Create 'user' table
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    tenDN VARCHAR(255) NOT NULL,
   firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL
);

-- Create 'order' table
CREATE TABLE "order" (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(user_id) ON DELETE CASCADE,
    list_sanPham JSONB NOT NULL,
    ngay_datHang TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create 'shipping' table
CREATE TABLE shipping (
    ship_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES "order"(order_id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255) NOT NULL,
    ngay_DatHang TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO category (category_name, category_image, is_remove)
VALUES
    ('Appetizers', 'appetizers.jpg', FALSE),
    ('Main Course', 'main_course.jpg', FALSE),
    ('Desserts', 'desserts.jpg', FALSE),
    ('Beverages', 'beverages.jpg', FALSE);
    
INSERT INTO stores (name, address, opening_hours, rating, review_count, status, service_fee)
VALUES
('Gà Rán Jollibee - Nguyễn Văn Cừ', '356 Trần Hưng Đạo, Phường 2, Quận 5, TP.Hồ Chí Minh', '06:00 - 22:59', 4.5, 999, 'Mở cửa', 0.8),
('Gà Rán KFC - Lê Văn Sỹ', '123 Lê Văn Sỹ, Phường 13, Quận 3, TP.Hồ Chí Minh', '08:00 - 21:00', 4.2, 750, 'Mở cửa', 0.5),
('Lotteria - Phan Xích Long', '25 Phan Xích Long, Phường 7, Quận Phú Nhuận, TP.Hồ Chí Minh', '09:00 - 23:00', 4.0, 600, 'Mở cửa', 1.0);

-- Insert sample product data for Gà Rán Jollibee - Nguyễn Văn Cừ
INSERT INTO products (store_id, name, description, price, image_url, category)
VALUES
(1, 'Mua 2 Tặng 2 Gà Rán', 'Bao gồm: 4 Miếng Gà (Cay/Không Cay), 2 Nước Vừa...', 118000, 'https://example.com/image1.jpg', 'Sản Phẩm Mới'),
(1, 'Combo Gà Rán Đặc Biệt', 'Gồm 5 miếng gà giòn, 1 khoai tây chiên, 2 nước ngọt', 199000, 'https://example.com/image2.jpg', 'Family Combo'),
(1, 'Burger Phô Mai Bò', 'Burger bò với phô mai tan chảy và sốt đặc biệt', 59000, 'https://example.com/image3.jpg', 'Burger');

-- Insert sample product data for Gà Rán KFC - Lê Văn Sỹ
INSERT INTO products (store_id, name, description, price, image_url, category)
VALUES
(2, 'Combo Gà Rán Truyền Thống', 'Gồm 3 miếng gà giòn, 1 nước ngọt, 1 khoai tây chiên', 139000, 'https://example.com/image4.jpg', 'Family Combo'),
(2, 'Combo Gà Rán Gia Vị Đặc Biệt', 'Gồm 4 miếng gà vị đặc biệt, 1 nước ngọt lớn', 159000, 'https://example.com/image5.jpg', 'Sản Phẩm Mới');

-- Insert sample product data for Lotteria - Phan Xích Long
INSERT INTO products (store_id, name, description, price, image_url, category)
VALUES
(3, 'Combo Lotteria Gà Rán', 'Gồm 5 miếng gà giòn, 2 nước ngọt lớn', 209000, 'https://example.com/image6.jpg', 'Family Combo'),
(3, 'Combo Burger Gà', 'Burger gà kèm khoai tây chiên và nước ngọt', 79000, 'https://example.com/image7.jpg', 'Burger');