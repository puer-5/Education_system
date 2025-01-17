package org.example.work1.service.impl;

import org.example.work1.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.work1.repository.StudentRepository;
import org.example.work1.repository.TeacherRepository;
import org.example.work1.repository.CourseRepository;


@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public long getStudentCount() {
        return studentRepository.count();
    }

    @Override
    public long getTeacherCount() {
        return teacherRepository.count();
    }

    @Override
    public long getCourseCount() {
        return courseRepository.count();
    }
}