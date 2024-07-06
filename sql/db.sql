CREATE DATABASE `color-wars`;

create table `groups`
(
    grp_name varchar(32) not null,
    grp_team varchar(32) not null
);

create table pending
(
    pnd_usr_name     varchar(32)  not null,
    pnd_usr_password varchar(256) not null
);

create table sessions
(
    sn_username          varchar(32)  not null,
    sn_series_identifier varchar(64)  not null,
    sn_session_token     varchar(64)  not null,
    sn_expire            int unsigned not null
);

create table teams
(
    tm_color  varchar(32) not null,
    tm_points int         not null
);

create table users
(
    usr_id       int auto_increment
        primary key,
    usr_name     varchar(32)  not null,
    usr_password varchar(256) not null
);

create table roles
(
    rl_usr_id int not null,
    rl_role   int not null,
    constraint roles_users_usr_id_fk
        foreign key (rl_usr_id) references users (usr_id)
);