import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsumoApi {

  private readonly _httpClient= inject(HttpClient);

  getTasks(){
    this._httpClient.get('https://jsonplaceholder.typicode.com/posts');
  }
  
}
