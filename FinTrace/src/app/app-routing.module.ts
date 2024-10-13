import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './homePage/homePage.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/guard/authguard.guard';
import { GerenciamentoTransacoesComponent } from './gerenciamentoTransacoes/gerenciamentoTransacoes.component';


const routes: Routes = [
  {path:'',component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'transacao', loadChildren:()=> import('./gerenciamentoTransacoes/gerenciamentoTransacoes.module').then(m=> m.GerenciamentoTransacoesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
