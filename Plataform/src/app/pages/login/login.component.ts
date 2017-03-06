import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AF} from "../../providers/af";
import {Router} from "@angular/router";
import { AngularFire } from 'angularfire2';
import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})

export class Login {
  constructor(private af: AngularFire, private router: Router) { }
  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        console.log(success);
        this.router.navigate(['/pages']);
      }).catch(
        (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      })
    }
  }

}