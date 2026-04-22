import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Listagem } from "./components/listagem/listagem";
import { Formulario } from "./components/formulario/formulario";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Listagem, Formulario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tarefas');
}
