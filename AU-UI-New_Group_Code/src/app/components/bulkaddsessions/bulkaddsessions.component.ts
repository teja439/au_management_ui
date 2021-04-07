import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxCsvParser } from 'ngx-csv-parser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulkaddsessions',
  templateUrl: './bulkaddsessions.component.html',
  styleUrls: ['./bulkaddsessions.component.css'],
})
export class BulkaddsessionsComponent implements OnInit {
  csvRecords: any[] = [];
  header: boolean = true;
  batchId: number;
  constructor(
    private ngxCsvParser: NgxCsvParser,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BulkaddsessionsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {
    this.batchId = dialogData.batchId;
  }

  ngOnInit(): void { }
  showdialog = false;
  fileAttr = 'Select File';
  isDisabled = true;
  file = null;
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.file = files[0];
    const sessionsFile = files[0];
    this.isDisabled = false;
    if (sessionsFile.size <= 10000000) {
      console.log('File type =' + typeof sessionsFile);
      this.fileAttr = 'Selected File :- ' + sessionsFile.name;
    }
  }

  uploadFileToServer(): void {
    if (this.file != null) {
      const sessionsFile = this.file;
      let formData: FormData = new FormData();
      formData.append('sessionsFile', sessionsFile, sessionsFile.name);
      formData.append('batchId', this.batchId.toString());
      console.log('sending file');
      this.http.post('/api/session/bulkAdd', formData).subscribe((response) => {
        console.log(response);
        this.dialogRef.close();
      });
    }
  }
}
