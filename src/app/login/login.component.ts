import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserDetailModel } from '../login/user-detail.model';
import { LoginModel } from '../login/login.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import Swal from 'sweetalert2';

@Component({
    templateUrl: 'login.component.html',
    providers: [LoginService]
 })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    loginSaveData: LoginModel;
    loginUserData: UserDetailModel;
    returnUrl: string;

    constructor(
      private formBuilder: FormBuilder,
      private loginService: LoginService,
      private router: Router,
      private route: ActivatedRoute,
      private auth: AuthGuard,

    ) { }

    ngOnInit() {

      this.returnUrl = this.route.snapshot.queryParams['return'] || 'dashboard';

      if (sessionStorage.getItem('accessToken')) {
        this.router.navigateByUrl(this.returnUrl);
      }

        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onSubmit() {

        this.submitted = true;
        const loginData = this.loginForm.value;

        this.loginSaveData = new LoginModel(loginData.email, loginData.password);

        this.loginService.post(this.loginSaveData).subscribe(
            res => {
                
                this.loginUserData = new UserDetailModel(res.body['error'], res.body['errorMessage'], res.body['accessToken']);
                
                if (this.loginUserData['error']) {
                    if (this.loginUserData['error'] === 'true') {
                      Swal({
                        title: 'Error',
                        text: res.body['errorMessage'],
                        type: 'error',
                        confirmButtonText: 'Ok',
                      });
                    } else {
                        sessionStorage.setItem('accessToken', JSON.stringify(this.loginUserData['accessToken']));
                        sessionStorage.setItem('userName', JSON.stringify(res.body['adminDetails']['userName']));
                        sessionStorage.setItem('email', JSON.stringify(res.body['adminDetails']['email']));
                        sessionStorage.setItem('is_edit', res.body['adminDetails']['is_edit']);
                        
                        if (res.body['isSelectedCity'] === 'true') { 
                          this.router.navigateByUrl(this.returnUrl);
                        } else {
                          this.router.navigateByUrl('/available_city');
                        }
                    }
                }
            },
            err => {
                console.log(err);
            }
        );

    }

    ngOnDestroy(): void {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.add('theme-orange');
    }

}
