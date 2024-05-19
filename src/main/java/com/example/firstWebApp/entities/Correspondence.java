//package com.example.firstWebApp.entities;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//@Entity
//public class Correspondence {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String userMessage;
//    private String aiMessage;
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getUserMessage() {
//        return userMessage;
//    }
//
//    public void setUserMessage(String userMessage) {
//        this.userMessage = userMessage;
//    }
//
//    public String getAiMessage() {
//        return aiMessage;
//    }
//
//    public void setAiMessage(String aiMessage) {
//        this.aiMessage = aiMessage;
//    }
//
//    public Correspondence(Long id, String userMessage, String aiMessage) {
//        this.id = id;
//        this.userMessage = userMessage;
//        this.aiMessage = aiMessage;
//    }
//}
