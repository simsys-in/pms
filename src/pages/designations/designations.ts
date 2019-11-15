import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../employeelist/employeelist';
import { AddDesignationsPage } from '../add-designations/add-designations';
import { ReferenceService } from '../../providers/referenceService';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { DataService } from '../../providers/JsonService';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { config } from '../../app/config/config';

/**
 * Generated class for the DesignationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-designations',
  templateUrl: 'designations.html',
})
export class DesignationsPage {

  public role : any;
  public roleId : any;
  public primaryColor:any;
  public loading:any;
  public url:any;
  public token :any;
  public resp:any;
  public departments:any;
  public designations: any;
  public persons:any
  public selected:any;
  constructor(public navCtrl: NavController,public dataService:DataService, public navParams: NavParams, private popoverCtrl: PopoverController,public referenceService:ReferenceService,public apiService:ApiService,public http:HttpClient) {
    this.role = localStorage.getItem('role');
    this.roleId = localStorage.getItem('role_id');
    this.primaryColor = localStorage.getItem('primary_color');
  }
  httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}


  ionViewWillEnter() {
  //this. designations = this.dataService.designation;
  this.http.get(config.apiUrl+"payroll/designation",this.httpOptions).subscribe(res=>{
    this.designations=res;
  })
  };

  getHeaderStyle(){
    return { 'background': this.primaryColor}
  };
  

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  };

  addDesignation(designation,id){
  this.navCtrl.push(AddDesignationsPage,{
    designation:designation,id:id
  })
  }

}
