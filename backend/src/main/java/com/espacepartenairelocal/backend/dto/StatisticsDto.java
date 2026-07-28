package com.espacepartenairelocal.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsDto {

    private int totalViews;

    private int totalLeads;

    private double viewsGrowth;

    private double leadsGrowth;

    private double conversionRate;

    private int conversionViews;

    private int conversionLeads;

    private List<DailyViewDto> dailyViews;

    private List<AnnouncementRankingDto> rankings;

}