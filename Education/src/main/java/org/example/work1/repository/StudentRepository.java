package org.example.work1.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.example.work1.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    long countBySex(int sex);
}