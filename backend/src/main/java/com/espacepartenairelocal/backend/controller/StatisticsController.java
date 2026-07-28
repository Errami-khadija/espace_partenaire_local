package com.espacepartenairelocal.backend.controller;

import com.espacepartenairelocal.backend.dto.StatisticsDto;
import com.espacepartenairelocal.backend.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/local-partner/statistiques")
public class StatisticsController {

    private final StatisticsService statisticsService;

    public StatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping
    public StatisticsDto getStatistics() {
        return statisticsService.getStatistics();
    }
}