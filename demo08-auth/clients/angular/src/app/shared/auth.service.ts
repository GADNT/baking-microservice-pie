import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptionsArgs, Response } from '@angular/http';
import 'rxjs/Rx';

// tag::adocSnippet[]
@Injectable()
export class AuthService {

  private _jwt: string;

  // tag::adocSkip[]
  protected basePath = 'http://localhost:8081/book-api/api/auth';

  constructor(private http: Http) {
  }

  get jwt(): string {

    if (this._jwt)
      return this._jwt;

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('jwt');
    this._jwt = retrievedObject;
    return this._jwt;
  }

  set jwt(val: string) {

    if (!val) {
      localStorage.removeItem('jwt');
      this._jwt = undefined;
      return;
    }

    // Put the object into storage
    localStorage.setItem('jwt', val);
    this._jwt = val;
  }

  get isLoggedIn(): boolean {
    return this.jwt != undefined;
  }

  // end::adocSkip[]
  login(login: string, password: string): Observable<any> {

    var headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var body = `username=${login}&password=${password}`;

    // tag::adocSkip[]
    let requestOptions: RequestOptionsArgs = {
      headers: headers
    };

    // end::adocSkip[]
    return this.http
      .post(this.basePath, body, requestOptions)
      .map((response: Response) => {
        if (response.status !== 200) {
          return undefined;
        }

        this.jwt = response.headers.get('authorization');

        // tag::adocSkip[]
        if (!this.jwt)
          return undefined;
        // end::adocSkip[]
        return this.jwt;
      // tag::adocSkip[]
      })
      .catch((error: any) => {
        console.log(`An error has occured : ${error}`);
        return undefined
      });
      // end::adocSkip[]
  }

  logout(): void {
    this.jwt = undefined;
  }
}
// end::adocSnippet[]
