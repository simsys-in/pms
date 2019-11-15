import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, } from 'ionic-angular';
import { Toast } from '@ionic-native/toast/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../providers/apiServices';
import { ReferenceService } from '../../providers/referenceService';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DepartmentsPage } from '../departments/departments';
import { AddLeaveTypePage } from '../leave-types/leave-types';
import { AddDesignationsPage } from '../add-designations/add-designations';
import { config } from '../../app/config/config';
import { Observable } from 'rxjs';

import { map,startWith } from 'rxjs/operators';
import { a } from '@angular/core/src/render3';
/**
 * Generated class for the AddDepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-employee-category',
  templateUrl: 'add-employee-category.html',
})
export class AddEmployeeCategoryPage {
  public searchTerm: any = "";
  public items: any=[];

  f:any={

  }
  public loading;
  public url;
  private deptForm: FormGroup;
  public token;
  primaryColor: any;
  secondryColor: any;
formSate:any;

  disabled=true;

  
  isItemAvailable: boolean=false;
  val: any;
  emps: any;
    empCategories: any;
  name: string;
  create: any;


  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams, private fb: FormBuilder, 
    private nav:NavController,
    private alertCtrl: AlertController,
    public Model:ModalController,
    public tostr:ToastController,
    public toast:Toast,
    public refservice:ReferenceService,
    private apiService: ApiService, private referenceService: ReferenceService, private http: HttpClient) {
  
this.empCategories=this.navParams.get('category')
this.primaryColor = localStorage.getItem('primary_color');

  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() {
    if(this.empCategories!=null){
      this.f.employee_category=this.empCategories.employee_category,
      this.f.id=this.empCategories.id
    }
  }
  

  setFilteredItems() {
  //  this.items = this.apiService.filterItems(this.searchTerm);
  }
  ngOnDestroy(){
    //alert(' i am collapsed')
  }
  ionViewDidEnter(){

    //alert('i am camed');
  }
  ionViewWillLeave(){
 //   alert('i am going to leave')
  }

  ionViewDidLeave(){
   // alert(' iam leaved');
  }
  createCat() {
 this.formSate='form';
    if(this.f.employee_category==null){
    this.name="Please enter the category";
    }
    else{
      this.name=null;
    }
    this.http.post<any>(config.apiUrl+"payroll/employee_category",this.f,this.httpOptions).subscribe(res=>{
      
       if(res.status==true){
       let toast = this.tostr.create({
        message: 'Branch was created successfully',
        duration: 3000,
        position: 'buttom'
      });
 
      toast.present();
      this.navCtrl.pop()
    }else{
     
     //  this.referenceService.basicAlert("Branch",'branch field could not be Empty');
    }
      
      })
   //this.referenceService.basicAlert("Success", 'Department added successfully');



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"payroll/employee_category/"+id,this.f,this.httpOptions).subscribe(res=>{
      
      if(res["status"]=="updated"){
        let toast = this.tostr.create({
         message: 'Updated Successfully',
         duration: 3000,
         position: 'buttom'
       });
          toast.present();
       this.navCtrl.pop()
     }else{
       this.referenceService.basicAlert("Category",'category field could not be Empty');
     }
    })
    
  }

delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"payroll/employee_category/"+id,this.httpOptions).subscribe(res=>{
    
    if(res["success"]==true){
      let toast = this.tostr.create({
       message: 'Deleted Successfully'   +id,
       duration: 3000,
       position: 'buttom'
     });
  
   
     toast.present();
     this.navCtrl.pop()
   }else{
     this.referenceService.basicAlert("Category",'category field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
