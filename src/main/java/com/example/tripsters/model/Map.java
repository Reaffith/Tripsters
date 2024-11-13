package com.example.tripsters.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
<<<<<<< HEAD
=======
import jakarta.persistence.FetchType;
>>>>>>> front-deploy
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
<<<<<<< HEAD
=======
import jakarta.persistence.OneToOne;
>>>>>>> front-deploy
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

<<<<<<< HEAD
import java.util.HashSet;
import java.util.Set;
=======
import java.util.List;

>>>>>>> front-deploy

@Getter
@Setter
@Entity
@Table(name = "maps")
public class Map {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
    @OneToMany(mappedBy = "map", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MapPoint> mapPoints = new HashSet<>();
=======
    @OneToOne(fetch = FetchType.LAZY)
    private MapPoint startPoint;

    @OneToOne(fetch = FetchType.LAZY)
    private MapPoint endPoint;

    @OneToMany(mappedBy = "map", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MapPoint> mapPoints;
>>>>>>> front-deploy
}
