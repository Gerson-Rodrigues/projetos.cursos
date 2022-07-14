import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    MatProgressBarModule,
    MatCardModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
