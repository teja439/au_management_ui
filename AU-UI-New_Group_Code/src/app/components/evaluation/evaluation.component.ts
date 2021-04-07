import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BulkaddmarksComponent } from '../bulkaddmarks/bulkaddmarks.component';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  data = [];
  dataSource: MatTableDataSource<any>;
  sessionHeaders = [];
  sessionHeaderName = [];
  headers = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input()
  batchId: number;

  ngOnInit() {
    //   console.log('Loaded evalution Component');
    this.fetchMarks();
  }

  fetchMarks() {
    console.log('fetching');
    let url = '/api/group/finalEval/' + this.batchId;
    this.http.get<any[]>(url).subscribe((marks) => {
      this.sessionHeaders = marks['eduthrillSessionsData'];
      this.sessionHeaderName = [];
      console.log(this.sessionHeaders);
      this.sessionHeaders.map((seshead) => {
        this.sessionHeaderName.push(seshead.testName);
      }),
        console.log(this.sessionHeaderName);
      this.data = marks['marksData'];
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.headers = [
        'First Name',
        'Last Name',
        'Email Address',
        ...this.sessionHeaderName,
        'Project Marks',
        'Assignment Average',
        'attendence',
        'totalMarks',
      ];
      console.log(this.dataSource);
    });
  }
  openBulkSessionDialog() {
    let dialogRef: MatDialogRef<BulkaddmarksComponent>;

    dialogRef = this.dialog.open(BulkaddmarksComponent, {
      data: {
        batchId: this.batchId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.fetchMarks());
  }
  getMarks(row, column) {
    let marksId;
    this.sessionHeaders.forEach((session) => {
      if (session.testName === column) {
        marksId = parseInt(session.eduthrillTestId);
      }
    });
    // console.log(marksId);
    if (row[marksId]) {
      return row[marksId].marks;
    }
    return '-';
  }
}
