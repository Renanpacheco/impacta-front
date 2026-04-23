import { Component, inject } from '@angular/core';
import { ConsumoApi, Ipost } from '../../../services/consumo-api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem.html',
  styleUrls: ['./listagem.css'],
})
export class Listagem {
  postsLista : Ipost[]=[];
  readonly _consumoApi= inject(ConsumoApi);
  readonly router =inject(Router)
  final= false
  
  finalizar(){
    this.final= !this.final
  }

  criar(){
    this.router.navigate(['/criar']);
  }

  editar(item:Ipost){
    this.router.navigate(['/editar', item.id]);
  }

  excluir(item: Ipost) {
  const confirmar = confirm(`Deseja excluir a tarefa "${item.title}"?`);

  if (!confirmar) return;

  this._consumoApi.deleteTarefa(item.id).subscribe({
    next: () => {
      // remove da lista sem reload
      this.postsLista = this.postsLista.filter(t => t.id !== item.id);
      console.log('Tarefa excluída com sucesso');
    },
    error: (err) => {
      console.error('Erro ao excluir:', err);
    }
  });
}

  
  ngOnInit(){
    this._consumoApi.getTarefas().subscribe((response)=>{
      console.log('Response: ',response)
      this.postsLista=response;

    })
  }

  teste() {
    console.log('OK');
  }
}
