import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  constructor(private http:HttpClient , @Inject(MAT_DIALOG_DATA) public dialogData,private fb: FormBuilder) {
      
  }
  studentNames=[];
  getStudents()
  {
    this.http.get<any[]>('api/student/allUnassigned?batchId='+this.batchId).subscribe((res) => {
       // this.allStudents.set(res,true);
        this.dataSource.data=res;
        
      //    res.map((item)=>{
      //       this.studentNames.push(item);
      //    }
          
      //    )
      // //   console.log(this.allStudents);
       }
    )
  }
  //FirstName:String
 
  checkBoxValue:boolean=true;
  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<any>();
 
  selection = new SelectionModel<any>(true, []);


  isAllSelected() {
    

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {

    console.log("allselected");
    if(this.isAllSelected)
    {
      this.allStudents.forEach((value: boolean, key: any) => {
         this.allStudents.set(key,true);
      });
    }

    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));


  }

  checkboxLabel(row?: any): string {
    // console.log("row "+row +" "+ "this.selection.isSelected(row) "+ this.selection.isSelected(row));
     if(this.selection.isSelected(row))
     {
       this.allStudents.set(row,true);
     }
     else
     {
      this.allStudents.set(row,false);
     }
    // console.log("each row"+this.allStudents);

    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //displayedColumns: string[] = ['name'];
  
  
  
   
  batchId:number
  ngOnInit(): void {
    this.batchId=this.dialogData.batchId
      this.getStudents()
   
      
  }
  
  

  allStudents=new Map<any,boolean>();
  
 
  checkCheckBoxvalue(event,x){
      console.log(x)
    this.allStudents.set(x,event.checked);
  
  }
  custForm = new FormGroup({

    size: new FormControl('',[Validators.required]),
    

  });
  
  modified=[]
  num:number
  

  generate()
  {
    console.log(this.allStudents)
   // console.log(this.custForm.get("size").value)
    this.num=this.custForm.get("size").value;
   // console.log(this.modified[1].value)
    this.allStudents.forEach((value: boolean, key: any) => {
      if(key!=undefined)
      {
      if(value==false)
      {
        this.modified.push(key)
      }
      console.log(value);
      console.log(this.modified);
      console.log("dataSource "+ this.dataSource);
    }

   
  });




   

  this.http.post('api/group/automate/'+this.batchId+'?groupSize='+this.num, this.modified).subscribe(() =>
     console.log("group created"))
 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}