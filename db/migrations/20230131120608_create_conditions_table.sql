-- migrate:up
create table conditions (
id INT not null auto_increment,
conditions VARCHAR(100) not null,
primary key (id)
);

-- migrate:down
DROP TABLE conditions;
