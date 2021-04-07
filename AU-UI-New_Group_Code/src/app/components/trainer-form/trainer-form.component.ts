import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css'],
})
export class TrainerFormComponent implements OnInit {
  newTrainerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<TrainerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) { }

  bu_heads: any[] = [];

  ngOnInit() {
    this.newTrainerForm = this.fb.group({
      trainerId: [''],
      trainerName: ['', [Validators.required]],
      skypeId: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      reportingManagerEmailId: ['', [Validators.required]],
      businessUnitId: ['', [Validators.required]],
    });

    if (this.dialogData) {
      this.newTrainerForm.patchValue(this.dialogData);
    }

    this.http
      .get<any[]>('/api/businessUnit/all')
      .subscribe((all_bu) => (this.bu_heads = all_bu));
  }

  onSubmit() {
    if (this.newTrainerForm.valid) {
      let tempObj = this.newTrainerForm.value;
      tempObj['businessUnit'] = {
        "buId": tempObj['businessUnitId']
      }
      delete tempObj['businessUnitId'];
      console.log(tempObj);
      if (this.dialogData) {
        this.http
          .post('/api/trainer/add', tempObj)
          .subscribe(() => this.dialogRef.close());
        this.snackbar.open("Trainer updated", '', { duration: 3000 });
      }
      else {
        this.http
          .post('/api/trainer/add', tempObj)
          .subscribe(() => this.dialogRef.close());
        this.snackbar.open("Trainer added", '', { duration: 3000 });
      }
    }
    else {
      this.snackbar.open("There are validation errors", '', { duration: 5000 })
    }
  }
}
