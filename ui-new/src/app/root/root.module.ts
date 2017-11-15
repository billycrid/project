import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './root.component';

// navigation
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { LoginModule } from '../login/login.module';
import { SettingsModule } from '../settings/settings.module';
import { MessagesModule } from '../messages/messages.module';
import { AdminModule } from '../admin/admin.module';

const routes: Routes = [{
    path: '',
    component: LandingPageComponent
  }, {
    path: 'app/users',
    component: FooterComponent
  }];

@NgModule({
  declarations: [
    RootComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoginModule,
    SettingsModule,
    MessagesModule,
    AdminModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
