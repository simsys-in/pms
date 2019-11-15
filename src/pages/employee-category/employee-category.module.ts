import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeCategoryPage } from './employee-category';

@NgModule({
  declarations: [
    EmployeeCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeCategoryPage),
  ],
})
export class EmployeeCategoryPageModule {}
