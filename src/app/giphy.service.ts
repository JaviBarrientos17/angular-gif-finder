import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/config/enviroment';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  searchGifs(query: string): Observable<any> {
    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${this.apiKey}`;
    console.log(query);
    return this.http.get(url);
  }
}
