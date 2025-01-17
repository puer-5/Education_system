-- 创建数据库
CREATE DATABASE IF NOT EXISTS education_system DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE education_system;

-- 管理员信息表
CREATE TABLE admin_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    userpass VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    roleId BIGINT NOT NULL,
    roleName VARCHAR(32) NOT NULL,
    sex VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

-- 日志信息表
CREATE TABLE log_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    adminUsername VARCHAR(50) NOT NULL,
    loginIp VARCHAR(50) NOT NULL,
    loginTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    logoutTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    isSafeExit INT NOT NULL
);

-- 角色表
CREATE TABLE role (
    roleId INT PRIMARY KEY AUTO_INCREMENT,
    roleName VARCHAR(50) NOT NULL,
    roleRemark VARCHAR(50) NOT NULL
);

-- 功能菜单信息表
CREATE TABLE menu (
    menuId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    href VARCHAR(50) NOT NULL,
    perms VARCHAR(50) NOT NULL,
    spread VARCHAR(50) NOT NULL,
    parentId BIGINT NOT NULL,
    sorting BIGINT NOT NULL
);

-- 角色和权限关系表
CREATE TABLE role_menu (
    roleId BIGINT,
    menuId BIGINT,
    PRIMARY KEY (roleId, menuId)
);

-- 课程信息表
CREATE TABLE course (
    id INT PRIMARY KEY AUTO_INCREMENT,
    courseName VARCHAR(50) NOT NULL,
    place VARCHAR(50) NOT NULL,
    lessonType VARCHAR(50) NOT NULL,
    credit INT NOT NULL,
    teacherId INT NOT NULL
);

-- 学生信息表
CREATE TABLE student (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    sex INT NOT NULL,
    birthday TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    note VARCHAR(50) NOT NULL,
    status INT NOT NULL,
    levelId INT NOT NULL,
    createTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    roleId BIGINT NOT NULL
);

-- 教师信息表
CREATE TABLE teacher_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    sex INT NOT NULL,
    birthday TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    grade INT NOT NULL,
    rank INT NOT NULL,
    jobDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    college VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    roleId BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入测试数据
INSERT INTO `user` (`username`, `password`) VALUES
('admin', '123456'),
('test', 'test123');