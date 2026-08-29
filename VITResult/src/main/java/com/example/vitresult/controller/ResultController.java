package com.example.vitresult.controller;

import com.example.vitresult.model.StudentResult;
import com.example.vitresult.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*", allowedHeaders = "*") // Allows all origins & headers to prevent CORS issues
public class ResultController {

    @Autowired
    private ResultRepository repository;

    // Fetch all student results
    @GetMapping
    public List<StudentResult> getAllResults() {
        return repository.findAll();
    }

    // Save a new result with exception handling
    @PostMapping
    public ResponseEntity<?> createResult(@RequestBody StudentResult studentResult) {
        try {
            studentResult.calculateResult(); // Calculates totals, percentage, grade, status
            StudentResult savedResult = repository.save(studentResult);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedResult);
        } catch (Exception e) {
            e.printStackTrace(); // Logs error to STS Console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Failed to save result: " + e.getMessage());
        }
    }

    // Search result by PRN
    @GetMapping("/search/{prn}")
    public ResponseEntity<?> getResultByPrn(@PathVariable String prn) {
        try {
            Optional<StudentResult> resultOpt = repository.findByPrn(prn);
            if (resultOpt.isPresent()) {
                return ResponseEntity.ok(resultOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                     .body("No result found for PRN: " + prn);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error retrieving record: " + e.getMessage());
        }
    }
}