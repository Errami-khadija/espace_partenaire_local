package com.espacepartenairelocal.backend.service;

import com.espacepartenairelocal.backend.entity.PartnerProfile;

public interface PartnerProfileService {

    PartnerProfile getProfile();

    PartnerProfile updateProfile(PartnerProfile profile);

}