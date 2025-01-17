package org.example.work1.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.work1.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}