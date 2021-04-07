import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-bulkaddmarks',
  templateUrl: './bulkaddmarks.component.html',
  styleUrls: ['./bulkaddmarks.component.css']
})
export class BulkaddmarksComponent implements OnInit {
  batchId: number;
  csvRecords: any[] = [];
  eduid: any;
  eduname: any;
  header: boolean = true;
  constructor(private ngxCsvParser: NgxCsvParser,
    private http: HttpClient,
    private dialogRef: MatDialogRef<BulkaddmarksComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {
    this.batchId = dialogData.batchId;
  }

  ngOnInit(): void {
  }
  showdialog = false;
  fileAttr = 'Select File';
  isDisabled = true;
  file = null;
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any,type): void {
if(type=='f'){
    const files = $event.srcElement.files;
    this.file = files[0];
    const sessionsFile = files[0];
    this.isDisabled = false;
    if (sessionsFile.size <= 10000000) {
      console.log('File type =' + typeof sessionsFile);
      this.fileAttr = 'Selected File :- ' + sessionsFile.name;
    }
  }
  else if(type=='i'){
      this.eduid=$event.target.value;
      console.log(this.eduid);
  }
  else{
  this.eduname=$event.target.value;
  console.log(this.eduname); 
}
}

  uploadFileToServer(): void {
    if (this.file != null) {
      const sessionsFile = this.file;
      let formData: FormData = new FormData();
      console.log(sessionsFile.name);
      formData.append('eduthrillTestId', this.eduid.toString());
      formData.append('eduthrillTestFile', sessionsFile);
      formData.append('eduthrillTestName', this.eduname.toString());
      
      console.log('sending file');
      this.http.post('/api/eduthrill/uploadTest/'+this.batchId,formData).subscribe((response) => {
        console.log(response);
        this.dialogRef.close();
      });
    }
  }
}

