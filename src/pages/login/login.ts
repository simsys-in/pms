
import { Component } from "@angular/core";
import { HTTP } from '@ionic-native/http';
import 'rxjs/Rx';

import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  MenuController,
  Events,
  Platform,
  ToastController
} from "ionic-angular";
import { HomePage } from "../home/home";
import {
  FormGroup,
  FormBuilder,

} from "@angular/forms";
import { ForgotpasswordPage } from "../forgotpassword/forgotpassword";
import { ApiService } from "../../providers/apiServices";
import { ReferenceService } from "../../providers/referenceService";
import { StatusBar } from "@ionic-native/status-bar";
import { OneSignal } from "@ionic-native/onesignal";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cordovaWarn } from "@ionic-native/core";
import { jsonpCallbackContext, HttpClientModule } from "@angular/common/http/src/module";
import { stringify } from "@angular/core/src/render3/util";
import { t } from "@angular/core/src/render3";
import { AddLeaveTypePage } from "../leave-types/leave-types";
import { DepartmentsPage } from "../departments/departments";
import { MyApp } from "../../app/app.component";
import { hostElement } from "@angular/core/src/render3/instructions";
import { config } from "../../app/config/config";
import { RegistrationPage } from "../registration/registration";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage    {


  public type = 'password';
  public showPass = false;
 
 
  cpin:any
  url: any;
  host: any;
  loading: any;
  public username1 = false;
  public password1 = false;
    public primaryColor: any;
  public secondryColor: any;
  blackLogo: any;
  device_id: any;
diasbled=true;

name:any;
f={
  email:'sankar7@gmail.com',
  password:'',
    cpin:''
}
formState="form";


  source: string;
   
isLoading:boolean;
  login_values: any;
  routePage: any;
  subform: boolean;
  name1: any;

  p: { this: any; '': any; };
  pin: any;
  permissions=[];
 constructor(
    private http:HttpClient,
    //private http:HTTP,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    //private oneSignal: OneSignal,
    public events: Events,
   // private fb: FormBuilder,
    public statusBar: StatusBar,
  
    //private referenceservice: ReferenceService,
    private apiservice: ApiService,
    public navParams: NavParams,
    public platform:Platform,
    public tostr:ToastController,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    
  ) {

  //  this.loginForm = fb.group({
  //  username: ["", [Validators.required,]],
  // password: ["", [Validators.required,]],
  // cpin: ["", [Validators.required,]],
   
  //  });
    this.primaryColor = '#44bbec';
    this.secondryColor = '#0163fc';
    this.blackLogo = "assets/imgs/new-hrms-black.png";
    localStorage.setItem("primary_color", '#44bbec');
    localStorage.setItem("secondry_color", '#0163fc');
    localStorage.setItem("black_logo", "assets/imgs/logo.png");
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString(this.primaryColor);
    this.primaryColor = localStorage.getItem("primary_color");
    this.blackLogo = "assets/imgs/smarthrlogo.png";
    this.menuCtrl.swipeEnable(false);
  
    this.androidFingerprintAuth.isAvailable()
  .then((result)=> {
    if(result.isAvailable){
      // it is available

      this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
        .then(result => {
           if (result.withFingerprint) {
               console.log('Successfully encrypted credentials.');
               console.log('Encrypted credentials: ' + result.token);
               let toast = this.tostr.create({
                message: ' Authenicated Succesfully',
                duration: 3000,
                position: 'buttom'
              });
         
              toast.present();

           } else if (result.withBackup) {
             console.log('Successfully authenticated with backup password!');
             let toast = this.tostr.create({
              message: 'Authenticated with backup successfully',
              duration: 3000,
              position: 'buttom'
            });
       
            toast.present();
           } else{
            console.log('Didn\'t authenticate!');
            let toast = this.tostr.create({
              message: 'Not a Authenticated User',
              duration: 3000,
              position: 'buttom'
            });
       
            toast.present();
           } 
        })
        .catch(error => {
           if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
             console.log('Fingerprint authentication cancelled');
           } else console.error(error)
        });

    } else {
      // fingerprint auth isn't available
    }
  })
  .catch(error => console.error(error));

   
 
  }



  getHeaderStyle() {
    return { background: this.primaryColor };
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
        })
  };

log(){
  
this.apiservice.setName(this.f.email);
this.apiservice.setPassword(this.f.password);
this.apiservice.getPassword();
  
  this.apiservice.setCpin(this.f.cpin);
this.cpin=this.apiservice.getCpin();
console.log(this.cpin);
  this.http.post(config.apiUrl+"login",this.f,this.httpOptions).subscribe(res=>{
    this.login_values=res;
    this.permissions=res["permissions"];
  //this.apiservice.setPermissions(JSON.stringify(this.permissions));
localStorage.setItem('permissions',JSON.stringify(this.permissions));
    this.apiservice.setToken(this.login_values.token);
 
    let token=this.apiservice.getToken();
         console.log(token);
     if(token!=null){
      this.navCtrl.setRoot(HomePage);
     }   
    else{
      this.navCtrl.setRoot(LoginPage);
    }
    })

}



showPassword() {
   this.showPass = !this.showPass;
   if(this.showPass){
     this.type = 'text';
   } else {
     this.type = 'password';
   }
}


register(){
  this.navCtrl.setRoot(RegistrationPage);
}

clearCpin(){
this.pin=this.apiservice.getPin();
this.f.cpin=this.pin
}

ionViewWillEnter(){
  
this.isLoading=true;

//like ngonint 
//when the component is fired
}
ionViewDidEnter(){
  
  this.f.cpin=this.apiservice.getCpin();
 //after the component is loaded
}
ionViewWillLeave(){
  //fired when the component leave
}
ionViewDidLeave(){
  //when component leave one to another, in new component it will load
}


  openForgotPassword() {
    this.navCtrl.push(ForgotpasswordPage);
  }
  
  

	handleError(error) {
		console.log(error);
		return error.json().message || 'Server error, please try again later';
	}

}






