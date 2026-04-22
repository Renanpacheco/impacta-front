import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  tarefaForm = new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
    
  })
  enviar(){
    const dados= this.tarefaForm.value

    const payload={
      ...dados,
      criacao: new Date()
    }
    console.log("form", payload)
  }
}
