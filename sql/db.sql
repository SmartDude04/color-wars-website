CREATE DATABASE `color-wars`;

create table `color-wars`.pending
(
    pnd_usr_name     varchar(32)  not null,
    pnd_usr_password varchar(256) not null
);

create table `color-wars`.sessions
(
    sn_username          varchar(32)  not null,
    sn_series_identifier varchar(64)  not null,
    sn_session_token     varchar(64)  not null,
    sn_expire            int unsigned not null
);

create table `color-wars`.teams
(
    tm_id        int auto_increment
        primary key,
    tm_name      varchar(32) not null,
    tm_hex_color varchar(12) not null
);

create table `color-wars`.`groups`
(
    grp_id    int auto_increment
        primary key,
    grp_name  varchar(32) not null,
    grp_tm_id int         not null,
    constraint groups_teams_tm_id_fk
        foreign key (grp_tm_id) references `color-wars`.teams (tm_id)
);

create table `color-wars`.points
(
    pts_timestamp datetime not null,
    pts_tm_id     int      not null,
    pts_grp_id    int      not null,
    pts_amount    int      not null,
    constraint points_groups_grp_id_fk
        foreign key (pts_grp_id) references `color-wars`.`groups` (grp_id),
    constraint points_teams_tm_id_fk
        foreign key (pts_tm_id) references `color-wars`.teams (tm_id)
);

create table `color-wars`.users
(
    usr_id       int auto_increment
        primary key,
    usr_name     varchar(32)  not null,
    usr_password varchar(256) not null
);

create table `color-wars`.roles
(
    rl_usr_id int not null,
    rl_role   int not null,
    constraint roles_users_usr_id_fk
        foreign key (rl_usr_id) references `color-wars`.users (usr_id)
);

