CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Columna id con incremento automático y clave primaria
    first_name VARCHAR(50) NOT NULL,  -- Columna para el nombre del cliente, no puede ser nulo
    last_name VARCHAR(50) NOT NULL,   -- Columna para el apellido del cliente, no puede ser nulo
    age INT NOT NULL,                 -- Columna para la edad del cliente, no puede ser nulo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Columna opcional para registrar la fecha de creación
);


--INSER DATOS
INSERT INTO clients (first_name, last_name, age) VALUES ('John', 'Doe', 30);
INSERT INTO clients (first_name, last_name, age) VALUES ('Jane', 'Smith', 25);


-- Actualizar todos los campos de un cliente por id
UPDATE clients
SET first_name = 'NuevoNombre',  -- Reemplaza 'NuevoNombre' con el nuevo nombre
    last_name = 'NuevoApellido', -- Reemplaza 'NuevoApellido' con el nuevo apellido
    age = 35                     -- Reemplaza 35 con la nueva edad
WHERE id = 1;                    -- Reemplaza 1 con el id del cliente que quieres actualizar


-- Actualizar parcialmente un cliente por id
UPDATE clients
SET first_name = 'NombreParcial', -- Reemplaza 'NombreParcial' con el nuevo nombre, si se desea actualizar
    age = 28                      -- Reemplaza 28 con la nueva edad, si se desea actualizar
WHERE id = 1;                     -- Reemplaza 1 con el id del cliente que quieres actualizar


-- Seleccionar un cliente por id
SELECT * FROM clients
WHERE id = 1;  -- Reemplaza 1 con el id del cliente que quieres consultar
