package com.example.tripsters.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
<<<<<<< HEAD
=======
import jakarta.persistence.FetchType;
>>>>>>> front-deploy
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String message;
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp;

<<<<<<< HEAD
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
=======
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
>>>>>>> front-deploy
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
}
