import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addfeedback',
  templateUrl: './addfeedback.component.html',
  styleUrls: ['./addfeedback.component.css'],
})
export class AddfeedbackComponent implements OnInit {
  Data = [];

  headers: string[] = ['firstName', 'marks', 'feedback'];
  tableIsLoading = true;
  groups = [];

  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) {}

  batchId: number;
  groupId: number;
  studentPos = {};
  dataSource = {};
  allFeedbacksCalled = false;
  feedbackDataCalled = false;

  ngOnInit(): void {
    this.batchId = this.dialogData.batchId;
    this.groupId = this.dialogData.groupId;
    this.fetchdata();
    console.log('ngOnInit Called' + this.groupId);
    this.getAllFeedbacks();
    setInterval(() => {
      if (this.allFeedbacksCalled && this.feedbackDataCalled) {
        this.tableIsLoading = false;
      }
    }, 1000);
  }

  getAllFeedbacks() {
    this.http
      .get<any[]>('api/group/feedback/all/' + this.groupId)
      .subscribe((res) => {
        let pos = 0;
        let positions = {};
        this.dataSource = res;
        for (let i in res['projectFeedbackList']) {
          positions[i['studentId']] = pos;
          pos += 1;
        }
        this.studentPos = positions;
        this.allFeedbacksCalled = true;
      });
  }

  fetchdata() {
    console.log('Inside fetchAttendance');
    this.http
      .get<any[]>('api/group/all?batchId=' + this.batchId)
      .subscribe((res) => {
        for (let x in res) {
          if (res[x].studentGroupId == this.groupId) {
            this.Data = res[x].studentsList;
          }
        }
        this.feedbackDataCalled = true;
      });
  }

  getProjectMarks(row) {
    if (row['studentId'] in this.studentPos) {
      let arrPos = this.studentPos[row['studentId']];
      return this.dataSource['projectFeedbackList'][arrPos]['marks'];
    }
    return '';
    // this.dataSource['projectFeedbackList'].push({
    //   studentId: row['studentId'],
    //   marks: '',
    //   feedback: '',
    //   studentGroupId: this.groupId,
    // });
    // this.studentPos[row['studentId']] =
    //   this.dataSource['projectFeedbackList'].length - 1;
    // return '';
  }

  getProjectFeedback(row) {
    if (row['studentId'] in this.studentPos) {
      let arrPos = this.studentPos[row['studentId']];
      return this.dataSource['projectFeedbackList'][arrPos]['feedback'];
    }
    return '';
    // this.dataSource['projectFeedbackList'].push({
    //   studentId: row['studentId'],
    //   marks: '',
    //   feedback: '',
    //   studentGroupId: this.groupId,
    // });
    // this.studentPos[row['studentId']] =
    //   this.dataSource['projectFeedbackList'].length - 1;
    // return '';
  }

  onStatusChange(row, data, type) {
    if (type === 'M') {
      let arrPos = this.studentPos[row['studentId']];
      this.dataSource['projectFeedbackList'][arrPos]['marks'] =
        data.target.value;
    } else if (type == 'F') {
      let arrPos = this.studentPos[row['studentId']];
      this.dataSource['projectFeedbackList'][arrPos]['feedback'] =
        data.target.value;
    } else {
      this.dataSource['groupFeedback'] = data.target.value;
    }
  }

  addFeedback() {
    console.log('Click Initiated');
    console.log(this.dataSource);
    this.http
      .post('/api/group/feedback/' + this.groupId, this.dataSource)
      .subscribe(() => {});
  }
}
