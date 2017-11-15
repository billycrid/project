import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login.component';
import {LoginService} from './login.service';


const routes: Routes = [{
    path: 'app/login',
    component: LoginComponent
}, {
    path: 'app/logout',
    component: LoginComponent
}];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [LoginService],
    bootstrap: [LoginComponent],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {
}
