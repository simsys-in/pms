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
  selector: 'page-add-user-group',
  templateUrl: 'add-user-group.html',
})
export class AddUserGroupPage {
  public searchTerm: any = "";
  public items: any=[];

  public loading;
  public url;
  private deptForm: FormGroup;
  public token;
  primaryColor: any;
  secondryColor: any;
i=0;
f={
  id:'',
user_group:'',

permissions:[{

  menu_id:'',
  route:'',
  type:'',
  add_permission:0,
  edit_permission:0,
  view_permission:0,
  delete_permission:0,
  
  }]
};
  disabled=true;

  
  isItemAvailable: boolean=false;
  val: any;
  emps: any;
  ports: { id: number; name: string; country: string; }[];
  id: any;
  user_group: any=[];
  resUsers: any=[];
  


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
 this.resUsers=this.navParams.get("user");
 if(this.resUsers!=null){
  this.f.user_group=this.resUsers.user_group;
  this.f.id=this.resUsers.id;
 }
else{
  this.f.user_group='',
  this.f.id=''

}
  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() {

  };
  ionViewDidEnter(){
this.http.get(config.apiUrl+"core/user_group/onload",this.httpOptions).subscribe(res=>{
  this.f.permissions=res['menus'];
})
  }
  setFilteredItems() {
  //  this.items = this.apiService.filterItems(this.searchTerm);
  }






  crete() {
    
    this.http.post<any>(config.apiUrl+"core/user_group",this.f,this.httpOptions).subscribe(res=>{
       console.log(res);
       if(res.status==true){
       let toast = this.tostr.create({
        message: 'User Group was created successfully',
        duration: 3000,
        position: 'buttom'
      });
 
      toast.present();
      this.navCtrl.pop()
    }else{
     
      this.referenceService.basicAlert("User",'user field could not be Empty');
    }
      
      })
   //this.referenceService.basicAlert("Success", 'Department added successfully');



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"core/user/"+id,this.f,this.httpOptions).subscribe(res=>{
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
       this.referenceService.basicAlert("User",'user field could not be Empty');
     }
    })
    
  }

delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"core/user/"+id,this.httpOptions).subscribe(res=>{
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
     this.referenceService.basicAlert("User",'user field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
