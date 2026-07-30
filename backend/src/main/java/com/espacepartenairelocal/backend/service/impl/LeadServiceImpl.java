package com.espacepartenairelocal.backend.service.impl;

import com.espacepartenairelocal.backend.entity.Lead;
import com.espacepartenairelocal.backend.repository.LeadRepository;
import com.espacepartenairelocal.backend.service.LeadService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {

    private final LeadRepository leadRepository;

    public LeadServiceImpl(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @Override
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }
}