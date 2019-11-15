import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { EditprofilePage } from '../editprofile/editprofile';
import { ReferenceService } from '../../providers/referenceService';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { Camera, CameraOptions } from '../../../node_modules/@ionic-native/camera';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { FileUploadOptions, FileTransfer, FileTransferObject } from '../../../node_modules/@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoginPage } from '../login/login';
import { DataService } from '../../providers/JsonService';
import { config } from '../../app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Content) content: Content;
  profile = "overview";
  public loading;
  public url;
  public token;
  public resp;
  public profileData: any = {};
  public role: any;
  public roleId: any;
  public educationDetails: any;
  public exprienceInfo: any;
  public imagePath;
  public profileImage;
  noEducation = false;
  noExperience = false;
  user_id: any;
  primaryColor: any;
  secondryColor: any;
  public colorCode: any;
  id: any;
  emp: any;
  constructor(public navCtrl: NavController, public dataService: DataService, public navParams: NavParams, private transfer: FileTransfer, private file: File, private actionSheet: ActionSheet, private camera: Camera, public referenceService: ReferenceService, public apiService: ApiService, public http: HttpClient) {
    this.role = localStorage.getItem('role');
    this.roleId = localStorage.getItem('role_id');
    this.emp = this.navParams.get("emp");
    console.log(this.emp);
    this.colorCode = {
      'background-color': localStorage.getItem('colorCode'),
    }
    this.primaryColor = localStorage.getItem("primary_color");
    this.secondryColor = localStorage.getItem("secondry_color");
  
  }

  getstyle() {
    return {
      background:
        "linear-gradient(" + this.primaryColor + "," + this.secondryColor + ")"
    };
  }
  getProgresstyle() {
    return {
      background:
        "linear-gradient(to right," + this.secondryColor + "," + this.primaryColor + ")"
    };
  }
  getHeaderStyle() {
    return { background: this.primaryColor };
  }
httpOptions={
  headers:new HttpHeaders({
    "content-type":"application/json",
    "Authorization":localStorage.token
  })
}

  ionViewDidLoad() {
    
this.http.get(config.apiUrl+"payroll/employee",this.httpOptions).subscribe(res=>{
  this.profileData=res;
  console.log(this.profileData);
  this.profileData.forEach(element => {
  if(this.id==element.id){
this.profileData.email=element.email;
this.profileData.employee=element.employee;
this.profileData.designation=element.designation;
this.profileData.mobile=element.mobile;
this.profileData.address=element.address;
this.profileData.id=element.id;
this.profileData.dob=element.dob;
  }
 
  });
})

    this.profileImage = this.profileData.avatar;
 
  }
  editProfile(emp) {

  this.navCtrl.push(EditprofilePage,{emp:emp
  } );
  }

  

  setDefaultPic() {
    this.profileImage = "assets/imgs/user.jpg";
  }
}
