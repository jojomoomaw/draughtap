package com.example.taptap.model;

import org.springframework.data.repository.CrudRepository;

public interface BrandRepository extends CrudRepository<Brand, Integer> {
    Brand findByName(String name);
}
