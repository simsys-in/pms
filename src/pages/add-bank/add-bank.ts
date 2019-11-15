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
/**
 * Generated class for the AddDepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-bank',
  templateUrl: 'add-bank.html',
})
export class AddbankPage {
  public searchTerm: any = "";
  public items: any=[];

  f:any={
    bank:'',
    id:''
  }
  public loading;
  public url;
  private deptForm: FormGroup;
  public token;
  primaryColor: any;
  secondryColor: any;


  disabled=true;

  
  isItemAvailable: boolean=false;
  val: any;
  emps: any;
  ports: { id: number; name: string; country: string; }[];

  bankIfo: any;


  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams, private fb: FormBuilder, 
    private nav:NavController,
    private alertCtrl: AlertController,
    public Model:ModalController,
    public tostr:ToastController,
    public toast:Toast,
    public refservice:ReferenceService,
    private apiService: ApiService, private referenceService: ReferenceService, private http: HttpClient) {
  this.bankIfo=this.navParams.get('bank');

this.primaryColor = localStorage.getItem('primary_color');

  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() 
  {
    if(this.bankIfo!=null){
      this.f.bank=this.bankIfo.bank;
      this.f.id=this.bankIfo.id;
    }
 
 };
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
  createbank() {
    if(this.f.bank==null)this.referenceService.basicAlert("bank",'Enter the bank');
    this.http.post<any>(config.apiUrl+"payroll/bank",this.f,this.httpOptions).subscribe(res=>{
       console.log(res);
       if(res.status==true){
       let toast = this.tostr.create({
        message: 'bank was created successfully',
        duration: 3000,
        position: 'buttom'
      });
 
      toast.present();
      this.navCtrl.pop()
    }else{
     
      this.referenceService.basicAlert("bank",'bank field could not be Empty');
    }
      
      })
   //this.referenceService.basicAlert("Success", 'Department added successfully');



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"payroll/bank/"+id,this.f,this.httpOptions).subscribe(res=>{
      
      if(res["status"]=="updated"){
        let toast = this.tostr.create({
         message: 'Updated Successfully',
         duration: 3000,
         position: 'buttom'
       });
          toast.present();
       this.navCtrl.pop()
     }else{
       this.referenceService.basicAlert("bank",'bank field could not be Empty');
     }
    })
    
  }

delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"payroll/bank/"+id,this.httpOptions).subscribe(res=>{
    
    if(res["success"]==true){
      let toast = this.tostr.create({
       message: 'Deleted Successfully'   +id,
       duration: 3000,
       position: 'buttom'
     });
  
   
     toast.present();
     this.navCtrl.pop()
   }else{
     this.referenceService.basicAlert("bank",'bank field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
