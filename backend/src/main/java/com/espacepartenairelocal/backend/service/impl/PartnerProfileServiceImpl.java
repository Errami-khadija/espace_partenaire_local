package com.espacepartenairelocal.backend.service.impl;

import com.espacepartenairelocal.backend.entity.PartnerProfile;
import com.espacepartenairelocal.backend.repository.PartnerProfileRepository;
import com.espacepartenairelocal.backend.service.PartnerProfileService;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
public PartnerProfile updateProfile(
        PartnerProfile profile,
        MultipartFile logo) throws IOException {

    PartnerProfile existing = partnerProfileRepository.findFirstBy()
            .orElse(new PartnerProfile());

    profile.setId(existing.getId());

    // Keep old image if no new image is uploaded
    if (logo != null && !logo.isEmpty()) {
        profile.setLogo(logo.getBytes());
    } else {
        profile.setLogo(existing.getLogo());
    }

    return partnerProfileRepository.save(profile);
}

}