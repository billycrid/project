import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from "@angular/router";

import { AdminSideBarComponent } from './side-bar/admin-side-bar.component';
import { AdminFullPageComponent } from './full-page/admin-full-page.component';

import { LoginService } from '../login/login.service';

const routes: Routes = [{
    path: 'app/admin',
    component: AdminFullPageComponent
}];

@NgModule({
    declarations: [
        AdminSideBarComponent,
        AdminFullPageComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [LoginService],
    bootstrap: [AdminSideBarComponent, AdminFullPageComponent],
    exports: [
        AdminSideBarComponent,
        AdminFullPageComponent
    ]
})
export class AdminModule { }
