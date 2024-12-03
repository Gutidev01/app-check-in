import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)},
  { path: 'justificar-inasistencia', loadChildren: () => import('./justificar-inasistencia/justificar-inasistencia.module').then(m => m.JustificarInasistenciaPageModule), canActivate: [AuthGuard] },
  {
    path: 'mis-solicitudes',
    loadChildren: () => import('./mis-solicitudes/mis-solicitudes.module').then( m => m.MisSolicitudesPageModule), canActivate: [AuthGuard] },
  {
    path: 'mis-asignaturas',
    loadChildren: () => import('./mis-asignaturas/mis-asignaturas.module').then( m => m.MisAsignaturasPageModule)
  },
  {
    path: 'registrar-clase',
    loadChildren: () => import('./registrar-clase/registrar-clase.module').then( m => m.RegistrarClasePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
