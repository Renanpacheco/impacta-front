import { Routes } from '@angular/router';
import { Listagem } from './components/pages/listagem/listagem'
import { Formulario } from './components/pages/formulario/formulario'

export const routes: Routes = [
    {path: '', component: Listagem},
    {path: 'criar', component: Formulario},
    {path: 'editar/:id', component: Formulario}

];
