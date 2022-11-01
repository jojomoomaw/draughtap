package com.example.taptap;

import com.example.taptap.model.Brand;
import com.example.taptap.model.BrandRepository;
import com.example.taptap.model.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {

    private final BrandRepository repository;

    public Initializer(BrandRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Anheuser-Busch", "Modern", "Perennial").forEach(name -> repository.save(new Brand(name)));

        Brand brandName = repository.findByName("Anheuser-Busch");
        Product product = Product.builder().name("Busch").description("American lager").build();
        brandName.setProducts(Collections.singleton(product));
        repository.save(brandName);
        repository.findAll().forEach(System.out::println);
    }
}
