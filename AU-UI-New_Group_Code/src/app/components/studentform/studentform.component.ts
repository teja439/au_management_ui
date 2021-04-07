import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionformComponent } from '../sessionform/sessionform.component';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})


export class StudentformComponent implements OnInit {
  newStudentForm: FormGroup;
  //updateStudentForm: FormGroup;

  batchId: number;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<StudentformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) {

    this.batchId = dialogData.batchId;
  }

  Location = ['Hyderabad', 'Banglore', 'Delhi', 'Chennai', 'Mumbai']
  update = false;
  ngOnInit() {
    this.newStudentForm = this.fb.group({
      batchId: [this.batchId, [Validators.required]],
      studentId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      skypeId: ['', [Validators.required]],
      location: ['', [Validators.required]]

    });

    if (this.dialogData.studDetails) {
      this.newStudentForm.patchValue(this.dialogData.studDetails);
      this.update = true;
    }
  }

  onSubmit() {
    if (this.newStudentForm.valid) {
      if (this.dialogData.studDetails) {
        let tempForm = this.newStudentForm.value;
        tempForm['createdOn'] = this.dialogData.studDetails.createdOn;
        this.http.post('/api/student/add', tempForm).subscribe(() => this.dialogRef.close())
        this.snackbar.open("Updated Student", '', {
          duration: 2000
        });
      }
      else {
        this.http.post('/api/student/add', this.newStudentForm.value).subscribe(() => this.dialogRef.close())
        this.snackbar.open("Added Student", '', {
          duration: 2000
        });
      }
    }
    else {
      this.snackbar.open('There are validation errors', '', {
        duration: 5000,
      });
    }
  }
}

