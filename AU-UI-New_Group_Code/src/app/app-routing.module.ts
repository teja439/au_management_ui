import { HomeComponent } from './components/home/home.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchdetailsComponent } from './components/batchdetails/batchdetails.component';
import { BatchesComponent } from './components/batches/batches.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'batches',
    component: BatchesComponent,
  },

  {
    path: 'batch/:batchId',
    component: BatchdetailsComponent,
  },

  {
    path: 'trainers',
    component: TrainersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
