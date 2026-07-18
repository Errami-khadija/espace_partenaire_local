import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AnnouncementPreview } from '../announcement-preview/announcement-preview';

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [ReactiveFormsModule, AnnouncementPreview],
  templateUrl: './announcement-form.html',
  styleUrl: './announcement-form.css',
})


export class AnnouncementForm {
    @Output() close = new EventEmitter<void>();

  announcementForm!: FormGroup;

  selectedType = '';

  selectedFiles: File[] = [];

  showPreview = false;

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {

    this.announcementForm = this.fb.group({

      // champ commun
      announcementType: ['', Validators.required],
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
      Validators.pattern(/^[0-9]{10}$/)
    ]
  ]

    });


    // field spécifique en fonction du type d'annonce
    this.announcementForm
      .get('announcementType')
      ?.valueChanges
      .subscribe(type => {

        this.selectedType = type;

        this.updateSpecificFields(type);

      });

  }


  updateSpecificFields(type: string) {

    // retirer les champs spécifiques avant d'ajouter les nouveaux
    this.removeSpecificFields();


 if(type === 'investment') {

  this.announcementForm.addControl(
    'investmentAmount',
    this.fb.control('',  [
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


    if(type === 'collaboration') {

      this.announcementForm.addControl(
        'collaborationType',
        this.fb.control('', Validators.required)
      );

      this.announcementForm.addControl(
        'requiredProfile',
        this.fb.control('', Validators.required)
      );

    }


   if(type === 'tourism') {

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

    console.log(this.selectedFiles);

  }


 getFilePreview(file: File) {

  const url = URL.createObjectURL(file);

  return this.sanitizer.bypassSecurityTrustResourceUrl(url);

}


  removeSpecificFields() {

    const fields = [
      'investmentAmount',
      'estimatedROI',
      'projectDuration',
      'collaborationType',
      'requiredProfile',
      'tourismProjectType',
      'capacity'
    ];


    fields.forEach(field => {

      if(this.announcementForm.contains(field)) {
        this.announcementForm.removeControl(field);
      }

    });

  }

saveDraft(): void {

  const draftAnnouncement = {
    ...this.announcementForm.value,
    status: 'draft',
    savedAt: new Date()
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

submit() {

  console.log("Form value:", this.announcementForm.value);

  console.log("Selected files:", this.selectedFiles);


  const formData = new FormData();


  Object.keys(this.announcementForm.value).forEach(key => {

    formData.append(
      key,
      this.announcementForm.value[key]
    );

  });


  this.selectedFiles.forEach(file => {

    formData.append(
      'attachments',
      file
    );

  });


  console.log("FormData ready");

}
}