package com.example.taptap.model;

import lombok.NonNull;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "distributor")
public class Distributor{

    @Id
    @GeneratedValue
    private Integer id;

    @NonNull
    private String name;

    @OneToMany
    private Set<Brand> brands;
}
