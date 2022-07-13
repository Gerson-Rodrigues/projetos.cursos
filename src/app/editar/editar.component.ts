import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  mensagem: string = '';


  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get(environment.url+'/cursos/'+id).subscribe(
      (data:any) => {this.formEditar.patchValue(data);},
      (e)=>{ console.log(e);});
  }

  formEditar = new FormGroup({
    id: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    alunos: new FormControl('', [Validators.required]),
    inicio: new FormControl('', [Validators.required]),
    termino: new FormControl('', [Validators.required]),
    cat: new FormGroup({
      id: new FormControl('', [Validators.required]),
    }),
  });

  get form(): any {
    return this.formEditar.controls;
  }

  onEdit(): void {
    this.httpClient.put(environment.url+'/cursos', this.formEditar.value,{responseType:'text'}).subscribe(data => {
      this.mensagem = data;
      this.formEditar.reset();
    },
    e =>{
      this.mensagem = " Ocorreu um erro ao tentar editar os dados!!";
      console.log(e);
    }
    );
  }

}
