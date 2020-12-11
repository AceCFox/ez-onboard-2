CREATE TABLE "organization" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL,
    "email" VARCHAR (100),
    "phone" VARCHAR(30),
    "address" VARCHAR (500),
    "status" VARCHAR (50) DEFAULT 'in progress'
);


CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR (100) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "organization_id" INT references "organization",
    "first_name" VARCHAR (50),
    "last_name" VARCHAR(100),
    "phone" VARCHAR(30),
	"token" VARCHAR (200),
	"timeout" BIGINT
);

CREATE TABLE "zefnet_user" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR(50) NOT NULL,
	"last_name" VARCHAR(100) NOT NULL,
	"email" VARCHAR (100) NOT NULL,
	"phone" VARCHAR (30),
	"editor" BOOLEAN,
	"is_primary" BOOLEAN DEFAULT false,
	"organization_id" INT REFERENCES "organization"
);

CREATE TABLE "site" (
	"id" SERIAL PRIMARY KEY,
	"address" VARCHAR(500),
	"first_name" VARCHAR(50) NOT NULL,
	"second_name" VARCHAR(100),
	"email" VARCHAR (100) NOT NULL,
	"phone" VARCHAR (30),
	"organization_id" INT REFERENCES "organization"
);

CREATE TABLE "breaker" (
	"id" SERIAL PRIMARY KEY,
	"limit" NUMERIC NOT NULL,
	"description" VARCHAR(300),
	"site_id" INT REFERENCES "site",
	"name" VARCHAR(100)
	);
	
CREATE TABLE "device_type" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50),
	"head" VARCHAR (50),
	"description" VARCHAR (300)
);

CREATE TABLE "device" (
	"id" SERIAL PRIMARY KEY,
	"type_id" INT REFERENCES "device_type",
	"breaker_id" INT REFERENCES "breaker", 
	"serial_number" VARCHAR(100) UNIQUE NOT NULL,
	"serial_number2" VARCHAR(100),
	"name" VARCHAR(100),
	"install_date" DATE
);

INSERT INTO "device_type" 
	("name", "head") 
VALUES 
	('Wall Mount', 'Single'), 
	('Pedestal', 'Single'), 
	('Pedestal', 'Dual'),
	('ZEFNET Pro', 'Dual');