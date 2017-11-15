import { Component, Input, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'session-info-component',
  templateUrl: './session-info.component.html',
  styleUrls: ['./session-info.component.css'],
})

export class SessionInfoComponent implements OnInit {
    sessions: Array<object>;
    constructor(private http: Http) {
    }

    ngOnInit() {
        this.setSessions();
    }

    getSessions() {
        let headers = new Headers({withCredentials: true});
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://127.0.0.1:3000/api/sessions', options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteSessions(sessionId) {
        let headers = new Headers({withCredentials: true});
        let options = new RequestOptions({ headers: headers });
        return this.http.delete('http://127.0.0.1:3000/api/sessions/'+sessionId, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    setSessions() {
        this.getSessions().subscribe(data => {
            console.log(data)
            this.sessions = data;
        });
    }

    setDeleteSession(sessionId) {
        this.deleteSessions(sessionId).subscribe(data => {
            console.log(data)
            this.sessions = data;
            this.ngOnInit();
        });
    }
}
