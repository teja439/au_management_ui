import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-batchform',
  templateUrl: './batchform.component.html',
  styleUrls: ['./batchform.component.css'],
})

export class BatchformComponent implements OnInit {
  newBatchForm: FormGroup;
  isProgressLoading = false;
  loadText = 'Loading ...';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BatchformComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private snackbar: MatSnackBar
  ) { }

  batchObject;
  ngOnInit() {
    this.newBatchForm = this.fb.group({
      batchId: [''],
      batchName: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      commonSkypeId: ['', [Validators.required]],
      groupEmailId: ['', [Validators.required]],
    });

    if (this.dialogData) {
      this.batchObject = this.dialogData;
      this.newBatchForm.patchValue(this.dialogData);
    }
  }

  onSubmit() {
    if (this.newBatchForm.valid) {
      this.isProgressLoading = true;
      if (this.dialogData) {
        let updateForm = this.newBatchForm.value;
        updateForm['commonClassroomId'] = this.batchObject.commonClassroomId;
        updateForm['classroomLink'] = this.batchObject.classroomLink;
        updateForm['courseGroupEmail'] = this.batchObject.courseGroupEmail;
        updateForm['classroomName'] = this.batchObject.classroomName;
        console.log('Update Form Batch');
        console.log(updateForm);
        this.http.post('/api/batch/add', updateForm).subscribe(() => {
          this.dialogRef.close();
          this.isProgressLoading = false;
        });
        this.snackbar.open('Batch Updated', '', { duration: 5000 });
      } else {
        this.loadText = 'Creating Google Classroom Course...';
        let tempForm = this.newBatchForm.value;

        this.http
          .get<any>(
            'https://script.google.com/macros/s/AKfycbwRycXiB4o4G5bsLIiBwRcLhVrSCp5pk5feG9FPwNX-S2omV7fadGz0CYVey_yvXUzP/exec',
            {
              params: {
                operation: 'CreateCourse',
                classRoomName: this.newBatchForm.get('batchName').value,
              },
            }
          )
          .subscribe((val) => {
            console.log(val);
            console.log(typeof val);
            tempForm['commonClassroomId'] = val['id'];
            tempForm['classroomLink'] = val['alternateLink'];
            tempForm['courseGroupEmail'] = val['courseGroupEmail'];
            tempForm['classroomName'] = val['name'];
            this.loadText = 'Creating Batch...';
            this.http.post('/api/batch/add', tempForm).subscribe(() => {
              this.dialogRef.close();
              this.isProgressLoading = false;
              this.loadText = 'Loading...';
            });
            this.snackbar.open('Batch Added', '', { duration: 5000 });
          });
      }
    } else {
      this.snackbar.open('There are validation errors', '', {
        duration: 5000,
      });
    }
  }
}
