import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'messages-full-page-component',
  templateUrl: './messages.full-page.component.html',
  styleUrls: ['./messages.full-page.component.css'],
})

export class MessagesFullPageComponent implements OnInit {
    @Output() messageContacts: Array<object>;
    @Output() contactsLoading: boolean = true;
    @Output() selectedUser: object;
    urlBasedUser: string = this.route.snapshot.params['username'];
    constructor(private messageService: MessagesService, private route:ActivatedRoute, private router: Router) {
    }

    ngOnInit(){
        this.getMessageContacts();
    }

    getMessageContacts() {
        this.messageService.getMessageContacts().subscribe(data => {
            this.messageContacts = data.data;
            this.contactsLoading = false;
            if (this.urlBasedUser) {
                let ifUser = data.data.find(user => user.username === this.urlBasedUser);
                if (ifUser) {
                    this.changeUser(ifUser);
                } else {
                    this.changeUser(data.data[0]);
                }
            } else {
                this.changeUser(data.data[0]);
            }
        });
    }

    changeUser(user) {
        this.selectedUser = user;
        this.router.navigate(['/app/messages/'+user.username]);
    }
}
