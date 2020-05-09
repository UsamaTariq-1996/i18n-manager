import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GoogleObj {
  q: string;
  target: string;
  source : string;
  }

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  url = 'https://translation.googleapis.com/language/translate/v2?key=';
  key = 'AIzaSyBjA3Brvdtkx0Fx42WTqO2QWL_WoVIAuh0';


  constructor(private http : HttpClient) { }

  translate(obj : GoogleObj): Observable<any>
  {
    return this.http.post(this.url + this.key , obj);
  }

}
