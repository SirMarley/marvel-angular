import { SharedService } from './../../services/shared.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: any = {
    username: "",
  }

  error: string = "";

  loginError:boolean = false;

  constructor(private router: Router, private service:SharedService) { }

  loginUser(usr:NgForm){
    if(this.user.username.indexOf(' ') > -1){
      this.loginError = true;
      this.error = "The username can't contain spaces";
    } else {
      this.loginError = false;
      this.service.userName = this.user.username;
      if(!localStorage[this.service.userName]){
        localStorage[this.service.userName] = '{"favorites":[],"deleted":[],"modified":[]}';
      }
      this.service.superHeroes = [];
      this.service.superHeroesBackup = [];
      this.router.navigate(['/home']);
    }

  }

}
