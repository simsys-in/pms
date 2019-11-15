import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../app/config/config';

/**
 * Generated class for the MonthlyTimesheetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monthly-timesheet',
  templateUrl: 'monthly-timesheet.html',
})
export class MonthlyTimesheetPage {
  response: any=[];
  httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}
  res: any;
  days: any=[];
  newDays: any=[];
  lists: any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http:HttpClient,
    ) {
   this.response= this.navParams.get('f');
  }

  ionViewDidLoad() {
console.table(this.response);
     
  this.http.post(config.apiUrl+"projectManagement/project_report/monthly_salary",this.response,this.httpOptions).subscribe(res=>{
    this.res=res;
  this.days=res["days"];
console.table(this.days);
this.lists=res["lists"];

   })

  }

}
