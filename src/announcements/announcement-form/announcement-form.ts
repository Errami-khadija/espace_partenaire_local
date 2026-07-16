import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-announcement-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    this.fb.control('', Validators.required)
  );

  this.announcementForm.addControl(
    'investmentType',
    this.fb.control('', Validators.required)
  );

}


    if(type === 'collaboration') {

      this.announcementForm.addControl(
        'partnerType',
        this.fb.control('', Validators.required)
      );

      this.announcementForm.addControl(
        'collaborationGoal',
        this.fb.control('', Validators.required)
      );

    }


   if(type === 'tourism') {

  this.announcementForm.addControl(
    'destination',
    this.fb.control('', Validators.required)
  );

  this.announcementForm.addControl(
    'activityType',
    this.fb.control('', Validators.required)
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
      'investmentType',
      'partnerType',
      'collaborationGoal',
      'destination',
      'activityType'
    ];


    fields.forEach(field => {

      if(this.announcementForm.contains(field)) {
        this.announcementForm.removeControl(field);
      }

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