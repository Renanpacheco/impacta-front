import { Component, inject } from '@angular/core';
import { ConsumoApi, Ipost } from '../../../services/consumo-api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css',
})
export class Listagem {
  postsLista : Ipost[]=[];
  readonly _consumoApi= inject(ConsumoApi);
  readonly router =inject(Router)

  criar(){
    this.router.navigate(['/criar']);
  }

  editar(item:Ipost){
    this.router.navigate(['/editar', item.id]);
  }

  
  ngOnInit(){
    this._consumoApi.getTarefas().subscribe((response)=>{
      console.log('Response: ',response)
      this.postsLista=response;

    })
  }
}
