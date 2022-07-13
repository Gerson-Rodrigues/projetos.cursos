import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
menssagem_sucesso: String = '';
menssagem_erro: String = '';


  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {}

  formCadastroAcc = new FormGroup({
    nome: new FormControl('',[Validators.required,
                              Validators.minLength(6),
                              Validators.maxLength(15)]),
    login: new FormControl('',[Validators.required,
                              Validators.minLength(5),
                              Validators.maxLength(20)]),
    senha: new FormControl('',[Validators.required,
                              Validators.minLength(6),
                              Validators.maxLength(10)]),
  })

  get form(): any {
    return this.formCadastroAcc.controls;
  }

  onSubmit():void{
  this.menssagem_sucesso = '';
  this.menssagem_erro = '';
  this.httpClient.post(environment.url+"/account",
          this.formCadastroAcc.value,
          {responseType: 'text'})
          .subscribe((data) => {
              this.menssagem_sucesso = data;
              this.formCadastroAcc.reset();


          },(e) => {
          this.menssagem_erro = 'Erro ao cadastrar'+e;
          console.log(e.error);
        }
      );
  }
}
