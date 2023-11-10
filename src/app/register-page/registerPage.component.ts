import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from "../service/authorization.service.";
import {UserInfoService} from "../service/userInfo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Alert} from "../service/alert.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './registerPage.component.html',
  styleUrls: ['./registerPage.component.css'],
})

export class RegisterPageComponent implements OnInit {
  user: any = {};
  public userForm!: FormGroup;
  public submitted = false;
  maxDate: Date;
  hide: boolean = true;
  constructor(
    private authorization: AuthorizationService,
    private userInfo: UserInfoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alert: Alert,
  ) {
    const today = new Date();
    this.maxDate = new Date(today);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      FIO: ["", [Validators.required]],
      birth: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.user.mail = this.userForm.value.email;
      this.user.password = this.userForm.value.password;
      const date = new Date(this.userForm.value.birth);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.user.birth = `${year}-${month}-${day}`;
      this.user.FIO = this.userForm.value.FIO;
      this.authorization.createAccount(this.user).subscribe(
        (res) => {
          console.log('Аккаунт успешно создан', res);
          this.userInfo.token = res.token;
          this.userInfo.user = res.user;
          this.router.navigate(['/user'])
        },
        (error) => {
          this.alert.error(error.error.message);
        }
      )
    }
  }
}
