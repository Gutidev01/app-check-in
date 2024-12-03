import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa el guard
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)},
  { path: 'ver-justificaciones', loadChildren: () => import('./ver-justificaciones/ver-justificaciones.module').then(m => m.VerJustificacionesPageModule), canActivate: [AuthGuard] },
  {
    path: 'gestion-clases',
    loadChildren: () => import('./gestion-clases/gestion-clases.module').then( m => m.GestionClasesPageModule)
  },
  {
    path: 'captura-qr',
    loadChildren: () => import('./captura-qr/captura-qr.module').then( m => m.CapturaQrPageModule)
  },
// Ruta por defecto
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
