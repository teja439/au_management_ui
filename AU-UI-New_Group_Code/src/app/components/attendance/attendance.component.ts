import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  attend: any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  attendanceData = [];
  finalAttendanceReport = {};
  total = 0;

  constructor(private http: HttpClient) { }

  @Input()
  batchId: number;

  ngOnInit() {
    //console.log("Loaded Attendance Component")
    this.fetchAttendance();
  }

  getTotalAttendance(column) {
    if (column in this.finalAttendanceReport) {
      return this.finalAttendanceReport[column];
    }
    return 0;
  }

  fetchAttendance() {
    //console.log('Inside fetchAttendance');
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'A' } })
      .subscribe(
        (attendance) => (
          (this.attend = attendance),
          (this.sessionHeaders = attendance['sessions']),
          this.sessionHeaders.map((seshead) => {
            this.sessionHeaderName.push(seshead.sessionName);
          }),
          (this.headers = ['First Name', 'Last Name', 'Email Address', ...this.sessionHeaderName]),
          (this.attendanceData = attendance['attendanceData']),
        console.log(this.attendanceData),
          this.updateReport()
        )
      );
  }

  updateReport() {
    let copyOfFinalAttendanceReport = this.finalAttendanceReport;
    for (let i = 0; i < this.attendanceData.length; i++) {
      let currData = this.attendanceData[i];
      for (let key in currData) {
        if (key == 'student') {
          continue;
        } else {
          if (currData[key]['sessionName'] in copyOfFinalAttendanceReport) {
            copyOfFinalAttendanceReport[currData[key]['sessionName']] +=
              currData[key]['attendance'] == 'P' ? 1 : 0;
          } else {
            copyOfFinalAttendanceReport[currData[key]['sessionName']] =
              currData[key]['attendance'] == 'P' ? 1 : 0;
          }
        }
      }
    }

    this.finalAttendanceReport = copyOfFinalAttendanceReport;
    //console.log(this.finalAttendanceReport);
    this.total = this.attendanceData.length;
  }

  getAttendance(row, column) {
    //console.log(row);

    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column)
      .sessionId
      }`;
    if (row[sessionId]) {
      const current_att = row[sessionId].attendance;
      if (current_att == 'A') {
        return 'A';
      } else {
        return 'P';
      }
    }
    return 'N/A';
  }

  mark(studentId, sessionName_, row, previousStatus, markPresent) {
    let attendanceStatus = 'N/A';
    if (markPresent === true) {
      attendanceStatus = 'P';
    } else if (markPresent === false) {
      attendanceStatus = 'A';
    } else {
      attendanceStatus = 'N/A';
    }

    const sessionId = `${this.sessionHeaders.find(
      (session) => session.sessionName === sessionName_
    ).sessionId
      }`;

    if (previousStatus == 'N/A' || previousStatus == 'A') {
      if (attendanceStatus == 'P') {
        if (sessionName_ in this.finalAttendanceReport) {
          this.finalAttendanceReport[sessionName_] += 1;
        }
        else {
          this.finalAttendanceReport[sessionName_] = 1;
        }
      }
    }
    else {
      if (attendanceStatus == 'A') {
        this.finalAttendanceReport[sessionName_] -= 1;
      }
    }

    //this.attendanceData
    if (row[sessionId]) {
      row[sessionId]['attendance'] = attendanceStatus;
    } else {
      row[sessionId] = {
        sessionName: sessionName_,
        attendance: attendanceStatus,
      };
      // console.log("New");
      // console.log(row[sessionId])
    }

    let sessId;
    this.sessionHeaders.forEach((session) => {
      if (session.sessionName === sessionName_) {
        sessId = parseInt(session.sessionId);
        //console.log(sessId);
        return;
      }
    });

    const markAttendance = {
      attendanceId: {
        sessionId: sessId,
        studentId: studentId,
      },
      status: attendanceStatus,
    };

    this.http
      .post('api/training/markAttendance', markAttendance)
      .subscribe((res) => {
        //console.log(res);
      });
  }
}
