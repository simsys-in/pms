
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
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})

export class EditprofilePage {

  emp: any=[];
  userForm: FormGroup;
  public loading;
  public token;
  public url;
  public basicInformation = true;
  public experienceInformation = false;
  public educationInformation = false;
f:any= 
  {
  
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
   this.emp=this.navParams.get("emp");
this.f.employee=this.emp.employee,
this.f.dob=this.emp.dob;
this.f.address=this.emp.address;
this.f.city=this.emp.city;
//this.f.gender=this.emp.gender,
this.f.phone=this.emp.mobile;
this.f.email=this.emp.email;
this.id=this.emp.id;
   this.userForm = fb.group({
      'education': fb.array([this.educationForm()]),
      'experience': fb.array([this.experienceForm()])
    });
    this.primaryColor = localStorage.getItem('primary_color');
  }
httpOptions={
  headers:new HttpHeaders({
    "content-type":"Application/json",
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
   this.http.put(config.apiUrl+"payroll/employee/"+this.id,this.f,this.httpOptions).subscribe(res=>{
    console.log(res);
  })
    };
 

  getHeaderStyle(){
    return { 'background':   this.primaryColor}
  };
  
  educationForm(): FormGroup {
    return this.fb.group({
      'institution': new FormControl('',Validators.required),
      'subject': new FormControl('',Validators.required),
      'start_year': new FormControl('',Validators.required),
      'complete_year': new FormControl('',Validators.required),
      'degree': new FormControl('',Validators.required),
      'grade': new FormControl('',Validators.required),
    })
  };

  experienceForm(): FormGroup {
    return this.fb.group({
      'company': new FormControl('',Validators.required),
      'location': new FormControl('',Validators.required),
      'jop_position': new FormControl('',Validators.required),
      'period_from': new FormControl('',Validators.required),
      'period_to': new FormControl('',Validators.required),
    })
  }

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


  BasicInformation() {
    this.basicInformation = true;
    this.experienceInformation = false;
    this.educationInformation = false;
  }

  EducationInformation() {
    this.basicInformation = false;
    this.educationInformation = true;
    this.experienceInformation = false;
  }
  ExperienceInformation() {
    var keepGoing = true;
    var a =0;
    this.userForm.value.education.forEach((value) => {
      if(keepGoing)
      if(value.institution!='' && value.subject!='' && value.start_year!=''&&value.complete_year!=''&& value.degree!=''&&value.grade!=''){
       a++;
      }
      else{
        this.referenceService.basicAlert('Smart HRMS',"Please fill all the empty fields");
        keepGoing = false;
      }
      if(this.userForm.value.education.length==a){
        this.basicInformation = false;
        this.educationInformation = false;
        this.experienceInformation = true;
      }
   });
   if(this.userForm.value.education.length==0){
    this.basicInformation = false;
    this.educationInformation = false;
    this.experienceInformation = true;
  }
  };
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

  selectFrom1() {
    this.userForm.value.experience.forEach((value,key) => {
      this.experiencefrom[key] = value.period_from;
   });
  };

  addEducation(): void {
    const control = <FormArray>this.userForm.controls.education;
    control.push(this.educationForm());
  };

  removeEducation(value): void {
    const control = <FormArray>this.userForm.controls.education;
    control.removeAt(value);
  };
  removeExperience(value): void {
    const control = <FormArray>this.userForm.controls.experience;
    control.removeAt(value);
  };

  addExperience() {
    const control = <FormArray>this.userForm.controls.experience;
    control.push(this.experienceForm());
  };
  moveFocus(nextElement) {
    nextElement.setFocus();
  };
   editemployee(){
    
    this.referenceService.basicAlert("Success", 'Profile updated successfully');
    this.navCtrl.pop();
  }
}




