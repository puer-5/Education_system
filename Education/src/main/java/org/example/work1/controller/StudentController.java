package org.example.work1.controller;

import org.example.work1.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.example.work1.service.StudentService;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/students/stats")
    public StudentStats getStudentStats() {
        long total = studentService.getTotalStudentCount();
        long male = studentService.getMaleStudentCount();
        long female = studentService.getFemaleStudentCount();
        double maleRatio = total == 0? 0 : (double) male / total;
        double femaleRatio = total == 0? 0 : (double) female / total;

        return new StudentStats(total, male, female, maleRatio, femaleRatio);
    }
    @GetMapping("/students")
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }
}

class StudentStats {
    private long total;
    private long male;
    private long female;
    private double maleRatio;
    private double femaleRatio;

    public StudentStats(long total, long male, long female, double maleRatio, double femaleRatio) {
        this.total = total;
        this.male = male;
        this.female = female;
        this.maleRatio = maleRatio;
        this.femaleRatio = femaleRatio;
    }

    public long getTotal() {
        return total;
    }

    public long getMale() {
        return male;
    }

    public long getFemale() {
        return female;
    }

    public double getMaleRatio() {
        return maleRatio;
    }

    public double getFemaleRatio() {
        return femaleRatio;
    }
}