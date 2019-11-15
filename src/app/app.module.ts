import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule, ModalController, AlertController, ToastController } from "ionic-angular";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Toast } from '@ionic-native/toast/ngx';
import { MyApp } from "./app.component";
import { HomePage, HomePopoverPage } from "../pages/home/home";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { LoginPage } from "../pages/login/login";
import { Angular2FontawesomeModule } from "angular2-fontawesome/angular2-fontawesome";
import { ForgotpasswordPage } from "../pages/forgotpassword/forgotpassword";
import { ApiService } from "../providers/apiServices";
import { ReferenceService } from "../providers/referenceService";
import { EmployeelistPage, PopoverPage, FilterModalPage, EditEmployeePage } from "../pages/employeelist/employeelist";

import { DepartmentsPage } from "../pages/departments/departments";
import { AddDepartmentPage } from "../pages/add-department/add-department";
import { HolidaysPage, EditHolidayPage } from "../pages/holidays/holidays";
import { AddHolidayPage } from "../pages/add-holiday/add-holiday";
import { LeaveRequestPage, LeaveRequestMoadlPage, LeaveFilterPage } from "../pages/leave-request/leave-request";
import { AddLeaveRequestPage } from "../pages/add-leave-request/add-leave-request";
import { DesignationsPage } from "../pages/designations/designations";
import { AddDesignationsPage } from "../pages/add-designations/add-designations";
import { ProfilePage } from "../pages/profile/profile";
import { EditprofilePage } from "../pages/editprofile/editprofile";
import { PayslipPage } from "../pages/payslip/payslip";
import { SettingsPage } from "../pages/settings/settings";
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { NotificationPage } from "../pages/notification/notification";
import { AttendancePage } from "../pages/attendance/attendance";
import { AttendanceListPage } from "../pages/attendance-list/attendance-list";
import { AttendanceDetailsPage, AttendanceDetailsFilterPage } from "../pages/attendance-details/attendance-details";
import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { File } from "@ionic-native/file";

import { ActionSheet } from "../../node_modules/@ionic-native/action-sheet";
import { PipesModule } from "../pipes/pipes.module";
import { ClientsPage, EditClientPage, ClientPopoverPage, ClientFilterPage } from "../pages/clients/clients";
import { AddSalaryPage } from "../pages/add-salary/add-salary";
import { EmployeesalaryPage, EditSalaryPage, SalaryFilterPage } from "../pages/employeesalary/employeesalary";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { VoiceCallPage } from "../pages/voicecall/voicecall";
import { IncomingCallPage } from "../pages/incomingcall/incomingcall";
import { VideoCallPage } from "../pages/videocall/videocall";
import { ChatPage } from "../pages/chat/chat";
import { ChatListPage } from "../pages/chat-list/chat-list";
import { ProjectlistPage, ProjectEditPage, ProjectFilterPage } from "../pages/projectlist/projectlist";
import { ProjectviewPage, CalendarModalPage } from "../pages/projectview/projectview";

import { OneSignal } from "@ionic-native/onesignal";
import { TaskDetailsPage, TaskEditPage, TaskPopoverPage } from "../pages/task-details/task-details";
import { TasksPage } from "../pages/tasks/tasks";
import { InvoicePage } from "../pages/invoice/invoice";
import { InvoiceListPage, EditInvoicePage, InvoiceFilterPage } from "../pages/invoicelist/invoicelist";
import { EstimatesPage } from "../pages/estimates/estimates";
import { EstimatesListPage, EstimatesFilterPage, EstimatesEditPage } from "../pages/estimateslist/estimateslist";
import { AddclientPage } from "../pages/addclient/addclient";
import { SelectProjectPage } from "../pages/selectproject/selectproject";
import { ClientProfilePage } from "../pages/clientprofile/clientprofile";
import { FilterPipe, SortByPipe, OrderByPipe, ListPipe, } from "./filter.pipe";
import { TimeSheetListPage, TimeSheetModalPage, TimeSheetEditPage, TimeSheetFilterPage } from "../pages/timesheets/timesheetslist";
import { AddTimesheetsPage } from "../pages/add-timesheet/add-timesheet";
import { NativePageTransitions, NativeTransitionOptions } from "@ionic-native/native-page-transitions";
import { NativeAudio } from "@ionic-native/native-audio";
import { Media, MediaObject } from "@ionic-native/media";
import { CreateProjectPage } from "../pages/create-project/createproject";
import { CreateTaskPage } from "../pages/create-task/createtask";
import { CreateInvoicePage } from "../pages/create-invoice/createinvoice";
import { CreateEstimatePage } from "../pages/create-estimate/createestimate";
import { PaymentListPage, PaymentDetailsPage } from "../pages/paymentlist/paymentlist";
import { ExpensesListPage, ExpensesEditPage, ExpenseDetailsPage } from "../pages/expenseslist/expenseslist";
import { CreateExpensesPage } from "../pages/create-expenses/createexpenses";
import { FilePath } from "@ionic-native/file-path";
import { Base64 } from "@ionic-native/base64";
import { CalendarModule } from "ionic3-calendar-en";
import { DataService } from "../providers/JsonService";
import { CalendarViewPage } from "../pages/Calendar/calendar";
import { Calendar } from "@ionic-native/calendar";
import { LeaveTypesPage, AddLeaveTypePage, EditLeaveType } from "../pages/leave-types/leave-types";
import { CompanySettingsPage } from "../pages/companysettings/companysetting";
import { LocalizationPage } from "../pages/localization/localization";
import { EmailSettingsPage } from "../pages/emailsettings/emailsettings";
import { SalarySettingsPage } from "../pages/salarysettings/salarysettings";
import { NotificationSettingsPage } from "../pages/notificationsettings/notificationsettings";
import { InvoiceSettingsPage } from "../pages/invoicesetings/invoicesetings";
import { EmailPage, CreateMailPage, MailListPage, MailViewPage } from "../pages/email/email";
import { CalendarPickerPage } from "../pages/CalendarPicker/CalendarPicker";
import { RegistrationPage } from "../pages/registration/registration";

