import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
    selectedSettings: string = this.route.snapshot.params['type'];
    constructor(private route: ActivatedRoute, private router: Router) {
      if (!this.selectedSettings) {
          this.router.navigate(['/app/user/settings/info']);
      }
    }
    
    ngOnInit(){
        this.route.params.subscribe((params) => {
            console.log('params changed');
            this.router.navigate(['/app/user/settings/' + params.type]);
            this.selectedSettings = params.type;
        });
    }
}
