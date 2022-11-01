package com.example.taptap.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "product")
public class Product{

    @Id
    @GeneratedValue
    private Integer id;

    @NonNull
    private String name;

    private String description;
}
