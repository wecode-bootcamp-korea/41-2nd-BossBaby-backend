-- migrate:up
create table main_categories(
id INT not null auto_increment,
main_categories VARCHAR(200) not null,
primary key (id)
);

-- migrate:down
DROP TABLE main_categories;
