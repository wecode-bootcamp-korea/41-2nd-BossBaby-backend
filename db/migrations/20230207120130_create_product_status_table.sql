-- migrate:up
create table product_status (
id INT not null auto_increment,
status VARCHAR(100) not null,
primary key (id)
)

-- migrate:down

