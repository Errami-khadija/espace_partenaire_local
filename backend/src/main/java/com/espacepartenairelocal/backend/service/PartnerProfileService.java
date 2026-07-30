package com.espacepartenairelocal.backend.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.espacepartenairelocal.backend.entity.PartnerProfile;

public interface PartnerProfileService {

    PartnerProfile getProfile();

    PartnerProfile updateProfile(PartnerProfile profile, MultipartFile logo) throws IOException;

}