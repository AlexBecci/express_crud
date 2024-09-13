CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trip_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);
