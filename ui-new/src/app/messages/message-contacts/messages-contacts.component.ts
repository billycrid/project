import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'messages-contacts-component',
  templateUrl: './messages-contacts.component.html',
  styleUrls: ['./messages-contacts.component.css'],
})

export class MessagesContactsComponent implements OnInit {
    @Input() contactsLoading: boolean;
    @Input() messageContacts: string;
    constructor(private http: Http, private route: Router) {
    }

    ngOnInit(){
    }

    changeUser(user){ 
      console.log('change');
      this.route.navigate(['/app/messages/'+user]);
    }
}
