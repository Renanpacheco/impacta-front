import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../../Tarefa';



@Injectable({
  providedIn: 'root',
})
export class Acesso {

  private apiUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient){}

  getTarefas() : Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  deleteTarefa(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTarefaPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  atualizarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${tarefa.id}`, tarefa);
  }

}
