-- migrate:up
create table order_status(
id INT not null auto_increment,
status VARCHAR(100),
primary key(id)
);

-- migrate:down
DROP TABLE order_status;
