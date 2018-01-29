import { HttpModule, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { constants } from '../common/constants';

@Injectable()
export class PostDetailsService {

  posts_Url = constants.restServiceUrl;
  constructor(private http: Http) { }

  postDetails(details) {
    return this.http.post(this.posts_Url, details)
        .map(response => response.json());
  }
}
