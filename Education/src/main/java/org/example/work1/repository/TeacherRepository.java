package org.example.work1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.example.work1.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}