-- migrate:up
create table users (
id INT not null auto_increment,
profie_image VARCHAR(2000) null,
nickname VARCHAR(100) null,
description VARCHAR(1000) null,
kakao_id long not null,
name VARCHAR(100) not null,
email VARCHAR(200) not null,
phone_num VARCHAR(100) not null,
created_at timestamp not null default now(),
updated_at timestamp null on update current_timestamp,
primary key (id)
);

-- migrate:down
DROP TABLE users;
