import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/Categoria';
import { Cursos } from '../model/Cursos';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  formEditar!: FormGroup;

  categorias!: Categoria[];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();

    this.formEditar = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      alunos: new FormControl(''),
      inicio: new FormControl('', [Validators.required]),
      termino: new FormControl('', [Validators.required]),
      cat: new FormControl('', [Validators.required]),
    });

    let idCurso = this.route.snapshot.paramMap.get('id') as string;
    this.httpClient.get<Cursos>(`${environment.url}/cursos/${idCurso}`).subscribe(
      (data) => {
          this.formEditar.patchValue({id: data!.id});
          this.formEditar.patchValue({descricao: data!.descricao});
          this.formEditar.patchValue({alunos: data!.alunos});
          this.formEditar.patchValue({inicio: data!.inicio});
          this.formEditar.patchValue({termino: data!.termino});
          this.formEditar.patchValue({cat: data!.cat.id});
      },
      (e) => {
        alert(e.error);
        console.log(e);
      }
    );
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
    let idCategoria = this.formEditar.get('cat')?.value;
    this.formEditar.get('cat')?.setValue({ id: idCategoria });
    this.httpClient
      .put(environment.url + '/cursos', this.formEditar.value, {
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
    return this.formEditar.get('descricao');
  }

  get alunos() {
    return this.formEditar.get('alunos');
  }

  get inicio() {
    return this.formEditar.get('inicio');
  }

  get termino() {
    return this.formEditar.get('termino');
  }

  get cat() {
    return this.formEditar.get('cat');
  }

  get form(): any {
    return this.formEditar.controls;
  }
}
