import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared/localstorage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  get Credentials() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.UserCredential));
  }

  set Credentials(value: any) {
    console.log(value);
    if (value != null) {
      localStorage.setItem(LocalStorageKeys.UserCredential, JSON.stringify(value));
    }
  }
}
