package org.example.work1.service;

import org.example.work1.entity.Student;

import java.util.List;


public interface StudentService {
    long getTotalStudentCount();
    long getMaleStudentCount();
    long getFemaleStudentCount();
    List<Student> getAllStudents();
}
