import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBranchPage } from './add-branch';

@NgModule({
  declarations: [
    AddBranchPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBranchPage),
  ],
})
export class AddBranchPageModule {}
