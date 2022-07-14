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
  formLogin!: FormGroup;

  constructor(private httpClient: HttpClient,
              private authHelper: AuthHelper) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      login: new FormControl('',[Validators.required]),
      senha: new FormControl('',[Validators.required]),
    });
    if(this.authHelper.isAuthenticated()){
      //redireciona
      window.location.href="/inicial";
    }else{
      this.exibirPg = true;
    }
  }



  onSubmit():void{
    this.menssagem_erro = '';
    let url=environment.url+"/login";
    console.log(url);
    console.log(this.formLogin.value);
    this.httpClient.post(url,
                        this.formLogin.value,
                        {responseType: 'text'})
          .subscribe(data => {
            //salvar o TOKEN na LOCAL STORAGE
            localStorage.setItem('access_token',data);
            //salvar o login do usuario no LOCAL STORAGE
            localStorage.setItem('login_usuario', this.formLogin.value.login!);
            this.formLogin.reset();
            //redirecionamento
           window.location.href='/inicial';
          },
          e => {
            this.menssagem_erro = 'Erro ao logar';
            this.formLogin.reset();
            console.log(e.error);
          }
          );
  }
}
