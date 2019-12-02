import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: any = {};

  constructor(private $userService: UserService, private $authService: AuthService) { }

  async ngOnInit() {
    this.user = await this.$userService.getUser();
  }
}
