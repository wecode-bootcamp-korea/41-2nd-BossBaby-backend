-- migrate:up
create table users (
id INT not null auto_increment,
profie_image VARCHAR(2000) null,
nickname VARCHAR(100) null,
description VARCHAR(1000) null,
kakao_id bigint(20) not null,
name VARCHAR(100) not null,
email VARCHAR(200) not null,
<<<<<<< HEAD
phone_number VARCHAR(100) not null,
=======
phone_number VARCHAR(100) null,
>>>>>>> 4f81c3e ([MODIFY] 카카오 회원가입, 로그인 코드 수정)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
primary key (id),
constraint users_ukey UNIQUE (email)
);

-- migrate:down
DROP TABLE users;
