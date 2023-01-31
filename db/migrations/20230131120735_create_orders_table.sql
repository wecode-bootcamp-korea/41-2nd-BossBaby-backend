-- migrate:up
create table orders (
id INT not null auto_increment,
address VARCHAR(200) not null,
totalprice decimal (10, 3) not null,
product_id INT not null,
user_id INT not null,
order_status_id INT not null,
primary key (id),
foreign key (product_id) references products (id),
foreign key (user_id) references users (id),
foreign key (order_status_id) references order_status (id)
);

-- migrate:down
DROP TABLE orders;
