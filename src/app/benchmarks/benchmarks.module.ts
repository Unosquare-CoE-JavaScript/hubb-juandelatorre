import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BenchmarksComponent } from './benchmarks.component';
import { AlgorithmsModule } from '../algorithms/algorithms.module';


const routes: Routes = [
  { path: '', component: BenchmarksComponent }
];

@NgModule({
  declarations: [
    BenchmarksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AlgorithmsModule,
  ]
})
export class BenchmarksModule { }
