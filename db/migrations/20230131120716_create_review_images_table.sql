-- migrate:up
create table review_images (
id INT not null auto_increment,
img_url VARCHAR(2000) not null,
review_id INT not null,
primary key (id),
foreign key (review_id) references reviews (id)
);

-- migrate:down
DROP TABLE review_images;
