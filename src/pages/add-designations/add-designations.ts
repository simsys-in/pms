import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Toast, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { ApiService } from '../../providers/apiServices';
import { ReferenceService } from '../../providers/referenceService';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { LoginPage } from '../login/login';
import { DataService } from '../../providers/JsonService';
import { config } from '../../app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TimeSheetEditPage } from '../timesheets/timesheetslist';

/**
 * Generated class for the AddDesignationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-designations',
  templateUrl: 'add-designations.html',
})
export class AddDesignationsPage {

  public loading;
  public url;
  private designationForm: FormGroup;
  public token;
  public departments;
  public resp;
  public selectedLeave;
  primaryColor:any

f={
  //department_id:'',
  designation:'',
  id:''
}
 constructor(public navCtrl: NavController,
  public toast:ToastController,
  public dataService:DataService, public navParams: NavParams, private fb: FormBuilder, private alertCtrl: AlertController, private apiService: ApiService, private referenceService: ReferenceService, private http: HttpClient) {
this.f.designation=this.navParams.get('designation');
this.f.id=this.navParams.get('id');
    this.primaryColor = localStorage.getItem('primary_color');
  }
  httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}
  
  ionViewWillEnter() {
   // if(this.f.designation=null){this.disabled=true;}
  this.http.get(config.apiUrl+"payroll/department",this.httpOptions).subscribe(res=>{
    this.departments=res;
  
  })
  }



  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };

  addDesignation() {

    this.http.post(config.apiUrl+"payroll/designation",this.f,this.httpOptions).subscribe(res=>{

    if(res["status"]==true){
      let toast = this.toast.create({
       message: 'Designation was created successfully',
       duration: 3000,
       position: 'buttom'
     });

     toast.present();
    this.navCtrl.pop();
  }else{
this.referenceService.basicAlert("Designation","Designation field required");
  }
    })
    
  }
update(id){
this.http.put(config.apiUrl+"payroll/designation/"+id,this.f,this.httpOptions).subscribe(res=>{
  if(res["status"]=="updated"){
    let toast = this.toast.create({
     message: 'Designation was updated successfully',
     duration: 3000,
     position: 'buttom'
   });

   toast.present();
  this.navCtrl.pop();
}else{
this.referenceService.basicAlert("Designation","Designation not updated");
}
})  
}
delete(id){
  this.http.delete(config.apiUrl+"payroll/designation/"+id,this.httpOptions).subscribe(res=>{
    if(res["success"]=true){
      let toast=this.toast.create({
        message:'Designation was deleted successfully',
        duration:3000,
        position:'buttom'
      });
      toast.present();
      this.navCtrl.pop()
    }
    else{
      this.referenceService.basicAlert("Delete" ,"Designation not deleted");
    }
  })
}
}






