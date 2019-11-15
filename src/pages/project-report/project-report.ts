import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../app/config/config';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import {DatePipe} from '@angular/common';
import { MonthlyTimesheetPage } from '../monthly-timesheet/monthly-timesheet';

/**
 * Generated class for the ProjectReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-report',
  templateUrl: 'project-report.html',
})
export class ProjectReportPage {

selectedDate:string=""

f:any={
  date_from:'',
  date_to:''
}
httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}
  currentTime: any;
  year: any;
  month: any;
  day: any;
  formState: any;
  res: any=[];


  constructor(public navCtrl: NavController,
    public http:HttpClient,
    public navParams: NavParams,
    public datePicker:DatePicker,
    public datepipe:DatePipe,
    public platform:Platform,
    
    ) {
this.formState="form";
this.platform.ready().then(()=>{
  this.selectedDate=this.datepipe.transform(new Date(),"dd-MM-yyyy")
})
      

      this.currentTime = new Date();
      this.year = this.currentTime.getFullYear();
      this.month = this.currentTime.getMonth() + 1;
      this.day = this.currentTime.getDate();
      if (this.month < 10) { this.month = '0' + this.month; }
      if (this.day < 10) { this.day = '0' + this.day; }
      this.currentTime = this.year + '-' + this.month + '-' + this.day;
  }

// SelectedDate(){
//   var options={
//     date:new Date(),
//     mode:'date',
//     androidTheme:this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL
//   }
//   this.datePicker.show(options).then((date)=>{
//     this.selectedDate=this.datepipe.transform(date,"dd-MM-yyyy");
//   })
// }

getReport(){
  this.navCtrl.push(MonthlyTimesheetPage,{
    f:this.f,
  })

}
  ionViewDidLoad() {
    

  }
  ionViewWillEnter(){

  }

}
