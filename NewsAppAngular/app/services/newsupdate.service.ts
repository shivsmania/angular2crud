import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IUser } from '../models/IUser';
import { NewsUpdate } from '../models/NewsUpdate';

@Injectable()
export class NewsUpdateService {

    constructor(private _http: Http) { }

    addNews(url: string, formData: any): Observable<string> {
        let body = formData;
        let header = new Headers();

        let options = new RequestOptions({
            headers: header
        });

        return this._http.post(url, body, options)
            .map((response: Response) => <string>response.json());
    }

    editNews(url: string, formData: any): Observable<string> {
        let body = JSON.stringify(formData);
        let headers = new Headers({
            "Content-Type":"application/json"
        });
        let options = new RequestOptions({
            headers: headers
        })

        return this._http.put(url, body, options)
            .map((response: Response) => <string>response.json());
    }

    deleteNews(url: string): Observable<string> {
        return this._http.delete(url)
            .map((response: Response) => <string>response.json());
    }

    getFeaturedNews(url: string): Observable<NewsUpdate[]> {
        return this._http.get(url)
            .map((response: Response) => response.json());
    }

    getAllNews(url: string): Observable<NewsUpdate[]> {
        return this._http.get(url)
            .map((response: Response) => response.json());
    }

    getUserNews(url: string): Observable<NewsUpdate[]> {
        return this._http.get(url)
            .map((response: Response) => response.json());
    }

}