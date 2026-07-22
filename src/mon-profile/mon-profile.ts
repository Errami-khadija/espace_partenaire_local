import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import Swal from 'sweetalert2';

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
    private sanitizer: DomSanitizer
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
      address: [''],
      logo: [null]
    });
  }

  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    this.selectedLogo = file;
    this.selectedFileName = file.name; // Capture filename for custom HTML label

    this.profileForm.patchValue({
      logo: file
    });

    const url = URL.createObjectURL(file);
    this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(url);
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
      ...this.profileForm.value,
      logo: this.selectedLogo
    };

    console.log(profileData);

    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: 'Le profil partenaire a été enregistré avec succès.',
      timer: 2000,
      showConfirmButton: false
    });
  }
}