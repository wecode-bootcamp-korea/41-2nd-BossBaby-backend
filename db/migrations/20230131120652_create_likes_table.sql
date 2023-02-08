-- migrate:up
create table likes (
id INT not null auto_increment,
user_id INT not null,
product_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key (id),
foreign key (user_id) references users (id),
foreign key (product_id) references products (id),
constraint likes_user_id_product_id_ukey UNIQUE (user_id, product_id),
);

-- migrate:down
DROP TABLE likes;
