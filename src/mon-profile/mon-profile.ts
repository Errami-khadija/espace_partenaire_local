import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import Swal from 'sweetalert2';
import { PartnerProfileService } from '../app/services/partner-profile';

@Component({
  selector: 'app-mon-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mon-profile.html',
  styleUrl: './mon-profile.css',
})
export class MonProfile implements OnInit {

  profileForm!: FormGroup;

  logoPreview: SafeUrl | null = null;
  selectedLogo: File | null = null;
  selectedFileName: string = ''; // Stores selected file name for UI display

constructor(
  private fb: FormBuilder,
  private sanitizer: DomSanitizer,
  private partnerProfileService: PartnerProfileService,
   private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      sector: ['', Validators.required],
      region: ['', Validators.required],
      website: ['', Validators.pattern(/^https?:\/\/.+/)],
      description: ['', [Validators.required, Validators.minLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{8,20}$/)]],
      address: ['']
    });
      this.loadProfile();

  }

  loadProfile(): void {

  this.partnerProfileService.getProfile().subscribe({

    next: (profile) => {

      this.profileForm.patchValue({
        companyName: profile.companyName,
        sector: profile.sector,
        region: profile.region,
        website: profile.website,
        description: profile.description,
        email: profile.email,
        phone: profile.phone,
        address: profile.address
      });

      if (profile.logo) {
        this.selectedFileName = 'Current logo';

        this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/jpeg;base64,' + profile.logo
        );
      }

      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error(error);
    }

  });

}

 onLogoSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  this.selectedLogo = input.files[0];
  this.selectedFileName = this.selectedLogo.name;

  const objectUrl = URL.createObjectURL(this.selectedLogo);

  this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

  this.cdr.detectChanges();
}
  saveProfile(): void {

  if (this.profileForm.invalid) {

    this.profileForm.markAllAsTouched();

    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: 'Veuillez corriger les erreurs avant d’enregistrer.'
    });

    return;
  }

  const profileData = {
    companyName: this.profileForm.value.companyName,
    sector: this.profileForm.value.sector,
    region: this.profileForm.value.region,
    website: this.profileForm.value.website,
    description: this.profileForm.value.description,
    email: this.profileForm.value.email,
    phone: this.profileForm.value.phone,
    address: this.profileForm.value.address
  };

  console.log("PROFILE SENT:", profileData);
  console.log("IMAGE SENT:", this.selectedLogo);

  this.partnerProfileService.updateProfile(
    profileData,
    this.selectedLogo || undefined
  ).subscribe({

    next: () => {

      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le profil partenaire a été enregistré avec succès.',
        timer: 2000,
        showConfirmButton: false
      });

    },

    error: (error) => {

      console.error(error);

      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de mettre à jour le profil.'
      });

    }

  });
}
}