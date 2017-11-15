import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessagesService } from '../messages.service';

import { LoginService } from '../../login/login.service';

@Component({
  selector: 'messages-contents-component',
  templateUrl: './messages-contents.component.html',
  styleUrls: ['./messages-contents.component.css'],
})

export class MessagesContentsComponent implements OnInit {
    chatLoading: boolean = true;
    messages: any;
    inputMessage: string = '';
    urlBasedUser: string = this.route.snapshot.params['username'];
    loggedInUserInfo = this.loginService.userInfo;
    constructor(
        private messageService: MessagesService, 
        private loginService: LoginService, 
        private route:ActivatedRoute, 
        private router:Router
    ) {
        console.log(this.loggedInUserInfo);
    }

    ngOnInit(){
        this.chatLoading = true;
        this.route.params.subscribe((params) => {
            this.urlBasedUser = params.username;
            this.getMessages(this.urlBasedUser);
        });
    }

    ngAfterViewInit(){
        // this.chatLoading = false;
    }

    scrollToBottom(){
        var chatArea = document.getElementById('chat_area_content');
        setTimeout(() => {  
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 100);
    }

    getMessages(user) {
        this.messageService
            .getMessageInfo(user)
            .subscribe(data => {
                this.messages = data.data;
                this.messages.sort(function(a,b) { 
                    return new Date(a.senttime).getTime() - new Date(b.senttime).getTime() 
                });
        }, () => {
            console.log('error')
        },() => {
            this.chatLoading = false;
            this.scrollToBottom();
        });
    }

    enterSave(event) {
        if(event.key === 'Enter' && !event.shiftKey) {
            this.saveMessage();
        }
    }

    saveMessage() {
        if (this.inputMessage) {
            this.messageService.saveMessage(this.urlBasedUser, this.inputMessage).subscribe(data => {
            }, () => {
                console.log('error')
            },() => {
                this.ngOnInit();
                this.inputMessage = '';
                this.scrollToBottom();
            });
        }
    }

}
