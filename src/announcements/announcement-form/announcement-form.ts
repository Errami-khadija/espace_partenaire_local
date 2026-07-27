import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AnnouncementPreview } from '../announcement-preview/announcement-preview';
import { Announcement } from '../../app/models/announcement.model';
import { AnnouncementService } from '../../app/services/announcement';
import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [ReactiveFormsModule, AnnouncementPreview],
  templateUrl: './announcement-form.html',
  styleUrl: './announcement-form.css',
})


export class AnnouncementForm implements OnChanges {
    @Output() close = new EventEmitter<void>();
    @Input() announcement?: Announcement;
    filePreviews = new Map<File, any>();

  announcementForm!: FormGroup;

  selectedType = '';

  selectedFiles: File[] = [];

  showPreview = false;

isEditMode = false;
editingAnnouncementId?: number;

existingAttachments: string[] = [];

 constructor(
  private fb: FormBuilder,
  private sanitizer: DomSanitizer,
  private announcementService: AnnouncementService
) {

  this.announcementForm = this.fb.group({

    // Common fields
    type: ['', Validators.required],

    title: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ],

    sector: [
      '',
      Validators.required
    ],

    region: [
      '',
      Validators.required
    ],

    contact: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]
    ]

  });

  // Listen for type changes
  this.announcementForm
    .get('type')
    ?.valueChanges
    .subscribe(type => {

      this.selectedType = type;

      this.updateSpecificFields(type);

    });

}

  updateSpecificFields(type: string) {

  // Remove previous dynamic fields
  this.removeSpecificFields();

  if (type === 'investment') {

    this.announcementForm.addControl(
      'amountSought',
      this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])
    );

    this.announcementForm.addControl(
      'estimatedROI',
      this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]+)?$')
      ])
    );

    this.announcementForm.addControl(
      'projectDuration',
      this.fb.control('', Validators.required)
    );

  }

  if (type === 'collaboration') {

    this.announcementForm.addControl(
      'collaborationType',
      this.fb.control('', Validators.required)
    );

    this.announcementForm.addControl(
      'requiredProfile',
      this.fb.control('', Validators.required)
    );

  }

  if (type === 'tourism') {

    this.announcementForm.addControl(
      'tourismProjectType',
      this.fb.control('', Validators.required)
    );

    this.announcementForm.addControl(
      'capacity',
      this.fb.control('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])
    );

  }

}
onFileSelected(event: any) {

  const files = event.target.files;

  this.selectedFiles = Array.from(files);

  this.filePreviews.clear();

  this.selectedFiles.forEach(file => {

    const url = URL.createObjectURL(file);

    this.filePreviews.set(
      file,
      this.sanitizer.bypassSecurityTrustResourceUrl(url)
    );

  });


  this.existingAttachments = [];

}


getFilePreview(file: File) {

  return this.filePreviews.get(file);

}


removeSpecificFields() {

  const fields = [
    'amountSought',
    'estimatedROI',
    'projectDuration',
    'collaborationType',
    'requiredProfile',
    'tourismProjectType',
    'capacity'
  ];

  fields.forEach(field => {

    if (this.announcementForm.contains(field)) {
      this.announcementForm.removeControl(field);
    }

  });

}

saveDraft(): void {

  const draftAnnouncement: Partial<Announcement> = {
    ...this.announcementForm.value,
    status: 'draft'
  };

  console.log('Annonce sauvegardée en brouillon :', draftAnnouncement);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });

  Toast.fire({
    icon: 'success',
    title: 'Brouillon sauvegardé avec succès'
  });

}

  showFormPreview() {

  if (this.announcementForm.invalid) {
    this.announcementForm.markAllAsTouched();
    return;
  }

  this.showPreview = true;

}

editForm() {

  this.showPreview = false;

}

closeForm() {
  this.showPreview = false;
  this.close.emit();
}

submit(): void {

  if (this.announcementForm.invalid) {
    this.announcementForm.markAllAsTouched();
    return;
  }

  const announcement: Announcement = {
    ...this.announcementForm.value,
    status: 'pending',
    views: 0,
    attachments: this.selectedFiles.map(file => file.name),
    rejectionReason: ''
  };

  if (this.isEditMode) {

    this.announcementService.updateAnnouncement(
      this.editingAnnouncementId!,
      announcement
    ).subscribe({

      next: () => {

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Annonce mise à jour avec succès.'
        });

        this.announcementForm.reset();
        this.selectedFiles = [];
        this.selectedType = '';
        this.showPreview = false;
        this.isEditMode = false;
        this.editingAnnouncementId = undefined;
        this.existingAttachments = [];

      },

      error: (error) => {

        console.error(error);

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de mettre à jour l’annonce.'
        });

      }

    });

  } else {

    this.announcementService.createAnnouncement(announcement)
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Annonce créée avec succès.'
          });

          this.announcementForm.reset();
          this.selectedFiles = [];
          this.selectedType = '';
          this.showPreview = false;

        },

        error: (error) => {

          console.error(error);

          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de créer l’annonce.'
          });

        }

      });

  }

}

ngOnChanges(changes: SimpleChanges): void {

  if (changes['announcement'] && this.announcement) {

    this.selectedType = this.announcement.type;

    this.updateSpecificFields(this.announcement.type);
     this.isEditMode = true;
    this.editingAnnouncementId = this.announcement.id;

  this.existingAttachments = this.announcement.attachments ?? [];

    this.announcementForm.patchValue({

      type: this.announcement.type,
      title: this.announcement.title,
      description: this.announcement.description,
      sector: this.announcement.sector,
      region: this.announcement.region,
      contact: this.announcement.contact,

      amountSought: this.announcement.amountSought,
      estimatedROI: this.announcement.estimatedROI,
      projectDuration: this.announcement.projectDuration,

      collaborationType: this.announcement.collaborationType,
      requiredProfile: this.announcement.requiredProfile,

      tourismProjectType: this.announcement.tourismProjectType,
      capacity: this.announcement.capacity

    });

  }

}
}