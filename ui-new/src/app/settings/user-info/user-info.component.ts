import { Component, Input } from '@angular/core';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'user-info-component',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
    constructor(private loginService:LoginService) {

    }
}
