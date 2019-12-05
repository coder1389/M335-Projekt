import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private $alertController: AlertController) { }

  /**
   * Creates confirm message for iOS or Android.
   * @param request
   * @param callback
   */
  public async confirm(request: string, callback: () => void) {
    const alert = await this.$alertController.create({
      animated: true,
      message: request,

      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Bestätigen',
          handler: () => {
            callback();
          }
        }
      ]
    });

    return alert.present();
  }

  /**
   * Creates a normal user notification.
   * @param customMessage
   */
  public async alert(customMessage: string) {
    const alert = await this.$alertController.create({
      animated: true,
      message: customMessage,
      buttons: ['OK']
    });

    return alert.present();
  }
}
