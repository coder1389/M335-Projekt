import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import {AlertService} from '../../core/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string = '';
  password: string = '';

  constructor(private $authService: AuthService, private $router: Router, private $alertService: AlertService) { }

  ngOnInit() {
  }

  /**
   * Loges the user in or displays an errormessage
   */
  async tryLogin() {
    try {
      this.$authService.login(this.mail, this.password).then(x => {
        this.$router.navigateByUrl('tabs');
      }).catch(e => {
        this.$alertService.alert("Sie konnten nicht angemeldet werden. Mail/Passwort ist falsch");
        this.password = '';
      });
    } catch {
      alert('Login fehlgeschlagen');
    }
  }
}
