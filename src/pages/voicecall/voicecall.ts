import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginPage } from '../login/login';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-voicecall',
  templateUrl: 'voicecall.html',
})
export class VoiceCallPage {
 public mute= false;
  public colorCode:any;
  public primaryColor: any;
  
  //disabled:boolean=true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  public callNumber:CallNumber, 
   
   private androidPermissions: AndroidPermissions
    ) {
    this.colorCode = {
      'background-color': localStorage.getItem('colorCode'),
    }

    this.primaryColor = localStorage.getItem('primary_color');
 
  
  }

  ionViewDidLoad() {
  }
  getHeaderStyle() {
    return { 'background': this.primaryColor }
  };

  userMute(){
    this.mute=!this.mute;
  }

  
  endCall(){
    this.navCtrl.setRoot(HomePage);
  }

  startCall(){
  //  this.callNumber.callNumber('9944703410', true);
      this.callNumber.callNumber("9944703410", true)
     .then(res => console.log('Launched dialer!',res))
    .catch(err => console.log('Error launching dialer', err));
  }

  callNumber1(){
    setTimeout(() => {
         let tel = '9944703410';
         window.open(`tel:${tel}`, '_system');
       },100);
   }
}
