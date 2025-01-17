package org.example.work1.service.impl;

import org.example.work1.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.work1.repository.StudentRepository;
import org.example.work1.service.StudentService;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public long getTotalStudentCount() {
        return studentRepository.count();
    }

    @Override
    public long getMaleStudentCount() {
        return studentRepository.countBySex(1);
    }

    @Override
    public long getFemaleStudentCount() {
        return studentRepository.countBySex(0);
    }
}