import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor(private http: HttpClient) {}
  
  @Input()
  batchId: number;

  ngOnInit(): void {
    this.getTrainersCount();
    this.getStudentsCount();  
  }

  BUdata = [];
  locationsData=[];
  buNames = [];
  trainersCount = [];
  locations = [];
  studentsCount = [];

  getTrainersCount() {
   // console.log('inside method');
    this.http.get<any[]>('api/trainer/allByBUCount').subscribe((res) => {
      console.log(res);
      this.BUdata = res;
      for (let i in this.BUdata) {
        this.buNames.push(this.BUdata[i]['buName']);
        this.trainersCount.push(this.BUdata[i]['trainerPerBU']);
      }
      console.log(this.buNames);
      console.log(this.trainersCount);
    });
  }

  getStudentsCount()
  {
    this.http.get<any[]>('api/student/allPerLocation/?batchId=' + this.batchId).subscribe((res) => {
      console.log(res);
      this.locationsData = res;
      for (let i in this.locationsData) {
        this.locations.push(this.locationsData[i]['location']);
        this.studentsCount.push(this.locationsData[i]['studentPerLocation']);
      }
    });
  }

  
  graph1 = {
    autosize: true,
    // width: 300,
    // height: 500,
    data: [{ x: this.buNames, y: this.trainersCount, type: 'bar' }],
    
    layout: { title: 'Trainers Count From Each BU' ,
    colorway: ["green"],
   // xaxis: {range: [1,5]},
    yaxis: {range: [1,5]}
    },
  };
 
  //  chart2
  graph2 = {
    data: [{ x: this.locations, y: this.studentsCount, type: 'bar' }],
    layout: { title: 'Location wise Candidate Count',
    colorway:["goldenrod"],
    // xaxis: {range: [2,50]},
    // yaxis: {range: [2,50]}
   },
  };
  // graph3 = {
  //   data: [{ x: this.locations, y: this.studentsCount, type: 'bar' }],
  //   layout: { title: 'Location wise Candidate Count',
  //   colorway:["goldenrod"],
  //  },
  // };
}
