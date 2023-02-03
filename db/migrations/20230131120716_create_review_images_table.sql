-- migrate:up
create table review_images (
id INT not null auto_increment,
<<<<<<< HEAD
img_url VARCHAR(2000) not null,
=======
img VARCHAR(2000) not null,
>>>>>>> 4f81c3e ([MODIFY] 카카오 회원가입, 로그인 코드 수정)
review_id INT not null,
primary key (id),
foreign key (review_id) references reviews (id)
);

-- migrate:down
DROP TABLE review_images;
