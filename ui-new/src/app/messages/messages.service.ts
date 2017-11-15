import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class MessagesService {
  constructor(private http: Http) {
  }

  getMessageContacts() {
      let headers = new Headers({withCredentials: true});
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://127.0.0.1:3000/api/messages', options)
                  .map((res:Response) => res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   getMessageInfo(user) {
        let headers = new Headers({withCredentials: true});
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://127.0.0.1:3000/api/messages/'+user, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  
    saveMessage(username, message) {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', withCredentials: true });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://127.0.0.1:3000/api/messages/'+username, 'message='+message, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }  
}
