import { Injectable } from "@angular/core";
import { LocalStorageKeys } from "../shared/localstorage-keys.enum";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor() {}

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
      localStorage.setItem(
        LocalStorageKeys.UserCredential,
        JSON.stringify(value)
      );
    }
  }

  /**
   * Converts the image base64 string to a blob
   * @param base64
   */
  convertBase64ToBlob(base64: string): Blob {
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpg" });
    return blob;
  }
}
