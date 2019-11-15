import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonthlyTimesheetPage } from './monthly-timesheet';

@NgModule({
  declarations: [
    MonthlyTimesheetPage,
  ],
  imports: [
    IonicPageModule.forChild(MonthlyTimesheetPage),
  ],
})
export class MonthlyTimesheetPageModule {}
