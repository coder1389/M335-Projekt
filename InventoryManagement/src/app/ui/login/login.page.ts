import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string = '';
  password: string = '';

  constructor(private $authService: AuthService, private $router: Router) { }

  ngOnInit() {
  }

  tryLogin() {
    try {
      this.$authService.login(this.mail, this.password);
      this.$router.navigateByUrl('tabs');
    } catch {
      alert('Login fehlgeschlagen');
    }
  }
}
