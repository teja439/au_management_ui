import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddfeedbackComponent } from '../addfeedback/addfeedback.component';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { EditGroupComponent } from '../edit-group/edit-group.component';

@Component({
  selector: 'app-grouping',
  templateUrl: './grouping.component.html',
  styleUrls: ['./grouping.component.css'],
})
export class GroupingComponent implements OnInit {
  displayedColumns: string[] = ['position','name','email','delete'];
  panelOpenState = false;
  groups = [];
  toggleButton= {};
  arrays = [];

  enable(i: any) {
    this.toggleButton[i] = false;
  }
  
  isToggled(studentId){
    if(studentId in this.toggleButton){
      return this.toggleButton[studentId];
    }
    this.toggleButton[studentId] = true;
    return this.toggleButton[studentId];
  }
  constructor(private dialog: MatDialog, private http: HttpClient) {}
  @Input()
  batchId: number;

  ngOnInit(): void {
    console.log('toggle array ' + this.toggleButton);
    this.autoUpdate();
  }

  autoUpdate() {
    this.http
      .get<any[]>('api/group/all?batchId=' + this.batchId)
      .subscribe((res) => {
        this.groups = res;
      });
    console.log(this.groups);
  }

  openDialog() {
    console.log(this.batchId);
    console.log('hello');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
   
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialog.open(CreateGroupComponent, {
      data: {
        batchId: this.batchId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.autoUpdate());
  }
  addStudent(element: any) {
    
    console.log(element.studentGroupId);
    console.log(this.batchId);
    console.log('addstudent');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60%';
    dialogConfig.width = '60%';
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialog.open(AddStudentComponent, {
      panelClass: 'my-class',
      data: {
        batchId: this.batchId,
        groupId: element.studentGroupId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.autoUpdate());
  }
  editGroup(element:any)
  {
    console.log(element.studentGroupId);
    console.log(element.studentGroupName);
    console.log(this.batchId);
    console.log('EditGroup');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialog.open(EditGroupComponent, {
      data: {
        batchId: this.batchId,
        studentgroupName :element.studentGroupName,
        studentgroupId : element.studentGroupId,
        //projectName: element.projectName,
        groupId: element.studentGroupId,
        groupDetails: element,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.autoUpdate());
  }
  deleteStudent(element1: any, element: any) {
    console.log('studentId ' + element1.studentId);
    console.log('groupId ' + element.studentGroupId);
    this.http
      .delete('api/group/' + element.studentGroupId + '/' + element1.studentId)
      .subscribe((res) => {
        console.log(res);
        this.autoUpdate();
      });
  }
  feedback(element: any) {
    console.log(element.studentGroupId);
    console.log(this.batchId);
    console.log('feedback');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '450px';
    dialogConfig.width = '400px';
    dialogConfig.hasBackdrop = true;

    let dialogRef = this.dialog.open(AddfeedbackComponent, {
      data: {
        batchId: this.batchId,
        groupId: element.studentGroupId,
      },
    });
    dialogRef.afterClosed().subscribe(() => this.autoUpdate());
  }
}
