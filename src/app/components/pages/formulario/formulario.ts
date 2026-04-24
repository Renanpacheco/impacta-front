import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Acesso } from '../../../services/acesso';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../../../Tarefa';

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
  tarefaOriginal?: Tarefa;

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

    if (this.idTarefaExistente) {
      
      const payload: Tarefa = {
        ...this.tarefaOriginal!,
        titulo: dados.titulo as string, 
        descricao: dados.descricao as string,
        id: Number(this.idTarefaExistente)
      };

      this.api.atualizarTarefa(payload).subscribe({
        next: () => {
          alert('Tarefa atualizada!');
          this.voltar();
        },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      
      const payload: any = {
        titulo: dados.titulo,
        descricao: dados.descricao,
        status: "Pendente",
        criacao: new Date().toLocaleDateString('pt-BR')
      };

      this.api.criarTarefa(payload).subscribe({
        next: () => {
          alert('Tarefa criada!');
          this.voltar();
        }
      });
    }
  }
}
