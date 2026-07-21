import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

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

  constructor(private fb: FormBuilder,  private sanitizer: DomSanitizer) {}

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

  this.profileForm.patchValue({
    logo: file
  });

  const url = URL.createObjectURL(file);
  this.logoPreview = this.sanitizer.bypassSecurityTrustUrl(url);
}
}