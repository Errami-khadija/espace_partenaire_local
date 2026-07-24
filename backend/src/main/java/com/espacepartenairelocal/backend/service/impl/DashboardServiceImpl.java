package com.espacepartenairelocal.backend.service.impl;

import org.springframework.stereotype.Service;

import com.espacepartenairelocal.backend.dto.DashboardStatsDto;
import com.espacepartenairelocal.backend.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Override
    public DashboardStatsDto getDashboardStats() {

        return new DashboardStatsDto(
                8,     // annonces actives
                2,     // annonces en attente
                15,    // leads du mois
                120    // vues totales
        );
    }
}