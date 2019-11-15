import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, PopoverController, ActionSheetController, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/apiServices';
import { HTTP } from '../../../node_modules/@ionic-native/http';
import { ReferenceService } from '../../providers/referenceService';
import { Content } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TaskDetailsPage } from '../task-details/task-details';
import { CreateTaskPage } from '../create-task/createtask';
import { DataService } from '../../providers/JsonService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../app/config/config';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { MusicControls } from '@ionic-native/music-controls/ngx';
import { e } from '@angular/core/src/render3';
import { IfStmt } from '@angular/compiler';
import { constants } from 'os';
import { reverse } from 'dns';
/**
 * Generated class for the EmployeelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  @ViewChild(Content) content: Content;
public disabled:boolean=false;
  token: any;
  url: any;
  loading: any;
  employeeList: any;
  pageNumber = 1;
  resp: any;
  project: any;
  color: any;

  page = false;
  compeltedTask = [];
  taskcompleted = false;
  notask = false;
  taskopen = false;
  openTasks = [];
  tasks = 'pending';
  public role: any;
  public roleId: any;
  public noData = false;
  public primaryColor: any;
  completed: any;
  complete_task_name: any;
  pending: any=[];
  all_task: any=[];
  hrs: any;
  isPlaying: boolean;
  platform: any;
  
  one: any;
saveId:any=[];
  btn: any;
  offId: any;
  button: any;
  saveId1: any;
  reverseId: any;
  constructor(public navCtrl: NavController,
    private backgroundmode:BackgroundMode,
    public dataservice:DataService, public apiService: ApiService, 
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl:AlertController,
    private musicControls: MusicControls,
        public modalCtrl: ModalController, public popoverCtrl: PopoverController, private referenceservice: ReferenceService, public navParams: NavParams, private http: HttpClient) {
    this.role = localStorage.getItem('role');
    this.reverseId=this.navParams.get("name");



    this.roleId = localStorage.getItem('role_id');
    this.color = localStorage.getItem('colorCode');
    this.primaryColor = localStorage.getItem('primary_color')
    this.project = this.dataservice.taskProject;
    this.project.tasks.forEach(element => {
      var img = this.project.user_profile_path + element.task_detail.avatar;
      element.task_detail.avatar = img;
      element.task_files.forEach(element => {
        var img = this.project.task_file_path + element.avatar;
        element.avatar = img;
      });
    });


    if (this.project.tasks.length == 0) {
      this.notask = true;
    }
    this.project.tasks.forEach((value, key) => {
      if (value.task_detail.task_progress == 100) {
        this.compeltedTask.push(value);
        this.taskcompleted = true;
      }
      else {
        this.openTasks.push(value)
        this.taskopen = true;
      }
    });
    if(this.navParams.get('task_id')){
      var id =  this.navParams.get('task_id');
      if(this.navParams.get('type')=='delete'){
        var index = this.project.tasks.map(x => {
          return x.task_detail.t_id;
        }).indexOf(id);
        this.project.tasks.splice(index, 1);
      }
     else if(this.navParams.get('type')=='complete'){
      this.project.tasks.forEach((value, key) => {
        if (value.task_detail.task_progress == 100) {
          this.compeltedTask.push(value);
          this.taskcompleted = true;
        }
        else {
          this.openTasks.push(value)
          this.taskopen = true;
        }
      });
     }
    }
   
  }

  httpOptions={headers:new HttpHeaders({
    "content-type":"application/json",
    'Authorization':localStorage.token
    })}

  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };



  startStopPlaying () {
    //your logic to play pause
    if(this.isPlaying) {


      //pause here
    } else {
      //play here
    }
    this.isPlaying = !this.isPlaying;
  }

  openTask(id,narration,due_date,project_task,task_date,emp_id,hrs,task_log_id,status,btn_status) {
//console.log(id,narration,due_date,project_task,task_date)

    this.navCtrl.push(TaskDetailsPage, {
    id:id,
    narration:narration,
    due_date:due_date,
    project_task:project_task,
    task_date:task_date,
    employee_id:emp_id,
    hrs:hrs,
    task_log_id:task_log_id,
    status:status,
    btn_status:btn_status
    });
  }
ionViewWillEnter(){
  
if(this.saveId=='on'){
  
  this.disabled=true
}
else if(this.pending.length==0){
  this.disabled=false;
}
else{
  return false;
}
}


ionViewDidEnter(){
  this.http.get(config.apiUrl+"projectManagement/project_task/completed",this.httpOptions).subscribe(res=>{
    this.completed=res;


    });
    this.http.get(config.apiUrl+"projectManagement/project_task/pending",this.httpOptions).subscribe(res=>{
      this.pending=res;
      this.pending.forEach(element => {
     if(element.btn_status=="on"){
this.saveId=element.btn_status;


     }
     else if(element.btn_status=="off"){
this.offId=element.btn_status;

     }
      });
   });
    this.http.get(config.apiUrl+"projectManagement/project_task",this.httpOptions).subscribe(res=>{
      this.all_task=res;
      this.hrs=res[0]['hrs'];
      this.all_task.forEach(element=>{
this.button=element.btn_status;
if(this.button=="off"){
this.disabled=true;
}
      })
      
    })
    



}
ionViewWilLeave(){

}
ionViewDidLeave(){


}
  createTask() {
    this.navCtrl.push(CreateTaskPage,{
      projectId:this.project.overviews.project_id
    })
  }

  setDefaultUserPic(img) {
    img.task_detail.avatar = "assets/imgs/user.jpg";
  }
}