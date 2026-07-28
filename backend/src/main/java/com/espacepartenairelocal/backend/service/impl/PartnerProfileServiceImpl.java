package com.espacepartenairelocal.backend.service.impl;

import com.espacepartenairelocal.backend.entity.PartnerProfile;
import com.espacepartenairelocal.backend.repository.PartnerProfileRepository;
import com.espacepartenairelocal.backend.service.PartnerProfileService;
import org.springframework.stereotype.Service;

@Service
public class PartnerProfileServiceImpl implements PartnerProfileService {

    private final PartnerProfileRepository partnerProfileRepository;

    public PartnerProfileServiceImpl(PartnerProfileRepository partnerProfileRepository) {
        this.partnerProfileRepository = partnerProfileRepository;
    }

@Override
public PartnerProfile getProfile() {
    return partnerProfileRepository.findFirstBy()
            .orElse(new PartnerProfile());
}

@Override
public PartnerProfile updateProfile(PartnerProfile profile) {

    partnerProfileRepository.findFirstBy()
            .ifPresent(existing -> profile.setId(existing.getId()));

    return partnerProfileRepository.save(profile);
}

}