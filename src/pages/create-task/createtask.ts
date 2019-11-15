import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReferenceService } from '../../providers/referenceService';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '@ionic-native/http';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginPage } from '../login/login';

import { config } from '../../app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
/**
 * Generated class for the AddemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-createtask',
  templateUrl: 'createtask.html',
})
export class CreateTaskPage {
  public searchControl: FormControl;
  f:any={
    employee:'',
    narration:'',
    id:'',
    due_date:'',
project_task:'',
task_date:'',
employee_id:'',
visible_client:'',
btn_status:"off"
  }
  public employees: any=[];
  public items: any=[];
  allData = []; //Store all data from provider
  filterData = [];//Store filtered data
  public searchTerm: any = "";
  public selected;
  public selected1;
  public loading;
  public url;
  public token;
  public resp;
  public projectDetails:any = {};
  public designation;
  public designate = false;
  public username1 = false;
  public password1 = false;
  public email1 = false;
  public phone1 = false;
  projectForm: FormGroup;
  public primaryColor: any;
  public fixed = false;
  proDateFrom:any;
  currentTime:any;
  year:any;
  day:any;
  start= false;
  month:any;

  status_id='';


  labelAttribute: any;
  emp: any;

  items1: any=[];
 
  constructor(public navCtrl: NavController, 
    
    public fb: FormBuilder, public navParams: NavParams, public referenceService: ReferenceService, public apiService: ApiService, public http: HttpClient) {
    // this.projectForm = fb.group({
    //   'project': ['', [Validators.required]],
    //   'task_name': ['', [Validators.required]],
    //   'description': ['', [Validators.required]],
    //   'assigned_to': [, Validators.compose([Validators.required])],
    //   'start_date': ['', [Validators.required]],
    //   'due_date': ['', [Validators.required]],
    //   'visible': ['', [Validators.required]],
    //   'estimate': ['', [Validators.required]],
    //    });
    this.searchControl = new FormControl();


    this.primaryColor = localStorage.getItem('primary_color');
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.month = this.currentTime.getMonth() + 1;
    this.day = this.currentTime.getDate();
    if (this.month < 10) { this.month = '0' + this.month; }
    if (this.day < 10) { this.day = '0' + this.day; }
    this.currentTime = this.year + '-' + this.month + '-' + this.day;

    this.http.get(config.apiUrl+"payroll/employee",this.httpOptions).subscribe(res=>{
      this.employees=res;
    
    })
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Authorization":localStorage.token,
    })
  };
  
  ionViewDidEnter(){

  }
 filterItems(searchTerm) {
    return this.employees.filter(emp => {
      return emp.employee.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  setFilteredItems() {
  this.employees = this.filterItems(this.searchTerm);
  }

selectValue(value,id){
  this.f.employee=value;
  this.f.employee_id=id;

}


  ionViewWillEnter(){
    this.f.id=this.navParams.get("id");
    this.f.narration=this.navParams.get("narration");
    this.f.due_date=this.navParams.get("due_date");
    this.f.project_task=this.navParams.get("project_task");
    this.f.task_date=this.navParams.get("task_date");
   // this.f.employee_id=this.navParams.get("employee_id");
    console.table(this.f);
  };
  selectFrom() {
    this.proDateFrom = this.projectForm.value.start_date;
    this.start = true;
  };

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


  send(){
  
    this.http.post(config.apiUrl+"projectManagement/project_task",this.f,this.httpOptions).subscribe(res=>{
console.log(res);
if(res["status"]==true){
  this.navCtrl.pop();
}
else{
  return false
}
    })
  }

 
  moveFocus(nextElement) {
    nextElement.setFocus();
  };
  
  createtask() {
    this.referenceService.basicAlert("Success", 'Task created successfully');
    this.navCtrl.pop();
    
  };
  policies: any[] = [
    {id: 0, name: "policy001"},
    {id: 2, name: "policy002"},
    {id: 3, name: "policy003"},
    {id: 4, name: "policy004"},
    {id: 5, name: "policy005"},   
  ];
  isValid(field: string) {
    let formField = this.projectForm.get(field);
    return formField.valid || formField.pristine;
  };

  nameValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return { invalidName: true };
    }
    else {
      this.username1 = false;
    }
  };

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')) {
      return { invalidPassword: true };
    }
    else {
      this.password1 = false;
    }
  };

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}'))) {
      return { invalidEmail: true };
    }
    else {
      this.email1 = false;
    }
  };



  phoneValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.match('[0-9]+'))) {
      return { invalidPhone: true };
    }
    else {
      this.phone1 = false;
    }
  };
}

