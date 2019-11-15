import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config } from "../app/config/config";


 @Injectable()
export class ApiService{ 

constructor(public http:HttpClient,

  ) {

    
}

setName(username){
 localStorage.setItem('key1',username)
}
getName(){
  return localStorage.getItem('key1');

}

setPassword(password){
  localStorage.setItem('key2',password)
}
getPassword(){
  return localStorage.getItem('key2');
}
setCpin(cpin){
  localStorage.setItem('key3',cpin)
}
getCpin(){
  return localStorage.key3;
}
setToken(value){
  localStorage.setItem("token",'Bearer '+value);

}

getToken(){
  return localStorage.getItem('token');
}

logout(){
  return localStorage.removeItem('token'),localStorage.removeItem('key1'),localStorage.removeItem('key2'),localStorage.removeItem('permissions');

}

setId(id){
  localStorage.setItem('key4',id);
}
getId(){
  return localStorage.key4;
}

setNarration(narration){
localStorage.setItem('na',narration)
}

getNarration(){
  return localStorage.na
}

setDueDate(date){
  localStorage.setItem('du',date)
}
getDueDate(){
  return localStorage.du
}
setProjectName(name){
  localStorage.setItem('pn',name )
}

getProjectName(){
  return localStorage.pn;
}

setTaskDate(date){
localStorage.setItem('ta' ,date);
}
getTaskDate(){
  return localStorage.ta;
}

setEmployeeId(id){
  localStorage.setItem('key5',id)
}
getEmployeeId(){
  return localStorage.getItem("key5")
}


setR(value){
  localStorage.setItem('key',value)
}
getR(){
  return localStorage.getItem('key');
}


setKey(val){
localStorage.setItem('ky',val)
}
getKey(){
  return localStorage.getItem('ky')
}

setDate(date){
  localStorage.setItem('date',date)
}
getDate(){
  return localStorage.getItem('date')
}


setStatus(status){
  localStorage.setItem('id2',status)
}
getStatus(){
  return localStorage.getItem('id2');
}

setResId(id){
localStorage.setItem('id2',id)
}
getResId(){
  return localStorage.getItem('id2');
}

setPin(pin){
  localStorage.setItem('j',pin)
}
getPin(){
  return localStorage.removeItem('key3');
}

setPermissions(permissions){
  localStorage.setItem('permissions',permissions)
}

getPermissions(){
  return localStorage.getItem('permissions');
}

setSaveId(id1){
  localStorage.setItem('saveId',id1)
}
getSaveID(){
  return localStorage.getItem('saveId');
}
removeId(){
   return  localStorage.removeItem('saveId')
}

}
