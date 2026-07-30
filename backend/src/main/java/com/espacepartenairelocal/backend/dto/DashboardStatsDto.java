package com.espacepartenairelocal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDto {

    private int activeAnnouncements;
    private int pendingAnnouncements;
    private int monthlyLeads;
    private int totalViews;
}