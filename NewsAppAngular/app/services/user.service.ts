import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUser } from '../models/IUser';

@Injectable()
export class UserService {

    constructor(private _http: Http) { }

    addUser(url: string, formData: any): Observable<string> {
        let body = formData;
        let header = new Headers();

        let options = new RequestOptions({
            headers: header
        });

        return this._http.post(url, body, options)
            .map((response: Response) => <string>response.json());
    }

    loginUser(url: string, userData: IUser): Observable<IUser> {
        let body = userData;
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.post(url, body, options)
            .map((response: Response) => <IUser>response.json());
    }

}