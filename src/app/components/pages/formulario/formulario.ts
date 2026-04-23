import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConsumoApi } from '../../../services/consumo-api';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  readonly route= inject(ActivatedRoute);
  readonly api=inject(ConsumoApi)

  tarefaForm = new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
    
  })
  preencherFormulario(tarefa: any) {
  this.tarefaForm.patchValue({
    titulo: tarefa.title,
    descricao: tarefa.body
  });
}

  carregarDados(id: string) {
  this.api.getTarefaById(id).subscribe((tarefa) => {
    this.preencherFormulario(tarefa);
  });
}

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');

  if (id) {
    this.carregarDados(id);
  }
}

  enviar(){
    const dados= this.tarefaForm.value

    const payload={
      ...dados,
      criacao: new Date()
    }
    console.log("form", payload)
  }
}
