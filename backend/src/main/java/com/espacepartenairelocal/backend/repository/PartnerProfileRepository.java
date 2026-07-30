package com.espacepartenairelocal.backend.repository;

import com.espacepartenairelocal.backend.entity.PartnerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartnerProfileRepository extends JpaRepository<PartnerProfile, Long> {

    Optional<PartnerProfile> findFirstBy();

}
