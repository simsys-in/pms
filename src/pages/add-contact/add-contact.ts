import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, } from 'ionic-angular';
import { Toast } from '@ionic-native/toast/ngx';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../providers/apiServices';
import { ReferenceService } from '../../providers/referenceService';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from '../../app/config/config';

/**
 * Generated class for the AddDepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactpage {
  f={
   contact_name:'',
   company:'',
   company_category:'',
   group:'',
   email:'',
   mobile:'',
   phone:'',
   designation:'',
   city:'',
   state:'',
   source_from:'',
   last_acs_date:'',
   web:''
  }
  public searchTerm: any = "";
  public items: any=[];

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
  id: any;


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

  }


httpOptions={headers:new HttpHeaders({
  "content-type":"application/json",
  'Authorization':localStorage.token
  })}

  ionViewWillEnter() {
    alert("fdg");
  };
  setFilteredItems() {
  //  this.items = this.apiService.filterItems(this.searchTerm);
  }



  createContact() {
    if(this.f!=null){
      this.http.post<any>(config.apiUrl+"projectManagement/contacts",this.f,this.httpOptions).subscribe(res=>{
        console.log(res);
        if(res.status==true){
        let toast = this.tostr.create({
         message: 'Contacts was created successfully'+res.id,
         duration: 3000,
         position: 'buttom'
       });
  
       toast.present();
       //this.navCtrl.pop()
     }
            })
    }
    else{
      this.referenceService.basicAlert("Error", 'Contact cannot be empty');
    }
 
   



  }
  update(id){
    //this.refservice.basicAlert("id",id)
    this.http.put(config.apiUrl+"projectManagement/contacts"+id,this.f,this.httpOptions).subscribe(res=>{
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
       this.referenceService.basicAlert("Contact",'contact field could not be Empty');
     }
    })
    
  }

 save(){
   
   this.items=[{}]
 } 
delete(id){
  //this.referenceService.basicAlert("id",id);
  this.http.delete(config.apiUrl+"projectManagement/contacts/"+id,this.httpOptions).subscribe(res=>{
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
     this.referenceService.basicAlert("Contacts",'contacts field could not be Empty');
   }
  })
}
  

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };


}
