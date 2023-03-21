-- Create the user table:

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- Create the inventory table: 

CREATE TABLE "inventory" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "type" VARCHAR (100) NOT NULL,
    "name" VARCHAR (100),
    "hex" VARCHAR (10),
    "medium" VARCHAR (100),
    "brand" VARCHAR (100),
    "body" VARCHAR (100),
    "container" VARCHAR (100),
    "size" VARCHAR (100),
    "notes" VARCHAR (1000),
    "favorite" BOOLEAN,
    "line" VARCHAR (100),
    "wishlist" BOOLEAN,
    "opacity" INT
);

-- (Optional) Starter Data:

INSERT INTO "inventory" 
("user_id", "type", "name", "hex", "medium", "brand", "body", "container", "size", "notes", "favorite", "line", "toxic", "wishlist", "opacity") 
VALUES 
('1', 'Color', 'Viridian Hue', '#339966', 'Watercolor', 'Winsor & Newton', 'Solid', 'Pan', 'Half', null, false, 'Cotman', false, false, 5),
('1', 'Color', 'Turquoise (Phthalo)', '#009994', 'Acrylic', 'Golden Artist Colors', 'Heavy Body', 'Tube', '2 oz', null, true, null, false, 50),
('1', 'Color', 'Cerulean Blue', '#267dc5', 'Oil', 'Gamblin', 'Soft Body', 'Tube', '37 ml', null, false, null, true, 80),
('1', 'Color', 'Cerulean Blue', '#267dc5', 'Oil', 'Gamblin', 'Soft Body', 'Tube', '37 ml', null, false, null, true, 80),
('1', 'Medium', 'Pouring Medium', null, 'Acrylic', 'Liquitex', 'Fluid', 'Bottle', '8 oz', 'Similar to GAC 800.', false, null, false, false, 0);