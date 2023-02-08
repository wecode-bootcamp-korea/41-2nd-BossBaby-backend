-- migrate:up
create table reviews (
id INT not null auto_increment,
review_details VARCHAR(1000) not null,
seller_id INT not null,
buyer_id INT not null,
grade INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key (id),
foreign key (product_id) references products (id),
foreign key (seller_id) references sellers (id)
);

-- migrate:down
DROP TABLE reviews;
