import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Categoria } from '../model/Categoria';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  mensagem: string = '';

  formEditar!: FormGroup;

  categorias!: Categoria[];

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute) { }

 /* ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get(environment.url+'/cursos/'+id).subscribe(
      (data:any) => {this.formEditar.patchValue(data);},
      (e)=>{ console.log(e);});
  }*/

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.formEditar = new FormGroup({

      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required]),
      alunos: new FormControl('', [Validators.required]),
      inicio: new FormControl('', [Validators.required]),
      termino: new FormControl('', [Validators.required]),
      cat:  new FormGroup ({
        id: new FormControl('', [Validators.required]),})
    });
this.httpClient.get(environment.url + "/cursos/" + id)
    .subscribe(
      (data: any) => {
        this.formEditar.patchValue({id: data.id});
        this.formEditar.patchValue({descricao: data.descricao});
        this.formEditar.patchValue({alunos: data.alunos});
        this.formEditar.patchValue({inicio: data.inicio});
        this.formEditar.patchValue({termino: data.termino});
        this.formEditar.patchValue({cat: data.cat.id});
      },
      (e) => {
        alert(e.error);
        console.log(e);
      }
    )
    //this.listarCategorias();
  }

  /*listarCategorias() {
    this.categorias = [
      {id: 1, categoria:'Banco de dados'},
      {id: 2, categoria:'Comportamento'},
      {id: 3, categoria:'Comunicação'},
      {id: 4, categoria:'Metodologia'},
      {id: 5, categoria:'Multiplataforma'}
    ];
  }*/

  /*formEditar = new FormGroup({
    id: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    alunos: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required]),
    termino: new FormControl('', [Validators.required]),
    cat: new FormGroup({
      id: new FormControl('', [Validators.required]),
    }),
  });*/

  get form(): any {
    return this.formEditar.controls;
  }

  onEdit(): void {
    this.httpClient.put(environment.url+'/cursos', this.form.value,{responseType:'text'}).subscribe(data => {
      this.mensagem = data;
      this.formEditar.reset();
      delay(4000);
      window.location.href='/consultar';

    },
    e =>{
      this.mensagem = " Ocorreu um erro ao tentar editar os dados!!";
      console.log(e);
    }
    );
  }

}
