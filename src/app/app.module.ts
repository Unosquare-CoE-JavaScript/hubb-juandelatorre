import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'benchmarks',
    loadChildren: () =>
      import('./benchmarks/benchmarks.module').then(m => m.BenchmarksModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./main/main.module').then(m => m.MainModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
