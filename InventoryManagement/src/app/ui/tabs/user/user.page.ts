import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  user: any;

  constructor(private $userService: UserService) { }

  async ngOnInit() {
    // this.user = await this.$userService.getUser();
    console.log(this.user);
  }

}
