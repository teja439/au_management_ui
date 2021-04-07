import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() { }
  str = [
    'Managing Batches',
    'Managing Trainers',
    'Managing Sessison/ Schedules',
    'Managing Students',
    'Managing Attendance',
    'Managing Assignments',
    'Google Classroom Integration',
    'Google Forms Integration',
  ];
  ngOnInit(): void {
    const options = {
      strings: this.str,
      typeSpeed: 30,
      startDelay: 0,
      backSpeed: 30,
      backDelay: 500,
      loop: true,
      cursorChar: '|',
      contentType: 'html',
    };
    const typed = new Typed('.element', options);
  }
}
