import { Component, ViewChild, Injectable } from "@angular/core";
import { Nav, Platform, NavController, App, ModalController, AlertController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";

import { LoginPage } from "../pages/login/login";
import {
  EmployeelistPage,
  EditEmployeePage
} from "../pages/employeelist/employeelist";
import { DepartmentsPage } from "../pages/departments/departments";
import { HolidaysPage } from "../pages/holidays/holidays";
import { LeaveRequestPage } from "../pages/leave-request/leave-request";
import { DesignationsPage } from "../pages/designations/designations";
import { ProfilePage } from "../pages/profile/profile";
import { PayslipPage } from "../pages/payslip/payslip";
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { AttendancePage } from "../pages/attendance/attendance";

import { AttendanceListPage } from "../pages/attendance-list/attendance-list";
import { AttendanceDetailsPage } from "../pages/attendance-details/attendance-details";
import { HTTP } from "@ionic-native/http";
import { ReferenceService } from "../providers/referenceService";
import { ApiService } from "../providers/apiServices";

import { EmployeesalaryPage } from "../pages/employeesalary/employeesalary";
import { AddSalaryPage } from "../pages/add-salary/add-salary";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { VoiceCallPage } from "../pages/voicecall/voicecall";
import { IncomingCallPage } from "../pages/incomingcall/incomingcall";
import { VideoCallPage } from "../pages/videocall/videocall";
import { ChatPage } from "../pages/chat/chat";
import { ChatListPage } from "../pages/chat-list/chat-list";
import { ProjectlistPage } from "../pages/projectlist/projectlist";
import { ProjectviewPage } from "../pages/projectview/projectview";

import { TaskDetailsPage } from "../pages/task-details/task-details";
import { TasksPage } from "../pages/tasks/tasks";
import { InvoicePage } from "../pages/invoice/invoice";
import { EstimatesListPage } from "../pages/estimateslist/estimateslist";
import { EstimatesPage } from "../pages/estimates/estimates";
import { InvoiceListPage } from "../pages/invoicelist/invoicelist";
import { OneSignal } from "@ionic-native/onesignal";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { TimeSheetListPage } from "../pages/timesheets/timesheetslist";
import { PaymentListPage } from "../pages/paymentlist/paymentlist";
import { ExpensesListPage } from "../pages/expenseslist/expenseslist";
import { Events } from 'ionic-angular';
import { ClientsPage } from "../pages/clients/clients";
import { SettingsPage } from "../pages/settings/settings";
import { ForgotpasswordPage } from "../pages/forgotpassword/forgotpassword";
import { CalendarViewPage } from "../pages/Calendar/calendar";
import { EmailPage } from "../pages/email/email";
import { CalendarPickerPage } from "../pages/CalendarPicker/CalendarPicker";
import { RegistrationPage } from "../pages/registration/registration";
import { AddDepartmentPage } from "../pages/add-department/add-department";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { EditprofilePage } from "../pages/editprofile/editprofile";
import { HttpClient } from "@angular/common/http";
import { elementAt } from "rxjs/operators";
import { Title } from "@angular/platform-browser";
import { leave } from "@angular/core/src/profile/wtf_impl";
import { BranchPage } from "../pages/branch/branch";
import { BankPage } from "../pages/bank/bank";
import { EmployeeCategoryPage } from "../pages/employee-category/employee-category";
import { StatusPage } from "../pages/status/status";
import { EmployeePage } from "../pages/employee/employee";
import { ContactPage } from "../pages/contact/contact";
import { AddContactpage } from "../pages/add-contact/add-contact";
import { UserPage } from "../pages/user/user";
import { UserGroupPage } from "../pages/user-group/user-group";
import { AddUserPage } from "../pages/add-user/add-user";
import { TestPage } from "../pages/test/test";


@Injectable()
@Component({
  selector:"page-app",
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  empMenu = false;
  pageMenu = false;
  ToolsMenu=false;
  page:any;
  rootPage: any;
  selectedPage: any;
  public role;
  public roleId;
  public url;
  public loading;
  public colorCode: any;
  public token: any;
  public resp: any;
  primaryColor: any;
  secondryColor: any;
  pages: Array<{title:string,component:any, menu: string; route: any }>;
  rootPage1: any;
  date: string;
  permissions: any=[];
  menu: any=[];
  per: any;
  per2: any=[];
  pages1:Array<{title:string,component:any,menu:string,route:any}>;
  routes: any;


  constructor(
   private alertCtrl:AlertController,
    
    public backgroundmode:BackgroundMode,
    public modalctrl:ModalController,
    public platform: Platform,
    public apiservice: ApiService,
    public statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private oneSignal: OneSignal,
    public localNotifications: LocalNotifications,
    
    public splashScreen: SplashScreen,
    private apiService: ApiService,
    private referenceService: ReferenceService,
    private http: HttpClient,
    public events: Events,
    public app:App,
    
  ) {

    this.initializeApp();
       // used for an example of ngFor and navigation
       this.pages = [

        { title: "Home", component: HomePage ,menu:"Home",route:HomePage},
        { title: "employeeList", component: EmployeelistPage   ,menu:"employeeList",route:EmployeelistPage},
        { title: "department", component: DepartmentsPage  ,menu:"department",route:DepartmentsPage},
        { title: "holidays", component: HolidaysPage  ,menu:"holidays",route:HolidaysPage},
        { title: "leave", component: LeaveRequestPage  ,menu:"leave",route:LeaveRequestPage},
        { title: "designations", component: DesignationsPage  ,menu:"designations",route:DesignationsPage},
        { title: "profile", component: ProfilePage  ,menu:"profile",route:ProfilePage},
        { title: "login", component: LoginPage  ,menu:"login",route:LoginPage},
        { title: "payslip", component: PayslipPage  ,menu:"payslip",route:PayslipPage},
        { title: "attendance", component: AttendancePage  ,menu:"attendance",route:AttendancePage},
        { title: "attendancelist", component: AttendanceListPage  ,menu:"attendancelist",route:AttendanceListPage},
        { title: "attendancedetail", component: AttendanceDetailsPage  ,menu:"attendancedetail",route:AttendanceDetailsPage},
        { title: "empSalary", component: EmployeesalaryPage  ,menu:"empSalary",route:EmployeesalaryPage},
       { title: "chatlist", component: ChatListPage  ,menu:"chatlist",route:ChatListPage},
        { title: "estimateslist", component: EstimatesListPage  ,menu:"estimateslist",route:EstimatesListPage},
        { title: "invoicelist", component: InvoiceListPage  ,menu:"invoicelist",route:InvoiceListPage},
        { title: "timesheet", component: TimeSheetListPage  ,menu:"timesheet",route:TimeSheetListPage},
        { title: "paymentlist", component: PaymentListPage  ,menu:"paymentlist",route:PaymentListPage},
        { title: "expenseslist", component: ExpensesListPage  ,menu:"expenseslist",route:ExpensesListPage},
        { title: "project", component: ProjectlistPage  ,menu:"project",route:ProjectlistPage},
        { title: "client", component: ClientsPage  ,menu:"client",route:ClientsPage},
        { title: "voicecall", component: VoiceCallPage  ,menu:"voicecall",route:VoiceCallPage},
        { title: "videocall", component: VideoCallPage  ,menu:"videocall",route:VideoCallPage},
        { title: "incomingcall", component: IncomingCallPage  ,menu:"incomingcall",route:IncomingCallPage},
        { title: "task", component: TasksPage  ,menu:"task",route:TasksPage},
        { title: "setting", component: SettingsPage  ,menu:"setting",route:SettingsPage},
        { title: "email", component: EmailPage  ,menu:"email",route:EmailPage},
        { title: "forgot", component: ForgotpasswordPage  ,menu:"forgot",route:ForgotpasswordPage},
        { title: "calendar", component: CalendarPickerPage  ,menu:"calendar",route:CalendarPickerPage},
        { title: "event", component: CalendarViewPage  ,menu:"event",route:CalendarViewPage},
        { title: "register", component: RegistrationPage  ,menu:"register",route:RegistrationPage},
        { title: "branch", component: BranchPage  ,menu:"branch",route:BranchPage},
        { title: "bank", component: BankPage  ,menu:"bank",route:BankPage},
        { title: "employeeCategory", component: EmployeeCategoryPage  ,menu:"employeeCategory",route:EmployeeCategoryPage},
        { title: "status", component: StatusPage  ,menu:"status",route:StatusPage},
        { title: "employee", component: EmployeePage  ,menu:"employee",route:EmployeePage},
        { title: "contact", component: ContactPage  ,menu:"contact",route:ContactPage},
        { title: "add-contact", component: AddContactpage  ,menu:"add-contact",route:AddContactpage},
        { title: "user", component: UserPage  ,menu:"user",route:UserPage},
        { title: "user-group", component: UserGroupPage  ,menu:"user-group",route:UserGroupPage},
        { title: "add-user", component: AddUserPage  ,menu:"add-user",route:AddUserPage},
         ];

      }




  initializeApp() {
    this.per=localStorage.getItem('permissions');
    this.pages1=JSON.parse(this.per);
console.table(this.pages1);
this.platform.ready().then(() => {
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  );
  
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS,
    this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
    this.androidPermissions.PERMISSION.CALL_PHONE,
  ]);
// Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      if (this.splashScreen) {
        this.splashScreen.hide();
     }
if(this.apiService.getToken()==null)  { return this.nav.setRoot(LoginPage)}else{return this.nav.setRoot(HomePage)}
      // user can user this.nav.setRoot(LoginPage);

    });
 
 }

  ionViewDidEnter(){

   }

logout(){
  
 this.apiservice.logout();
 this.nav.setRoot(LoginPage);
}

  getstyle() {
    this.primaryColor = localStorage.getItem("primary_color");
    this.secondryColor = localStorage.getItem("secondry_color");
    return {
      background:
        "linear-gradient(" + this.primaryColor + "," + this.secondryColor + ")"
    };
  };

  getProgresstyle() {
    return {
      background:
        "linear-gradient(to right," + this.secondryColor + "," + this.primaryColor + ")"
    };
  };



  getHeaderStyle() {
    return { background: this.primaryColor };
  };



  openPage(page) {
  this.selectedPage = "";
      this.pages.forEach(element => {
        if (element.title == page) {
          if (page != "Home") {
            
            this.nav.push(element.component);
          } else {
            this.nav.setRoot(element.component);
          }
        }
      });
  };

  openSub(page) {
    
   if (this.selectedPage == page) {
    this.selectedPage = "";
    } else {
      
      this.selectedPage = page;
    }
  }
}

