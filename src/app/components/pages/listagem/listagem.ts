import { Component, inject } from '@angular/core';
import { ConsumoApi, Ipost } from '../../../services/consumo-api';
import { CommonModule } from '@angular/common';

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
  
  ngOnInit(){
    this._consumoApi.getTarefas().subscribe((response)=>{
      console.log('Response: ',response)
      this.postsLista=response;

    })
  }
}
