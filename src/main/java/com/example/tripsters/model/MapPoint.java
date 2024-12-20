package com.example.tripsters.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
<<<<<<< HEAD
=======
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "map_points")
public class MapPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
<<<<<<< HEAD
    private double latitude;
    @Column(nullable = false)
    private double longitude;
=======
    private String pointName;
>>>>>>> front-deploy
    @Column
    private String description;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

<<<<<<< HEAD
    @ManyToOne
    @JoinColumn(name = "map_id", nullable = false)
    private Map map;
=======
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "map_id", nullable = false)
    private Map map;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PointType type;

    public enum PointType {
        START,
        END,
        INTERMEDIATE
    }
>>>>>>> front-deploy
}
