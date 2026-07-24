package com.espacepartenairelocal.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.espacepartenairelocal.backend.dto.DashboardStatsDto;
import com.espacepartenairelocal.backend.service.DashboardService;

@RestController
@RequestMapping("/api/dev/local-partner/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public DashboardStatsDto getDashboardStats() {
        return dashboardService.getDashboardStats();
    }
}