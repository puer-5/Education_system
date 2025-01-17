package org.example.work1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.work1.service.MainService;

@RestController
public class MainController {

    @Autowired
    private MainService mainService;

    @GetMapping("/main/stats")
    public MainStats getDashboardStats() {
        long studentCount = mainService.getStudentCount();
        long teacherCount = mainService.getTeacherCount();
        long courseCount = mainService.getCourseCount();

        return new MainStats(studentCount, teacherCount, courseCount);
    }
}

class MainStats {
    private long studentCount;
    private long teacherCount;
    private long courseCount;

    public MainStats(long studentCount, long teacherCount, long courseCount) {
        this.studentCount = studentCount;
        this.teacherCount = teacherCount;
        this.courseCount = courseCount;
    }

    public long getStudentCount() {
        return studentCount;
    }

    public long getTeacherCount() {
        return teacherCount;
    }

    public long getCourseCount() {
        return courseCount;
    }
}