import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    @Input() type: string;
    isLoggedIn: boolean;
    userInfo: object;
    loginUsername: string = '';
    loginPassword: string = '';

    constructor(private loginService: LoginService, private router: Router) {
        this.isLoggedIn = this.loginService.isLoggedIn;
        this.userInfo = this.loginService.userInfo;
        this.type = this.type || 'page';
    }

    ngOnInit() {
    }

    getLoginDetails() {
        this.loginService.getLoginDetails();
    }

    postLogin() {
        this.loginService.postLoginDetails(this.loginUsername, this.loginPassword);
        this.router.navigate(['/']);
        console.log('move to home');
    }

    logout() {
        console.log('logout');
        this.router.navigate(['/']);
        this.loginService.setLogout();
    }

    goSettings() {
        this.router.navigate(['/app/user/settings']);
    }
}
