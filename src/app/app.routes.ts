import { Routes } from '@angular/router';
import { Listagem } from './components/pages/listagem/listagem'
import { Formulario } from './components/pages/formulario/formulario'
import { Lista } from './components/pages/lista/lista';

export const routes: Routes = [
    {path: '', component: Lista},
    {path: 'criar', component: Formulario},
    {path: 'editar/:id', component: Formulario}

];
