
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, TabHighlight, IonicPageModule } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '../../../node_modules/@angular/forms';
import { ReferenceService } from '../../providers/referenceService';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { LoginPage } from '../login/login';
import { DataService } from '../../providers/JsonService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../app/config/config';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import 'rxjs/add/operator/map';
import { TimeSheetEditPage } from '../timesheets/timesheetslist';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})

export class EmployeePage {

  emp: any=[];
  userForm: FormGroup;
  public loading;
  public token;
  public url;
  public basicInformation = true;
  public experienceInformation = false;
  public educationInformation = false;
f:any=  {
  id:'',
  department:'',
department_id:'',
designation:'',
designation_id:'',
employee_category:'',
employee_category_id:'',
branch:'',
branch_id:'',
employee:'',
shift:'',
shift_id:'',
employee_code:'',
dob:'',
address:'',
city:'',
joined:'',
amount:'',
resign_date:'',
phone:'',
email:'',
esino:'',
pfno:'',
panno:'',
adharno:'',
salary:'',
basic:'',
ot:'',
shift_id_compliance:'',
bank:'',
bankacname:'',
bankacno:'',
ifsc_code:'',
bank_branch:'',
mobile:'',
narration:'',
user_id:'',

gender:'',
uno_code:'',
marital_status:'',
have_vehicle:'',
driving_license_no:'',
expected_salary:'',
expected_designation:'',
appointed_id:'',
authorized_id:'',
father_name:'',
emp_status:'',


shift_compliance:'',

  };


  public education_details: any = {};
  public temp: any = {};
  public experience_information: any = {};
  public editprofilePage = this;
  public currentTime;
  public day;
  public year;
  public month;
  public educationfrom:any =[];
  public experiencefrom:any =[];

  public primaryColor:any;
   designations: any=[];
   filteredDesig: any;
   allData: any=[];
   filterData: any=[];
   searchTerm: any;
   departments: any=[];
   branches: any=[];
   emp_categories: any=[];
   banks: any=[];
   shifts: any=[];
   employees: any=[];
   t: any={
     user:''
   };
   id: any;


  constructor(public navCtrl: NavController,public dataService : DataService, public navParams: NavParams, public fb: FormBuilder, public referenceService: ReferenceService, public apiService: ApiService, public http: HttpClient) {
   this.primaryColor = localStorage.getItem('primary_color');
   this.http.get(config.apiUrl+"payroll/employee",this.httpOptions).subscribe(res=>{
     this.employees=res;
   })
  }
httpOptions={
  headers:new HttpHeaders({
    "content-type":"application/json",
    "Authorization":localStorage.token,
  })
}

  ionViewDidLoad(){
    this.currentTime = new Date();
    this.year = this.currentTime.getFullYear();
    this.month =this.currentTime.getMonth()+1 ;
    this.day =this.currentTime.getDate()-1;
    if (this.month < 10) { this.month = '0' + this.month; }
    if (this.day < 10) { this.day = '0' + this.day; }
    this.currentTime = this.year+'-'+this.month+'-'+this.day;
  }
  submit() {
   this.http.post(config.apiUrl+"payroll/employee",this.f,this.httpOptions).subscribe(res=>{
    console.log(res);
  })
    };
 

  getHeaderStyle(){
    return { 'background':   this.primaryColor}
  };


  ionViewWillEnter() {
    
  }

  ionViewDidEnter(){

  }
  designation() {
    this.http.get(config.apiUrl+"payroll/designation",this.httpOptions).subscribe(res=>{
this.designations=res
    })
  }

  filterDesig(param : any) : void
  {
     this.designation();
  
     let val : string 	= param;
  
     // DON'T filter the technologies IF the supplied input is an empty string
 
        this.designations = this.designations.filter((item) =>
        {
          return item.designation.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
        })
     
  }


department(){
  this.http.get(config.apiUrl+"payroll/department",this.httpOptions).subscribe(res=>{
    this.departments=res;
  })
}

shift(){
  this.http.get(config.apiUrl+"payroll/shift",this.httpOptions).subscribe(res=>{
        this.shifts=res;
  })
}
category(){
  this.http.get(config.apiUrl+"payroll/employee_category",this.httpOptions).subscribe(res=>{
    this.emp_categories=res;
  })
}

branch(){
  this.http.get(config.apiUrl+"payroll/branch",this.httpOptions).subscribe(res=>{
    this.branches=res;
  })
}

user1(res){
 this.f.user_id=res.user_id;
}

bank(){
  this.http.get(config.apiUrl+"payroll/bank",this.httpOptions).subscribe(res=>{
    this.banks=res;
  })
}

filterBank(param:any){
  this.bank();
  
  let val : string 	= param;

  // DON'T filter the technologies IF the supplied input is an empty string

     this.banks = this.banks.filter((item) =>
     {
       return item.bank.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
     })
  
}
filterDepart(param:any){
  this.department();
  
  let val : string 	= param;

  // DON'T filter the technologies IF the supplied input is an empty string

     this.departments = this.departments.filter((item) =>
     {
       return item.department.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
     })
  
}

filterShift(param:any){
  this.shift();
  
  let val : string 	= param;

  // DON'T filter the technologies IF the supplied input is an empty string

     this.shifts = this.shifts.filter((item) =>
     {
       return item.shift.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
     })
  
}

filterCategory(param:any){
  this.category();
  
  let val : string 	= param;

  // DON'T filter the technologies IF the supplied input is an empty string

     this.emp_categories = this.emp_categories.filter((item) =>
     {
       return item.employee_category.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
     })
  
}

ba(res){
  this.f.bank=res.bank;
  this.f.bank_id=res.id;
}

cat(res){
this.f.employee_category=res.employee_category;
this.f.employee_category_id=res.id;
}

filterBranch(param:any){
  this.branch();
  
  let val : string 	= param;

  // DON'T filter the technologies IF the supplied input is an empty string

     this.branches = this.branches.filter((item) =>
     {
       return item.branch.toLowerCase().indexOf(val.toLowerCase()) > -1 ;
     })
  
}


 
desig(res)
{
  this.f.designation=res.designation;
  this.f.designation_id=res.id;
}

depart(res)
{
  this.f.department=res.department;
  this.f.department_id=res.id;
}

br(res)
{
  this.f.bank_branch=res.branch;
  this.f.branch_id=res.id;
}

sf(res){
 this.f.shift=res.shift;
 this.f.shift_id=res.id;
}

selectFrom() {
    this.userForm.value.education.forEach((value,key) => {
      this.educationfrom[key] = value.start_year;
   });
  };
  

}




