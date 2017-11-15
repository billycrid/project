import { Component, Input } from '@angular/core';

@Component({
  selector: 'settings-menu-component',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.css'],
})
export class SettingsMenuComponent {
    settings: Array<{
        label: string;
        title: string;
    }> = [{
        label: 'info',
        title: 'General'
    }, {
        label: 'session',
        title: 'Security & Login'
    }, {
        label: 'notifications',
        title: 'Notifications'
    }, {
        label: 'privacy',
        title: 'Privacy'
    }];
    constructor() {
    }
}
