import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, } from 'ionic-angular';
import { Toast } from '@ionic-native/toast/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { ApiService } from '../../providers/apiServices';
import { ReferenceService } from '../../providers/referenceService';
import { HTTP } from '../../../node_modules/@ionic-native/http';
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
  selector: 'page-add-status',
  templateUrl: 'add-status.html',
})
export class AddStatusPage {
  public searchTerm: any = "";
  public items: any=[];

  public loading;
  public url;
  private deptForm: FormGroup;
  public token;
  primaryColor: any;
  secondryColor: any;
  t={
    name:'',
    id:'',
  }

f={
status:'',
id:'',
}
  disabled=true;

  
  isItemAvailable: boolean=false;
  val: any;
  emps: any;
  ports: { id: number; name: string; country: string; }[];
  id: any;
  statusInfo: any=[];


  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams, private fb: FormBuilder, 
    private nav:NavController,
    private alertCtrl: AlertController,
    public Model:ModalController,
    public tostr:ToastController,
    public toast:Toast,
    public refservice:ReferenceService,
    private apiService: ApiService, private referenceService: ReferenceService, private http: HttpClient) {
 
    this.primaryColor = localStorage.getItem('primary_color');
this.statusInfo=this.navParams.get('status');
  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() {
    if(this.statusInfo!=null){
this.f.status=this.statusInfo.status;
 this.f.id=this.statusInfo.id;
    }
  };
  setFilteredItems() {
  //  this.items = this.apiService.filterItems(this.searchTerm);
  }



  createDept() {
   /// if(this.f.status==null)this.referenceService.basicAlert("status",'Enter the status');
    this.http.post<any>(config.apiUrl+"projectManagement/status",this.f,this.httpOptions).subscribe(res=>{
       console.log(res);
       if(res.status==true){
       let toast = this.tostr.create({
        message: 'Status was created successfully',
        duration: 3000,
        position: 'buttom'
      });
 
      toast.present();
      this.navCtrl.pop()
    }else{
     
      this.referenceService.basicAlert("Status",'status field could not be Empty');
    }
      
      })
   //this.referenceService.basicAlert("Success", 'Department added successfully');



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"projectManagement/status/"+id,this.f,this.httpOptions).subscribe(res=>{
      console.log(res);
      if(res["status"]=="updated"){
        let toast = this.tostr.create({
         message: 'Updated Successfully',
         duration: 3000,
         position: 'buttom'
       });
          toast.present();
       this.navCtrl.pop()
     }else{
       this.referenceService.basicAlert("Status",'status field could not be Empty');
     }
    })
    
  }

 save(){
   console.table(this.t);
   this.items=[{}]
 } 
delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"projectManagement/status/"+id,this.httpOptions).subscribe(res=>{
    console.log(res)
    if(res["success"]==true){
      let toast = this.tostr.create({
       message: 'Deleted Successfully'   +id,
       duration: 3000,
       position: 'buttom'
     });
  
   
     toast.present();
     this.navCtrl.pop()
   }else{
     this.referenceService.basicAlert("Status",'status field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
