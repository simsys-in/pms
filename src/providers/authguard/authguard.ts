
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { Injectable } from '@angular/core';
import { AuthserviceProvider } from '../authservice/authservice';
import { Values } from '../../app/config/values';
import {  NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
@Injectable()
  // {
//   providedIn: 'root'
// })
export class AuthGuard implements CanActivate  {

  constructor(private routes:Router, private AuthService:AuthserviceProvider,private values:Values,
    public nav:NavController
    ){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const currentUser = localStorage.token;
      if(currentUser){
        
      this.values.user=localStorage.user;
        this.values.isLoggedIn=true;
      //if(localStorage.getItem('username')!= null){
        return true;
      }else{
        this.nav.push(LoginPage);
        return false;
      }
  }
}
