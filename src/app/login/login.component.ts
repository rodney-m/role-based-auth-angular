import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data :any;
  constructor(private userService : UserService, private userAuthService : UserAuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login(loginForm  : NgForm){
    const form = new FormData();
    form.append('username', loginForm.value.username);
    form.append('password', loginForm.value.password);
    form.append('grant_type', 'password');
    form.append('client_id', 'client_id');
    form.append('client_secret', 'client_secret');
    form.append('scope', 'read+write');
    
    console.log(form)
    this.userService.login(form).subscribe(
      (response :any) => {
        this.userAuthService.setRoles(response.user.roles);
        this.userAuthService.setToken(response.access_token);

        const role = response.user.roles[0];
        if (role.name === 'ADMIN') {
          this.router.navigate(['/admin'])
        } else{
          this.router.navigate(['/user'])
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
