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

 readonly router =inject(Router)
 tarefas$!: Observable<Tarefa[]>;

  constructor(private acessoAPI: Acesso) {}

  ngOnInit(): void {
    
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

  

  finalizar(item: Tarefa) {
    this.acessoAPI.finalizarTarefa(item.id).subscribe({
      next: () => {
        alert('Tarefa concluída com sucesso!');
        this.carregarTarefas(); 
      },
      error: (err) => console.error('Erro ao finalizar tarefa', err)
    });
  }


}
