package org.example.work1.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.example.work1.entity.Teacher;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TeacherMapper {
    @Select("SELECT * FROM teacher WHERE username = #{username} AND password = #{password}")
    Teacher findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @Select("SELECT COUNT(*) FROM teacher")
    int count();
} 