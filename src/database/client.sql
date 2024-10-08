CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Añadir el campo user_id para la relación con la tabla users
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


--update user
UPDATE clients
SET phone_number = '9876543210', email = 'new.email@example.com'
WHERE id = 1;

--delete
DELETE FROM table_name
WHERE column_name = value;

ALTER TABLE clients
ADD COLUMN user_id INT,
ADD FOREIGN KEY (user_id) REFERENCES users(id);
