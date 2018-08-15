CREATE TABLE public.product (
	id serial NOT NULL,
	"name" varchar(255) NULL,
	description varchar(50) NULL,
	price int4 NULL,
	CONSTRAINT product_pkey PRIMARY KEY (id)
)
WITH (
	OIDS=FALSE
) ;

INSERT INTO public.product
(id, "name", description, price)
VALUES(1, 'Bread', 'The best bread!', 100);
INSERT INTO public.product
(id, "name", description, price)
VALUES(2, 'Milk', 'The tastiest milk!', 200);
INSERT INTO public.product
(id, "name", description, price)
VALUES(3, 'Butter', 'The freshest butter!', 350);