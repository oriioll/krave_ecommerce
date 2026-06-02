--Users table
CREATE TABLE users (
    id SERIAL,
    role_id INTEGER NOT NULL DEFAULT 2,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT users_email_key UNIQUE (email)
);
--Roles table
CREATE TABLE roles (
    id SERIAL,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    CONSTRAINT pk_roles PRIMARY KEY (id),
    CONSTRAINT roles_name_key UNIQUE (name)
);
--Products table
CREATE TABLE products (
    id SERIAL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    main_image TEXT NOT NULL,
    hover_image TEXT,
    about_image TEXT,
    info_image TEXT,
    weight REAL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    CONSTRAINT pk_products PRIMARY KEY (id),
    CONSTRAINT products_price_check CHECK (price > 0),
    CONSTRAINT products_slug_key UNIQUE (slug)
);
--Cart table
CREATE TABLE cart (
    id SERIAL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
    CONSTRAINT pk_cart PRIMARY KEY (id),
    CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
--Cart items table
CREATE TABLE cart_items (
    id SERIAL,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT pk_cart_items PRIMARY KEY (id),
    CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
    CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT ck_quantity CHECK (quantity > 0)
);
--Trigger to create a cart when user is created
CREATE OR REPLACE FUNCTION func_create_cart_trigger() RETURNS TRIGGER AS $$ BEGIN
INSERT INTO cart (user_id)
VALUES (NEW.id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER trig_create_cart
AFTER
INSERT ON users FOR EACH ROW EXECUTE FUNCTION func_create_cart_trigger();