import { HTTP } from "@ionic-native/http";
import { HttpClientModule } from "@angular/common/http";


import { Values } from "./config/values";
import { ConfigServiceTsProvider } from '../providers/config-service-ts/config-service-ts';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { MusicControls } from "@ionic-native/music-controls/ngx";
import { BranchPage } from "../pages/branch/branch";
import { AddBranchPage } from "../pages/add-branch/add-branch";


import { AddbankPage } from "../pages/add-bank/add-bank";

import { BankPage } from "../pages/bank/bank";
import { EmployeeCategoryPage } from "../pages/employee-category/employee-category";
import { AddEmployeeCategoryPage } from "../pages/add-employee-category/add-employee-category";
import { StatusPage } from "../pages/status/status";

import { AddEmployeePage } from "../pages/add-employee/add-employee";
import { AddStatusPage } from "../pages/add-status/add-status";

import {RlTagInputModule} from 'angular2-tag-input';
import { AutoCompleteModule } from "ionic2-auto-complete";
import { EmployeePage } from "../pages/employee/employee";
import { CallNumber } from "@ionic-native/call-number";
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { ContactPage } from "../pages/contact/contact";
import { AddContactpage } from "../pages/add-contact/add-contact";
import { UserPage } from "../pages/user/user";
import { UserGroupPage } from "../pages/user-group/user-group";
import { AddUserPage } from "../pages/add-user/add-user";
import { AddUserGroupPage } from "../pages/add-user-group/add-user-group";



