import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  mensagem: string = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}
  //montando a estrutura do formulario
  formCadastro = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    alunos: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required]),
    termino: new FormControl('', [Validators.required]),
    cat: new FormGroup({
      id: new FormControl('', [Validators.required])
  }),
  });
  //acessando o formulário/campos na página HTML
  get form(): any {
    return this.formCadastro.controls;
  }
  //função para fazer a chamada do cadastro na API
  onSubmit(): void {
    this.httpClient
      .post(environment.url+'/cursos', this.formCadastro.value, {
        responseType: 'text',
      })
      .subscribe(
        data => {
          this.mensagem = data;
          this.formCadastro.reset();
        },
        e => {
          this.mensagem = 'Erro ao cadastrar';
          console.log(e);
          this.formCadastro.reset();
        }
      );
  }
}
