import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  menssagem_erro: String = '';

  exibirPg: boolean = false;

  constructor(private httpClient: HttpClient,
              private authHelper: AuthHelper) { }

  ngOnInit(): void {
    if(this.authHelper.isAuthenticated()){
      //redireciona
      window.location.href="/consulta";
    }else{
      this.exibirPg = true;
    }
  }

  formLogin = new FormGroup({
    login: new FormControl('',[Validators.required]),
    senha: new FormControl('',[Validators.required]),
  });

  get form(): any {
    return this.formLogin.controls;
  }

  onSubmit():void{
    this.menssagem_erro = '';
    this.httpClient.post(environment.url+"/login",
                        this.formLogin.value,
                        {responseType: 'text'})
          .subscribe(data => {
            //salvar o TOKEN na LOCAL STORAGE
            localStorage.setItem('access_token',data);
            //salvar o login do usuario no LOCAL STORAGE
            localStorage.setItem('login_usuario', this.formLogin.value.login!);
            this.formLogin.reset();
            //redirecionamento
           window.location.href='/consulta';
          },
          e => {
            this.menssagem_erro = 'Erro ao logar';
            this.formLogin.reset();
            console.log(e.error);
          }
          );
  }
}
