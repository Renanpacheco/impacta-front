import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Listagem } from "./components/listagem/listagem";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Listagem],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tarefas');
}
