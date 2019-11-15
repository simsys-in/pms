import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  PopoverController,
  AlertController,
  Config
} from "ionic-angular";
import { HTTP } from "../../../node_modules/@ionic-native/http";
import { ApiService } from "../../providers/apiServices";
import { ReferenceService } from "../../providers/referenceService";
import { PopoverPage } from "../employeelist/employeelist";
import { AddDepartmentPage } from "../add-department/add-department";
import { LoginPage } from "../login/login";
import { DataService } from "../../providers/JsonService";
import { config } from "../../app/config/config";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operator/map';
import { delayWhen } from "rxjs/operators";
import { AddBranchPage } from "../add-branch/add-branch";
import { AddEmployeeCategoryPage } from "../add-employee-category/add-employee-category";

/**
 * Generated class for the DepartmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-employee-category",
  templateUrl: "employee-category.html"
})
export class EmployeeCategoryPage {
  url: any;
  token: any;
  resp: any;
  departments: any;
  loading: any;
  public role: any;
  public roleId: any;
  public primaryColor: any;
  value: any;
  branches: Object;
  employee_categories: Object;
  categories: Object;
  
  constructor(
    
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
  ionViewDidEnter(){
   this.http.get(config.apiUrl+"payroll/employee_category",this.httpOptions).subscribe(res=>{
  this.categories=res;
  console.log(this.categories);
    })
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

newAdd(){
  this.navCtrl.push(AddEmployeeCategoryPage)
}

  // simsDelete(id){
  //   let alert = this.alertCtrl.create({
  //     title: 'Confirm Delete',
  //     message: 'Do you want to delete or Update this department?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('not delete clicked');
            
  //         }
  //       },
  //       {
  //         text: 'Delete',
  //         handler: () => {
  //           this.delete(id)
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  
  // }

addCat(category) {
this.navCtrl.push(AddEmployeeCategoryPage,{
  category:category
})
}

}
