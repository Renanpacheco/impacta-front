import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from '../../../services/acesso';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  readonly router =inject(Router)
  readonly route= inject(ActivatedRoute);
  readonly api=inject(Acesso)

  idTarefaExistente: string | null = null;

  tarefaForm = new FormGroup({
    titulo: new FormControl('',[Validators.required]),
    descricao: new FormControl('',[Validators.required]),
    
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.idTarefaExistente = id; 
      this.carregarDados(Number(id));
    }
  }

  preencherFormulario(tarefa: any) {
    this.tarefaForm.patchValue({
      titulo: tarefa.title,
      descricao: tarefa.body
    });
  }

  carregarDados(id: number) {
    this.api.getTarefaPorId(id).subscribe({
      next: (tarefa) => {
        this.tarefaForm.patchValue({
          titulo: tarefa.titulo,
          descricao: tarefa.descricao
        });
      },
      error: (err) => console.error('Erro ao carregar tarefa', err)
    });
  }

  

  voltar(){
    this.router.navigate(['']);
  }

  enviar() {
    if (this.tarefaForm.invalid) return;

    const dados = this.tarefaForm.value;
  
    const payload: any = {
      titulo: dados.titulo,
      descricao: dados.descricao,
      status:"Pendente",
      ultimaAtualizacao: new Date().toISOString() 
    };

    if (this.idTarefaExistente) {
    
      payload.id = this.idTarefaExistente; 

      this.api.atualizarTarefa(payload).subscribe({
        next: () => {
          alert('Tarefa atualizada com sucesso!');
          this.voltar();
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {

      this.api.criarTarefa(payload).subscribe({
        next: () => {
          alert('Tarefa criada!');
          this.voltar();
        }
      });
    }
  }
}
