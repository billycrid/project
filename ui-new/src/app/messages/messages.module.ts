import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MessagesFullPageComponent } from './full-page/messages.full-page.component';
import { MessagesContactsComponent } from './message-contacts/messages-contacts.component';
import { MessagesContentsComponent } from './message-contents/messages-contents.component';

import { LoginService } from '../login/login.service';
import { MessagesService } from './messages.service';

const routes: Routes = [{
    path: 'app/messages',
    component: MessagesFullPageComponent
  }, {
    path: 'app/messages/:username',
    component: MessagesFullPageComponent
}];

@NgModule({
  declarations: [
    MessagesFullPageComponent,
    MessagesContactsComponent,
    MessagesContentsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LoginService, MessagesService],
  bootstrap: [MessagesFullPageComponent],
  exports: [
    MessagesFullPageComponent,
    MessagesContactsComponent,
    MessagesContentsComponent
  ]
})
export class MessagesModule { }
