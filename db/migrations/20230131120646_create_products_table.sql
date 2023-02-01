-- migrate:up
create table products (
id INT not null auto_increment,
title VARCHAR(100) not null ,
image VARCHAR(2000) not null,
price decimal(10, 3) not null,
description VARCHAR(2000) not null,
region VARCHAR(100) not null,
views INT not null default '0',
exchangable boolean not null,
seller_id INT not null,
sub_category_id INT not null,
condition_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key (id),
foreign key (seller_id) references sellers (id),
foreign key (sub_category_id) references sub_categories (id),
foreign key (condition_id) references conditions(id)
);

-- migrate:down
DROP TABLE products;
