package com.example.taptap.web;

import com.example.taptap.model.Brand;
import com.example.taptap.model.BrandRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BrandController {

    private final Logger log = LoggerFactory.getLogger(BrandController.class);
    private BrandRepository brandRepository;

    public BrandController(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @GetMapping("/brands")
    Iterable<Brand> brands() {
        return brandRepository.findAll();
    }

    @GetMapping("/brand/{id}")
    ResponseEntity<?> getBrand (@PathVariable Integer id) {
        Optional<Brand> brand = brandRepository.findById(id);
        return brand.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/brand")
    ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) throws URISyntaxException {
        log.info("Request to add brand: {}", brand);
        Brand result = brandRepository.save(brand);
        return ResponseEntity.created(new URI("/api/brand/" + result.getId()))
                .body(result);
    }

    @PutMapping("/brand/{id}")
    ResponseEntity<Brand> updateBrand(@Valid @RequestBody Brand brand) {
        log.info("Request to update brand: {}", brand);
        Brand result = brandRepository.save(brand);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/brand/{id}")
    public ResponseEntity<?> deleteBrand(@PathVariable Integer id) {
        log.info("Request to delete brand: {}", id);
        brandRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
