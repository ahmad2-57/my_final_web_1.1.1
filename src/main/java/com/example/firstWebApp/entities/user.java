//user

package com.example.firstWebApp.entities;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class user implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, name = "email", nullable=false)
    private String email;

    private String password;

    private String phoneNumber;

    private boolean admen;

    private String text_H;



    public String getText_H() {
        return text_H;
    }

    public void setText_H(String text_H) {
        this.text_H = text_H;
    }

    public boolean isAdmen() {
        return admen;
    }

    public void setAdmen(boolean admen) {
        this.admen = admen;
    }

    public user() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public user(Long id, String name, String email, String password, String phoneNumber ,boolean admen) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.text_H="";
    }



}

