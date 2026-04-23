import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Ipost {
    userId: number,
    id: number,
    title: string,
    body: string

}
@Injectable({
  providedIn: 'root',
})
export class ConsumoApi {

  private readonly _httpClient= inject(HttpClient);

  getTarefas() :Observable<Ipost[]>{
    return this._httpClient.get<Ipost[]>('https://jsonplaceholder.typicode.com/posts');
    
  }

  getTarefaById(id: string | number): Observable<Ipost> {
    return this._httpClient.get<Ipost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
  
  
}
