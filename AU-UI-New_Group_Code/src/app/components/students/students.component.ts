import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';
import { SessionformComponent } from '../sessionform/sessionform.component';
import { BulkaddstudentsComponent } from '../bulkaddstudents/bulkaddstudents.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    console.log("Constructor Of Students Loaded")
  }

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'createdOn',
    'emailId',
    'skypeId',
    'location',
    'Actions',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @Input()
  batchId: number;
  isLoading = true;

  ngOnInit(): void {
    this.getStudents();
    
  console.log(this.batchId);
  }

  getStudents() {
    this.http
      .get<any[]>('api/student/all', { params: { batchId: `${this.batchId}` } })
      .subscribe((res) => {
        console.log(res);
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        console.log(res);
      }
      );
  }

  openNewStudentDialog(stud) {
    let dialogRef: MatDialogRef<StudentformComponent>;
    if (stud) {
      dialogRef = this.dialog.open(StudentformComponent, {
        data: {
          batchId: this.batchId,
          studDetails: stud,
        },
      });
    } else {
      dialogRef = this.dialog.open(StudentformComponent, {
        data: {
          batchId: this.batchId,
        },
      });
    }
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  deleteStudent(stud) {
    let studentId = stud.studentId;
    let url = 'api/student/' + studentId;
    this.http.delete(url).subscribe(() => this.getStudents());
    this.snackbar.open("Student Deleted", '', {
      duration: 5000
    });
  }

  openBulkaddDialog() {
    let dialogRef: MatDialogRef<BulkaddstudentsComponent>;
    dialogRef = this.dialog.open(BulkaddstudentsComponent, {
      data: {
        batchId: this.batchId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.getStudents());
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
