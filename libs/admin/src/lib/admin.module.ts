import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { PoiModule } from '@portal-map-nx-ngrx/poi';
import { ChartModule } from 'primeng/chart';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent }
    ]),
    PoiModule,
    ChartModule
  ],
  declarations: [AdminComponent],

})
export class AdminModule {}
