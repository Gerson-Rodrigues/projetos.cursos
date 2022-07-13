import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{

  //atributos
isAuthenticated: boolean = false;
loginUsuario: String | null = '';

constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.isAuthenticated = localStorage.getItem("access_token")!= null &&
                          localStorage.getItem("login_usuario")!= null;
    if(this.isAuthenticated){
      this.loginUsuario = localStorage.getItem("login_usuario");
    }
  }
  
//função para fazer o logout do ususario...
logout():void{
  if(window.confirm('Deseja realmente sair do sistema?')){
  //apagar as informações no local storage
  localStorage.removeItem('access_token');
  localStorage.removeItem('login_usuario');

  //redirecionar para pagina inicial do projeto (login)
  window.location.href="/";
  }
}

  title = 'projetos.cursos';
}
