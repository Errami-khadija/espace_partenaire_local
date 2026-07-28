package com.espacepartenairelocal.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnouncementRankingDto {

    private String title;
    private Long leads;
    private Integer views;

}