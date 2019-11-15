import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Thumbnail } from 'ionic-angular';
import { ReferenceService } from '../../providers/referenceService';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { FormBuilder, FormGroup, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { config } from '../../app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { a, e } from '@angular/core/src/render3';
import { timeInterval, throwIfEmpty } from 'rxjs/operators';

/**
 * Generated class for the AddHolidayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-holiday',
  templateUrl: 'add-holiday.html',
})
export class AddHolidayPage {
  name:string;
disabled:boolean=false;

f:any={
  id:'',
  holiday:'',
  dated:'',
  leave_code:'',
  narration:'',
}

  primaryColor: any;
  holiday: any;
  formState: string='form';
  name1: string;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, public fb: FormBuilder,
    private toast:ToastController,
     public referenceService: ReferenceService, public apiService: ApiService, private http: HttpClient) {
       this.primaryColor = localStorage.getItem('primary_color');
this.holiday=this.navParams.get('holiday');
  }
  httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}
  
  

  ionViewWillEnter() {
    if(this.holiday!=null){  
      this.f.id=this.holiday.id;
      this.f.holiday=this.holiday.holiday;
    this.f.dated=this.holiday.dated;
    this.f.leave_code=this.holiday.leave_code;
    this.f.narration=this.holiday.narration;}
    
  };

 
  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };

create(){
  this.http.post(config.apiUrl+"payroll/holidays",this.f,this.httpOptions).subscribe(res=>{
    console.log(res);
    if(res['status']=true){
      let toast = this.toast.create({
        message: 'Holiday was added successfully',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      this.navCtrl.pop();
    }

    else{
      return false;
    }
   
  })


}

delete(){
  this.http.delete(config.apiUrl+"payroll/holidays/"+this.f.id,this.httpOptions).subscribe(res=>{
    console.log(res);
    if(res["succes"]=true){
      let toast = this.toast.create({
        message: 'Holiday was deleted successfully'+this.f.id,
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
      this.navCtrl.pop();
    }
    else{
      return false;
    }
  })
}

update(){
this.http.put(config.apiUrl+"payroll/holidays/"+this.f.id,this.f,this.httpOptions).subscribe(res=>{
  console.log(res)
  if(res["status"]="updated"){
    let toast = this.toast.create({
      message: 'Holiday was updated successfully'+''+this.f.id,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
    this.navCtrl.pop();
  }
  else{
    return false
  }
})

}

}


