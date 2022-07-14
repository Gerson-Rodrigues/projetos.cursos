import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent implements OnInit {
  formCadastro!: FormGroup;

  categorias!: Categoria[];

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.formCadastro = new FormGroup({
      descricao: new FormControl('', [Validators.required]),
      alunos: new FormControl(''),
      inicio: new FormControl('', [Validators.required]),
      termino: new FormControl('', [Validators.required]),
      cat: new FormControl('', [Validators.required]),
    });
  }

  carregarCategorias() {
    this.categorias = [
      { id: 1, categoria: 'Banco de dados' },
      { id: 2, categoria: 'Comportamento' },
      { id: 3, categoria: 'Comunicação' },
      { id: 4, categoria: 'Metodologia' },
      { id: 5, categoria: 'Multiplataforma' },
    ];
  }

   //fazer chamada de cadastro na API
   onSubmit(): void {
    let idCategoria = this.formCadastro.get('cat')?.value;
    this.formCadastro.get('cat')?.setValue({ id: idCategoria });
    this.httpClient
      .post(environment.url + '/cursos', this.formCadastro.value, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          alert(data);
          this.router.navigate(['consultar']);
        },
        (e) => {
          alert(e.error);
          console.log(e);
        }
      );
  }

  voltar() {
    this.router.navigate(['consultar']);
  }

  get descricao() {
    return this.formCadastro.get('descricao');
  }

  get alunos() {
    return this.formCadastro.get('alunos');
  }

  get inicio() {
    return this.formCadastro.get('inicio');
  }

  get termino() {
    return this.formCadastro.get('termino');
  }
  
  get cat() {
    return this.formCadastro.get('cat');
  }

  get form(): any {
    return this.formCadastro.controls;
  }
}
