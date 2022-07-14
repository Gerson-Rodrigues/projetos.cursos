import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  mensagem: string = '';

  formCadastro!: FormGroup;
  categorias!: Categoria[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {this.carregarCategorias();

     this.formCadastro = new FormGroup ({
     descricao: new FormControl('',[Validators.required]),
     alunos: new FormControl('',[Validators.required]),
     inicio: new FormControl('',[Validators.required]),
     termino: new FormControl('',[Validators.required]),
     cat: new FormGroup({
        id: new FormControl('', [Validators.required])}),

   });

}
 //carregar categorias
   carregarCategorias() {
     //buscar categorias do banco

     this.categorias = [
       {id: 1,categoria:'Banco de dados'},
       {id: 2,categoria:'Comportamento'},
       {id: 3,categoria:'Comunicação'},
       {id: 4,categoria:'Metodologia'},
       {id: 5,categoria:'Multiplataforma'}
     ];
   }

 //fazer chamada de cadastro na API
 onSubmit(): void{

   let curso = this.form.value//atribuindo o valor da variavel

   console.log(curso)

   this.httpClient.post(environment.url+'/cursos', curso,{responseType: 'text'}).subscribe(
     data =>{
       this.mensagem = data;
       this.formCadastro.reset();
       delay(3000),
       window.location.href='/consultar';
     },
     e => {
       alert(e.error);
       console.log(e);
     }
   )
 }


  //ngOnInit(): void {}
  //montando a estrutura do formulario
  /*formCadastro = new FormGroup({
    descricao: new FormControl('', [Validators.required]),
    alunos: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required]),
    termino: new FormControl('', [Validators.required]),
    cat: new FormGroup({
      id: new FormControl('', [Validators.required])
  }),
  });*/
  //acessando o formulário/campos na página HTML
  get form(): any {
    return this.formCadastro.controls;
  }
  //função para fazer a chamada do cadastro na API
  /*onSubmit(): void {
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
  }*/
}
