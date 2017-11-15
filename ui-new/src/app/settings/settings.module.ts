import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {SettingsComponent} from './settings.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {SessionInfoComponent} from './session-info/session-info.component';

import {SettingsMenuComponent} from './settings-menu/settings-menu.component';

import {LoginService} from '../login/login.service';

const routes: Routes = [{
    path: 'app/user/settings/:type',
    component: SettingsComponent
}, {
    path: 'app/user/settings',
    component: SettingsComponent
}];

@NgModule({
    declarations: [
        SettingsComponent,
        UserInfoComponent,
        SessionInfoComponent,
        SettingsMenuComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [LoginService],
    bootstrap: [SettingsComponent],
    exports: [
        SettingsComponent,
        UserInfoComponent,
        SessionInfoComponent,
        SettingsMenuComponent
    ]
})
export class SettingsModule {
}
