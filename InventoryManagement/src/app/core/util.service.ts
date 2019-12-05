import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared/localstorage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  /**
   * Get credentials from the logalstorage.
   * @constructor
   */
  get Credentials() {
    return JSON.parse(localStorage.getItem(LocalStorageKeys.UserCredential));
  }

  /**
   * Set credential to the localstorage.
   * @param value
   * @constructor
   */
  set Credentials(value: any) {
    console.log(value);
    if (value != null) {
      localStorage.setItem(LocalStorageKeys.UserCredential, JSON.stringify(value));
    }
  }
}
