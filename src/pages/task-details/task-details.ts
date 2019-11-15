
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController, Platform, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { ReferenceService } from '../../providers/referenceService';
import { Content } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateProjectPage } from '../create-project/createproject';
import { CreateTaskPage } from '../create-task/createtask';
import { ThrowStmt } from '@angular/compiler';
import { config } from '../../app/config/config';
import { HttpHandler, HttpHeaders, HttpClient } from '@angular/common/http';
import { key } from 'localforage';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AnyARecord } from 'dns';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { TasksPage } from '../tasks/tasks';
import { HomePage } from '../home/home';
import { asElementData } from '@angular/core/src/view';



/**
 * Generated class for the EmployeelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  @ViewChild(Content) content: Content;
public disabled=false;
status1='Open';

buttonIcon: string;
  isPlaying:any;
isPause=false;
isPlay=true;
name:any;
id1: any;
myColor="#32a858";
private visible = []; 
  token: any;
  url: any;
  loading: any;
  resp: any;
  color: any;
  public role: any;
  public roleId: any;
  public noData = false;
  public primaryColor: any;
  public task: any;
  public project: any;
  files = false;
  secondryColor: any;
  task_date: any;
  project_name: any;
  due_date: any;
  naration: any;
  id: any;
  admin: any;
  task_log_id: any;
  narration: any;
  project_task: any;
  dateTime: string;
  val:any={
    status_id:'1',
      task_id:this.id,
      id:this.task_log_id,
    start_time:this.dateTime
    };
f:any={
  narration:this.narration,
  id:this.id,
  due_date:this.due_date,
  project_task:this.project_task,
  task_date:this.task_date
}
  employee_id: any;
  f1: { task_id: any; };
  hrs: any;


  showToggle: boolean=true;
  streamingMedia: any;

  myKey: string;
  response: any;
  date: any;

  data: {task_id:any, id: any; status_id: any;  };

  status: any;
  button: any;
  newId: string;
  newStatus: any;
  _audioProvider: any;
  items: any;
  
  isenabled: boolean=false;

  status_id: any;
  
  resId: string;
  fstatus: any;
  task_log_id1: any;
  end_time: any;
  btn_status: any;
  date1: Date;
  
  saveId: void;
  receiveId: any;
  button1: any;
  state: number;

  constructor(public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public apiService: ApiService, 
    public backgroundmode:BackgroundMode,
    public splasgscreen:SplashScreen,
    public alertCtrl:AlertController,
        public statusbar:StatusBar,public platform:Platform, 
    public modalCtrl: ModalController, public popoverCtrl: PopoverController, private referenceservice: ReferenceService, public navParams: NavParams, private http: HttpClient) {
    
      this.role = localStorage.getItem('role');
    this.roleId = localStorage.getItem('role_id');
    this.color = localStorage.getItem('colorCode');
    this.primaryColor = localStorage.getItem('primary_color');
    this.id = this.navParams.get('id');
    this.narration=this.navParams.get('narration');
    this.due_date=this.navParams.get('due_date');
    this.project_task=this.navParams.get('project_task');
    this.task_date=this.navParams.get('task_date');
    this.employee_id=this.navParams.get('employee_id');
    this.hrs=this.navParams.get('hrs');
    this.task_log_id=this.navParams.get('task_log_id');
    
    this.status=this.navParams.get('status');
    
    this.btn_status=this.navParams.get('btn_status')
   
    this.date=this.apiService.getDate();
    this.newStatus=this.apiService.getStatus();
    
    //this.admin=localStorage.getName();
    //this.project = this.navParams.get('project');
    this.secondryColor = localStorage.getItem('secondry_color');
 this.resId=this.apiService.getResId();

  }
httpOptions={
  headers:new HttpHeaders({
    "content-type":"application/json",
    "Authorization":localStorage.token
  })
}


ionViewWillEnter() {
  
  var today = new Date();
  
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  this.dateTime = date+' '+time;
   
   this.onLoadIcon();
   this.apiService.setId(this.id);
   this.apiService.setNarration(this.narration);
    this.apiService.setDueDate(this.due_date);
    this.apiService.setProjectName(this.project_task);
    this.apiService.setTaskDate(this.task_date);
this.apiService.setEmployeeId(this.employee_id);

  }
  onLoadIcon(){
    if(this.btn_status=="on"){
      this.buttonIcon="pause";

    }
   else if(this.btn_status=="off"){
      this.buttonIcon="play";
      
      
    }
    else if(this.btn_status=="0"){
      this.buttonIcon="play";
    }
else if(this.btn_status=="cls"){
  this.buttonIcon=""
}
  }
ionViewDidLoad(){

}


toggleIcon() {
if (this.buttonIcon === 'play') {
     // alert('start');
   this.buttonIcon = "pause";
 this.saveLog();
 }
 else if (this.buttonIcon === 'pause') {
      //alert('end');
    this.buttonIcon = "play";
   this.endTask();
 }
 }


 saveLog(){
  this.f1={
   task_id:this.id,
//id:this.task_log_id
 };
this.http.post(config.apiUrl+"projectManagement/project_report/save_task_log",this.f1,this.httpOptions).subscribe(res=>{
this.task_log_id1=res['id'];

this.saveId=this.apiService.setSaveId(this.task_log_id1);


if(res['status']=='created'){
  //this.navCtrl.pop(); 
   return true;
}
})

}

endTask(){
this.data={
   task_id:this.id,
   id:this.apiService.getSaveID(),
   status_id:'2',
 }
this.http.post(config.apiUrl+"projectManagement/project_report/save_task_log",this.data,this.httpOptions).subscribe(res=>{
 console.log(res);
 
this.end_time=res['end time updated']
 })
}

complete() {
 let alert = this.referenceservice.confirmAlert("Confirm to complete", "Do you want to continue to add this task to complete list?");
  alert.present();
  alert.onDidDismiss((data) => {
this.http.post(config.apiUrl+"projectManagement/project_report/update_task_log_end_time",this.val,this.httpOptions).subscribe(res=>{
console.log(res);
//this.complete1();
this.navCtrl.pop();
}) 
  });
}

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };

  setDefaultUserPic(img) {
    img.avatar = "assets/imgs/user.jpg";
  };
  getProgresstyle() {
    return {
      background:
        "linear-gradient(to right," + this.secondryColor + "," + this.primaryColor + ")"
    };
  }
  getFontstyle() {
    return { color: this.secondryColor };
  }





  edit() {
    this.navCtrl.push(TaskEditPage, {
      project: this.project,
      task: this.task
    })
  };




    // ...
    getActiveItems() {
      // NOTE: Returning a new array might mess up the change detection of Ng2.
      // TODO: Use an existing array instead of returning a new one each time.
      return this.items.filter(item => !item.deleted);
  }



startStopPlaying () {
//your logic to play pause
 if(this.isPlaying) {
this.endTask()
  } else {
this.saveLog();
  }
   this.isPlaying = !this.isPlaying;
 }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TaskPopoverPage);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if (data == "edit") {
        this.edit();
      }
      else if (data == "delete") {
     var action="delete";
    this.delete()

      }
    })
  };
  delete() {
    let alert = this.referenceservice.confirmAlert("Confirm Delete", "Do you want to continue to delete this task");
    alert.present();
    alert.onDidDismiss((data) => {
      this.http.delete(config.apiUrl+"projectManagement/project_task/"+this.id,this.httpOptions).subscribe(res=>{
        console.log(res);
        if(res["success"]==true){
          this.navCtrl.pop();
        }
        else
        {
          return false;
        }

      })
   
    });
  };
}

// ********************************************** Edit Task *********************************



@Component({
  selector: 'page-task-details',
  templateUrl: 'taskEdit.html',
})
export class TaskEditPage {

  public selected;
  public selected1;
  public loading;
  public url;
  public token;
  public resp;
  public task: any = {};
  public projectData: any = {};
  public username1 = false;
  public password1 = false;
  public email1 = false;
  public phone1 = false;
  projectForm: FormGroup;
  public primaryColor: any;
  public fixed = false;
  taskMember = [];
  project: any;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public popoverCtrl: PopoverController, public navParams: NavParams, public referenceService: ReferenceService, public apiService: ApiService, public http: HTTP) {
    this.projectForm = fb.group({
      'project': ['', [Validators.required]],
      'task_name': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'assigned_to': [, Validators.compose([Validators.required])],
      'start_date': ['', [Validators.required]],
      'due_date': ['', [Validators.required]],
      'estimate': ['', [Validators.required]],
      'task_id': ['', [Validators.required]],
    });
    this.primaryColor = localStorage.getItem('primary_color');
    this.task = this.navParams.get('task');
    this.project = this.navParams.get('project');

    this.task.assigned_to.forEach(element => {
      this.taskMember.push(element.user_id);
    });
  }

  ionViewWillEnter() {
   
  };

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };

  moveFocus(nextElement) {
    nextElement.setFocus();
  };

  addEmployee() {
    this.referenceService.basicAlert("Success", 'task edited successfully');
    this.navCtrl.pop();
  };
}


@Component({
  template: `
  <ion-list class="popover-list">
  <button ion-item  (click)="edit()">Edit</button>
  <button ion-item  (click)="delete()">Delete</button>
  </ion-list>
`
})
export class TaskPopoverPage {
  public employee;
  public roleId: any;
  public role: any;
  id: any;
  narration: any;
  due_date:any;
  project_task: any;
  task_date: any;
  employee_id: string;

  constructor(public viewCtrl: ViewController,
    public apiservice:ApiService,
    public navParams: NavParams, public navCtrl: NavController) {
  this.id=this.apiservice.getId();
  this.narration=this.apiservice.getNarration();
  this.due_date=this.apiservice.getDueDate();
  this.project_task=this.apiservice.getProjectName();
  this.task_date=this.apiservice.getTaskDate();
this.employee_id=this.apiservice.getEmployeeId();

  }

  edit() {
   this.navCtrl.push(CreateTaskPage,{
   id:this.id,
   narration:this.narration,
   due_date:this.due_date,
   project_task: this.project_task,
   task_date:this.task_date,
employee_id:this.employee_id,
   })
  }

  delete() {
    var action = "delete";
    this.viewCtrl.dismiss(action);
  }
}

// toggle(key) {

//   var index = this.visible.indexOf(key);
//   if (index > -1) {
//    //alert("tab to stop")
//     this.endTask();
//     this.visible.splice(index, 1);
//     return index;
//   } else {

//     //alert('tab to play')
//     this.saveLog();
//     this.visible.push(key);
//     return index;
//     }


// }