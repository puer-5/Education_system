package org.example.work1.controller;

import org.example.work1.entity.Teacher;
import org.example.work1.mapper.TeacherMapper;
import org.example.work1.model.LoginRequest;
import org.example.work1.model.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LoginController {

    @Autowired
    private TeacherMapper teacherMapper;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        System.out.println("收到登录请求: 用户名=" + loginRequest.getUsername() + ", 密码=" + loginRequest.getPassword());

        // 测试数据库连接
        int count = teacherMapper.count();
        System.out.println("数据库中总记录数: " + count);

        // 打印SQL查询参数
        System.out.println("执行SQL查询: SELECT * FROM teacher WHERE username='" + loginRequest.getUsername() +
                          "' AND password='" + loginRequest.getPassword() + "'");

        Teacher teacher = teacherMapper.findByUsernameAndPassword(
            loginRequest.getUsername(),
            loginRequest.getPassword()
        );

        System.out.println("数据库查询结果: " + (teacher != null ? "找到用户" : "未找到用户"));
        
        LoginResponse response = new LoginResponse();
        if (teacher != null) {
            System.out.println("登录成功");
            response.setSuccess(true);
            response.setMessage("登录成功");
        } else {
            System.out.println("登录失败");
            response.setSuccess(false);
            response.setMessage("用户名或密码错误");
        }
        
        return response;
    }
} 