@NgModule({
  
  declarations: [
    
    AddUserGroupPage,
    AddUserPage,
    UserPage,
    UserGroupPage,
    ContactPage,
    StatusPage,
    AddContactpage,
   MyApp,
   EmployeePage,
    HomePage,
    ListPipe,
    HomePopoverPage,
    LoginPage,
    AddEmployeePage,
    PopoverPage,
    AddDepartmentPage,
    DepartmentsPage,
    FilterModalPage,
    EditSalaryPage,
    HolidaysPage,
    AddHolidayPage,
    EmployeelistPage,
    LeaveRequestMoadlPage,
    AddBranchPage,

    AddbankPage,
    AddLeaveRequestPage,
    LeaveRequestPage,
    DesignationsPage,
    ClientsPage,
    AddDesignationsPage,
    ForgotpasswordPage,
    LeaveFilterPage,
    SalaryFilterPage,
    PayslipPage,
    ProfilePage,
    EditEmployeePage,
    EditprofilePage,
    SettingsPage,
    ChangepasswordPage,
    HomePopoverPage,
    NotificationPage,
    AttendancePage,
    AttendanceListPage,
    AttendanceDetailsPage,
    EditHolidayPage,
    AddSalaryPage,
    EmployeesalaryPage,
    VoiceCallPage,
    VideoCallPage,
    ChatListPage,
    ChatPage,
    IncomingCallPage,
  
    ProjectviewPage,
    ProjectlistPage,
    TaskDetailsPage,
    AttendanceDetailsFilterPage,
    InvoicePage,
    InvoiceListPage,
    EstimatesPage,
    AddclientPage,
    EstimatesListPage,
    TasksPage,
    ClientProfilePage,
    SelectProjectPage,
    FilterPipe,
    OrderByPipe,
    SortByPipe,
    TimeSheetListPage,
    TimeSheetModalPage,
    TimeSheetEditPage,
    TimeSheetFilterPage,
    AddTimesheetsPage,
    CreateProjectPage,
    ProjectEditPage,
    CreateTaskPage,
    TaskEditPage,
    TaskPopoverPage,
    EditClientPage,
    ClientPopoverPage,
    CreateInvoicePage,
    CreateEstimatePage,
    CalendarModalPage,
    ClientFilterPage,
    ProjectFilterPage,
    PaymentListPage,
    PaymentDetailsPage,
    ExpensesListPage,
    CreateExpensesPage,
    ExpensesEditPage,
    EditInvoicePage,
    InvoiceFilterPage,
    EstimatesFilterPage,
    ExpenseDetailsPage,
    EstimatesEditPage,
   CalendarViewPage,
    LeaveTypesPage,
    AddLeaveTypePage,
    EditLeaveType,
    CompanySettingsPage,
    LocalizationPage,
    EmailSettingsPage,
    SalarySettingsPage,
    NotificationSettingsPage,
    InvoiceSettingsPage,
    EmailPage,
    CreateMailPage,
    MailListPage,    
    MailViewPage,
    CalendarPickerPage,
    RegistrationPage,
    BranchPage,
    BankPage,
    EmployeeCategoryPage,
    AddEmployeeCategoryPage,
    AddStatusPage
     ],
  imports: [
    
    AutoCompleteModule,  
BrowserModule,
    PipesModule,
    CalendarModule,
    RlTagInputModule,
       IonicModule.forRoot(MyApp, {
      autoFocusAssist: true
  }),
  IonicStorageModule.forRoot(),
 HttpClientModule,
 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    
    AddUserPage,
    UserGroupPage,
    AddUserGroupPage,
    UserPage,
    AddContactpage,
    StatusPage,
    MyApp,
    HomePage,
   ContactPage,
    HomePopoverPage,
    PopoverPage,
    EmployeePage,
    DepartmentsPage,
    HolidaysPage,
    ClientsPage,
    AddHolidayPage,
    AddDepartmentPage,
    AddLeaveRequestPage,
    AddBranchPage,
    AddbankPage,
    FilterModalPage,
    EmployeelistPage,
    PayslipPage,
    LeaveFilterPage,
    LoginPage,
    LeaveRequestMoadlPage,
    LeaveRequestPage,
    DesignationsPage,
    SalaryFilterPage,
    AddDesignationsPage,
    ForgotpasswordPage,
    EditSalaryPage,
    ProfilePage,
    EditEmployeePage,
    EditprofilePage,
    SettingsPage,
    ChangepasswordPage,
    HomePopoverPage,
    NotificationPage,
    AttendancePage,
    AttendanceListPage,
    AttendanceDetailsPage,
    EditHolidayPage,
    AddSalaryPage,
    EmployeesalaryPage,
    IncomingCallPage,
    VoiceCallPage,
    VideoCallPage,
    ChatListPage,
    ProjectviewPage,
    ChatPage,
    
    ProjectlistPage,
    AttendanceDetailsFilterPage,
    TaskDetailsPage,
    InvoicePage,
    InvoiceListPage,
    EstimatesPage,
    EstimatesListPage,
    AddclientPage,
    TasksPage,
    ClientProfilePage,
    SelectProjectPage,
    TimeSheetListPage,
    TimeSheetModalPage,
    AddTimesheetsPage,
    CreateProjectPage,
    TimeSheetFilterPage,
    TimeSheetEditPage,
    ProjectEditPage,
    CreateTaskPage,
    TaskEditPage,
    TaskPopoverPage,
    EditClientPage,
    ClientPopoverPage,
    CreateInvoicePage,
    CreateEstimatePage,
    CalendarModalPage,
    ClientFilterPage,
    ProjectFilterPage,
    PaymentListPage,
    PaymentDetailsPage,
    ExpensesListPage,
    CreateExpensesPage,
    ExpensesEditPage,
    EditInvoicePage,
    InvoiceFilterPage,
    EstimatesFilterPage,
    ExpenseDetailsPage,
    EstimatesEditPage,
    CalendarViewPage,
    LeaveTypesPage,
    AddLeaveTypePage,
    EditLeaveType,
    CompanySettingsPage,
    LocalizationPage,
    EmailSettingsPage,
    SalarySettingsPage,
    NotificationSettingsPage,
    InvoiceSettingsPage,
    EmailPage,
    CreateMailPage,
    MailListPage,
    MailViewPage,
    CalendarPickerPage,
    RegistrationPage,
    BranchPage,
    BankPage,
    EmployeeCategoryPage,
    AddEmployeeCategoryPage,
  AddStatusPage,
    AddEmployeePage,
  ],
  providers: [
    Clipboard,
    
    AndroidFingerprintAuth,
    AndroidPermissions,
    CallNumber,
    BackgroundMode,
    IonicErrorHandler,
    ModalController,
    AlertController,
    StatusBar,
    Angular2FontawesomeModule,
    Calendar,
    
    ApiService,
    
    OneSignal,
    DataService,
    ReferenceService,
    File,
    LocalNotifications,
    FileTransfer,
    AndroidPermissions,
    ActionSheet,
    Camera,
    SplashScreen,
    FilePath,
    NativePageTransitions,
    NativeAudio,
    Base64,
    Media,
    MusicControls,
    HTTP,
    Values,
    ApiService,
    ToastController,
    Toast,

  { provide: ErrorHandler, useClass: IonicErrorHandler ,},
    ConfigServiceTsProvider,

      
    
  ],
  
})
export class AppModule { }
