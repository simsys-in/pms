import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, } from 'ionic-angular';
import { Toast } from '@ionic-native/toast/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '../../../node_modules/@angular/forms';
import { ApiService } from '../../providers/apiServices';
import { ReferenceService } from '../../providers/referenceService';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { LoginPage } from '../login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AddLeaveTypePage } from '../leave-types/leave-types';
import { AddDesignationsPage } from '../add-designations/add-designations';
import { config } from '../../app/config/config';
import { Observable } from 'rxjs';

import { map,startWith } from 'rxjs/operators';
/**
 * Generated class for the AdduserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUserPage {
  public searchTerm: any = "";
  public items: any=[];

  public loading;
  public url;
  private deptForm: FormGroup;
  public token;
  primaryColor: any;
  secondryColor: any;
  
f={
name:'',
 mobile:'',
 password:'',
 user_group_id:'',
 email:'',
 contact_name:'',
 cpin:'',
id:'',
}
  disabled=true;

  
  isItemAvailable: boolean=false;
  val: any;
  emps: any;
  ports: { id: number; name: string; country: string; }[];
  
  user: any;
  user_groups: any;


  constructor(public navCtrl: NavController, 
    
    public navParams: NavParams, private fb: FormBuilder, 
    private nav:NavController,
    private alertCtrl: AlertController,
    public Model:ModalController,
    public tostr:ToastController,
    public toast:Toast,
    public refservice:ReferenceService,
    private apiService: ApiService, private referenceService: ReferenceService, private http: HttpClient) {
 
this.f.cpin=this.apiService.getCpin();

    this.primaryColor = localStorage.getItem('primary_color');
this.user=this.navParams.get("user");
if(this.user!=null){
  this.f.name=this.user.name;
  this.f.id=this.user.id

}
else{
  this.f.name='';
  this.f.id='';
}
  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() {
this.http.get(config.apiUrl+"core/user_group",this.httpOptions).subscribe(res=>{
  this.user_groups=res;
  console.log(this.user_groups);
})

  };
  setFilteredItems() {
  //  this.items = this.apiService.filterItems(this.searchTerm);
  }



  createUser() {

    this.http.post<any>(config.apiUrl+"core/users",this.f,this.httpOptions).subscribe(res=>{
       console.log(res);
       if(res.status==true){
       let toast = this.tostr.create({
        message: 'user was created successfully',
        duration: 3000,
        position: 'buttom'
      });
 
      toast.present();
      this.navCtrl.pop()
    }else{
     
      this.referenceService.basicAlert("user",'user field could not be Empty');
    }
      
      })
   //this.referenceService.basicAlert("Success", 'user added successfully');



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"core/users/"+id,this.f,this.httpOptions).subscribe(res=>{
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
       this.referenceService.basicAlert("user",'user field could not be Empty');
     }
    })
    
  }

delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"core/users/"+id,this.httpOptions).subscribe(res=>{
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
     this.referenceService.basicAlert("user",'user field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
