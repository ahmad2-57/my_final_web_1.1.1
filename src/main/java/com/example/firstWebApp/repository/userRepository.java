//repository

package com.example.firstWebApp.repository;

import com.example.firstWebApp.entities.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<user,Long> {
    @Query("select u from user u where u.email = :email and u.password = :password")
    Optional<user> findByEmailAndPassword(String email, String password);

    @Query("select  u from user u where u.email= :email")
    Optional<user> findUserIdByEmail(String email);

}