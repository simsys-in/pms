import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigServiceTsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigServiceTsProvider {
configUrl='assets/config.json';
  constructor(public http: HttpClient) {
    console.log('Hello ConfigServiceTsProvider Provider');
  }
  getConfig(){
    return this.http.get(this.configUrl);
  }

}
