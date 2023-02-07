-- migrate:up
create table sellers (
id INT not null auto_increment,
user_id INT not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key (id),
foreign key (user_id) references users(id)
);

-- migrate:down
DROP TABLE sellers;
