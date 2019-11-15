import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  AlertController,
  
  Events
} from "ionic-angular";
import { HTTP } from "../../../node_modules/@ionic-native/http";
import { ApiService } from "../../providers/apiServices";
import { ReferenceService } from "../../providers/referenceService";
import { PopoverPage } from "../employeelist/employeelist";
import { AddDepartmentPage } from "../add-department/add-department";
import { LoginPage } from "../login/login";
import { DataService } from "../../providers/JsonService";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operator/map';
import { delayWhen } from "rxjs/operators";
import { AddUserPage } from "../add-user/add-user";
import { config } from "../../app/config/config";
/**
 * Generated class for the DepartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-user",
  templateUrl: "user.html"
})
export class UserPage {
  url: any;
  token: any;
  resp: any;
  departments: any;
  loading: any;
  public role: any;
  public roleId: any;
  public primaryColor: any;
  value: any;
  users: any=[];
  constructor(
    public events:Events,
    public alertCtrl:AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpClient,
    public dataService : DataService,
    private popoverCtrl: PopoverController,
    public apiServices: ApiService,
    public refService: ReferenceService
  ) {
    this.role = localStorage.getItem("role");
    this.roleId = localStorage.getItem("role_id");
    this.primaryColor = localStorage.getItem("primary_color");
  }
   httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}
  ionViewWillEnter() {
    //this.departments = this.dataService.departments;
  }

  getHeaderStyle() {
    return { background: this.primaryColor };
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

 ionViewDidEnter(){
   this.http.get(config.apiUrl+"core/users",this.httpOptions).subscribe(res=>{
this.users=res;
   })
 }

  addUser(row) {
    this.navCtrl.push(AddUserPage,{
      user:row
    });
  }

  



}
