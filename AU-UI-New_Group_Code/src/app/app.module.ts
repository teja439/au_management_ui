import { BrowserModule } from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BatchesComponent } from './components/batches/batches.component';
import { BatchformComponent } from './components/batchform/batchform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BatchdetailsComponent } from './components/batchdetails/batchdetails.component';
import { SessionComponent } from './components/session/session.component';
import { SessionformComponent } from './components/sessionform/sessionform.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentformComponent } from './components/studentform/studentform.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { TrainerFormComponent } from './components/trainer-form/trainer-form.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { BulkaddstudentsComponent } from './components/bulkaddstudents/bulkaddstudents.component';
//import {MatToolbarModule} from '@angular/material/toolbar';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { BulkaddsessionsComponent } from './components/bulkaddsessions/bulkaddsessions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HomeComponent } from './components/./home/home.component';
import { OverlayLoaderComponent } from './components/overlay-loader/overlay-loader.component';
import { GroupingComponent } from './components/grouping/grouping.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddfeedbackComponent } from './components/addfeedback/addfeedback.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { ChartsComponent } from './components/charts/charts.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { BulkaddmarksComponent } from './components/bulkaddmarks/bulkaddmarks.component';
//import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    BatchesComponent,
    BatchformComponent,
    SideNavComponent,
    BatchdetailsComponent,
    SessionComponent,
    SessionformComponent,
    StudentsComponent,
    StudentformComponent,
    TrainersComponent,
    TrainerFormComponent,
    AttendanceComponent,
    BulkaddstudentsComponent,
    AssignmentsComponent,
    BulkaddsessionsComponent,
    HomeComponent,
    OverlayLoaderComponent,
    GroupingComponent,
    CreateGroupComponent,
    AddStudentComponent,
    AddfeedbackComponent,
    EditGroupComponent,
    EvaluationComponent,
    ChartsComponent,
    BulkaddmarksComponent,
  ],
  
  imports: [
    PlotlyModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatFormFieldModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTabsModule,
    MatSortModule,
    MatMenuModule,
    NgxCsvParserModule,
    MatTableExporterModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [MatTabsModule, MatSortModule],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
