-- migrate:up
create table sub_categories(
id INT not null auto_increment,
sub_categories VARCHAR(200) not null,
main_category_id INT,
primary key (id),
foreign key (main_category_id) references main_categories(id)
);

-- migrate:down
DROP TABLE sub_categories;
