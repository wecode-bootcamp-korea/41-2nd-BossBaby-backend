-- migrate:up
create table likes (
id INT not null auto_increment,
user_id INT not null,
product_id INT not null,
primary key (id),
foreign key (user_id) references users (id),
foreign key (product_id) references products (id)
);

-- migrate:down
DROP TABLE likes;
