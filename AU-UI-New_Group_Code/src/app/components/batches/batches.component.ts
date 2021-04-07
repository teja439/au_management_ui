import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BatchformComponent } from '../batchform/batchform.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css'],
})
export class BatchesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'batchName',
    'startDate',
    'endDate',
    'BatchSkypeId',
    'Actions',
  ];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  isLoading = true;
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getSessions();
  }

  ngAfterViewInit() {
  }

  getSessions() {
    this.http
      .get<any[]>('/api/batch/all')
      .subscribe((res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
      );
  }

  openNewBatchDialog(batch) {
    let dialogRef: MatDialogRef<BatchformComponent>;
    if (batch) {
      dialogRef = this.dialog.open(BatchformComponent, {
        data: batch,
      });
    } else {
      dialogRef = this.dialog.open(BatchformComponent);
    }
    dialogRef.afterClosed().subscribe(() => this.getSessions());
  }

  getBatch(batch) {
    this.router.navigate(['/batch', batch.batchId], {
      state: { batchObject: batch },
    });
  }

  openSkype(skypeId) {
    window.open(`skype:${skypeId}?chat`);
  }

  deleteBatch(batch) {
    let batchId = batch.batchId;
    let url = 'api/batch/' + batchId;
    this.http.delete(url).subscribe(() => this.getSessions());
    this.snackbar.open("Batch Deleted", '', {
      duration: 5000
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openClassroom(link) {
    window.open(link);
  }
}
