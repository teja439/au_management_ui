import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  score: any[] = [];
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];
  marksData = [];
  finalAverageReport = {};
  total = 0;
  constructor(private http: HttpClient) { }

  @Input()
  batchId: number;

  ngOnInit() {
    console.log('Loaded Assignment Component');
    this.fetchMarks();
  }

  fetchMarks() {
    let url = '/api/training/all/' + this.batchId;
    this.http
      .get<any[]>(url, { params: { type: 'M' } })
      .subscribe(
        (marks) => (
          (this.score = marks),
          (this.sessionHeaders = marks['sessions']),
          this.sessionHeaders.map((seshead) => {
            this.sessionHeaderName.push(seshead.sessionName);
          }),
          (this.headers = [
            'First Name',
            'Last Name',
            'Email Address',
            ...this.sessionHeaderName,
            'Average',
          ]),
          (this.marksData = marks['marksData']),
          this.updateReport(),
          console.log(marks['marksData'])
        )
      );
  }

  getTotalMarksAverage(column) {
    column = column.student.studentId;
   // console.log("column"+column);
    if (column in this.finalAverageReport) {
      return (parseFloat(this.finalAverageReport[column]) / this.total)
        .toFixed(2)
        .toString();
    }
    return '0';
  }

  studentmap = {};
  arraylistassignment = {};

  updateReport() {
    let copyOfFinalAverageReport = this.finalAverageReport;
    for (let i = 0; i < this.marksData.length; i++) {
      let currData = this.marksData[i];
      let currentStudentId = currData['student']['studentId'];
      copyOfFinalAverageReport[currentStudentId] = 0;
      for (let key in currData) {
        if (key == 'student') {
          continue;
        } else {
          copyOfFinalAverageReport[currentStudentId] += parseInt(
            currData[key]['marks']
          );
        }
      }
    }
    this.finalAverageReport = copyOfFinalAverageReport;
    this.total = this.sessionHeaderName.length;
  }

  getMarks(row, column) {
    const sessionId = `${this.sessionHeaders.find((session) => session.sessionName === column)
      .sessionId
      }`;
    if (row[sessionId]) {
      return row[sessionId].marks;
    }
    return;
  }

  mark(row, studentId, sessionName_, previousMarks, marks) {
    let sessId;
    this.sessionHeaders.forEach((session) => {
      if (session.sessionName === sessionName_) {
        sessId = parseInt(session.sessionId);
        return;
      }
    });

    if (previousMarks) {
      this.finalAverageReport[studentId] -= parseInt(previousMarks);
      this.finalAverageReport[studentId] += parseInt(marks);
    } else {
      this.finalAverageReport[studentId] += parseInt(marks);
    }
    if (row[sessId]) {
      row[sessId]['marks'] = marks;
    }

    const markAttendance = {
      attendanceId: {
        sessionId: sessId,
        studentId: studentId,
      },
      marks: marks,
    };

    console.log(markAttendance);

    this.http
      .post('api/training/assignMarks', markAttendance)
      .subscribe((res) => { });
  }
}
