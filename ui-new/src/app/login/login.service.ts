import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
  isLoggedIn: boolean = false;
  requestedLoginLoading: boolean = false;
  userInfo: Object = {};
  constructor(private http: Http) {
    this.getLoginDetails();
  }

  getLogin() {
      let headers = new Headers({withCredentials: true});
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://127.0.0.1:3000/api/login', options)
                  .map((res:Response) => res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   postLogin(username, password) {
      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', withCredentials: true });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://127.0.0.1:3000/api/login', 'username='+username+'&password='+password, options)
                  .map((res:Response) => res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

   getLoginDetails() {
     this.requestedLoginLoading = true;
     this.getLogin().subscribe(data => {
        this.setServiceVars(data);
     });
   }

   postLoginDetails(username, password) {
    this.requestedLoginLoading = true;
     this.postLogin(username, password).subscribe(data => {
          this.setServiceVars(data);
     });
   }

   setServiceVars(data) {
      if (data.status === 'success') {
        this.userInfo = data.data;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.userInfo = {};
      }
      this.requestedLoginLoading = false;
   }

    getLogout() {
      let headers = new Headers({withCredentials: true});
      let options = new RequestOptions({ headers: headers });
      return this.http.get('http://127.0.0.1:3000/api/logout', options)
                  .map((res:Response) => res.json())
                  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    setLogout() {
      this.requestedLoginLoading = true;
       this.getLogout().subscribe(data => {
            this.setServiceVars({status : 'logout'});
       });
     }
}
