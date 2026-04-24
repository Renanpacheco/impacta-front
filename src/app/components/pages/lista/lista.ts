import { Component, inject, OnInit } from '@angular/core';
import { Acesso } from '../../../services/acesso';
import { Tarefa } from '../../../../Tarefa';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista implements OnInit{
/*
  tarefas:Tarefa[]=[]
  
  constructor(private taskService:Acesso){}

  ngOnInit():void{
    this.taskService.getTarefas().subscribe((dado)=>{
      this.tarefas=dado;
      console.log(dado)
    });

  }*/
 readonly router =inject(Router)
 tarefas$!: Observable<Tarefa[]>;

  constructor(private acessoAPI: Acesso) {}

  ngOnInit(): void {
    //this.tarefas$ = this.acessoAPI.getTarefas();
    this.carregarTarefas();
    console.log(this.tarefas$)
  }

  carregarTarefas() {
    this.tarefas$ = this.acessoAPI.getTarefas().pipe(
      tap(dados => console.log('Dados carregados:', dados))
    );
  }

  criar(){
    this.router.navigate(['/criar']);
  }

  editar(item:Tarefa){
      this.router.navigate(['/editar', item.id]);
    }
  
  excluir(item: Tarefa) {
    const confirmar = confirm(`Deseja excluir a tarefa "${item.titulo}"?`);

    if (!confirmar) return;

    this.acessoAPI.deleteTarefa(item.id).subscribe({
      next: () => {
        console.log('Tarefa excluída com sucesso');
        this.carregarTarefas();
      },
      error: (err) => console.error('Erro ao excluir:', err)
    });
  }
}
