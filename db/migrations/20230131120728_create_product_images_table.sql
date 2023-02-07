-- migrate:up
create table product_images (
id INT not null auto_increment,
img_url VARCHAR(2000) null,
product_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key (id),
foreign key (product_id) references products (id)
);

-- migrate:down
DROP TABLE product_images;
