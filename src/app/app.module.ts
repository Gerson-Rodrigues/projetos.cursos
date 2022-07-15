import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';

import { TokenInterceptor } from './_interceptor/tokenInterceptor';
import { AccountComponent } from './account/account.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';
import { LoginComponent } from './login/login.component';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';

const routes: Routes = [
  {path: 'inicial', component: TelaInicialComponent},
  {path: 'consultar', component: ConsultarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'editar/:id', component: EditarComponent},
  {path: 'account', component: AccountComponent},
  {path: '', component: LoginComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    LoginComponent,
    CadastrarComponent,
    ConsultarComponent,
    EditarComponent,
    TelaInicialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  providers: [
    {
      //Configuração do uso do interceptor
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi: true
    }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
