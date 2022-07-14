import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Cursos } from '../model/Cursos';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.scss']
})
export class ConsultarComponent implements OnInit {

  registro: any[] =[];
  page = 1;
  cursos: any[] = [];

  formPeriodo!: FormGroup;

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //Método executa quando o componente é aberto
  ngOnInit(): void {

    this.formPeriodo = new FormGroup({
    descricao: new FormControl(''),
    inicio: new FormControl(''),
    termino: new FormControl('')
  });
    this.onSubmit();
  }

  getQueryParams(obj: any ) {

    Object.keys(obj).forEach((key) => (obj[key] == null ||  obj[key] == 'null' || obj[key] == '' )  && delete obj[key]);

    return Object.keys(obj)

        .map(key => `${key}=${encodeURIComponent(obj[key])}`)

        .join('&');

}

limpar() {
  this.formPeriodo.reset();
  document.getElementById('descricao')?.focus();
}

onSubmit(): void {

  let parametros = this.getQueryParams(this.formPeriodo.value);
  console.log(parametros);
  this.httpClient.get(`${environment.url}/cursos?${parametros}`)
  .subscribe(
    data=> {this.registro = data as any[];
    },
    e => {
      alert(e.error);
      console.log(e)}
  )
  }

  //função pra fazer a exclusão do produto na API

  /*Optional<Curso> curso = repository.findById(idcurso);
        Curso c = curso.get();

        if (c.getDataTermino().isBefore(LocalDate.now())) {
            throw new RuntimeException("Não é possível excluir este curso, já realizado.");
        }*/
  excluir(id:number):void {
    if(window.confirm('Deseja realmente excluir o cadastro selecionado???')){
      this.httpClient.delete(environment.url+'/cursos/'+id,
      {responseType: 'text'}).subscribe((data)=> {
        alert (data);      //exibir mensagem em uma janela popup
        this.ngOnInit();   //recarregar a consulta de produtos
      },
      (e)=>{ console.log(e)})
    }
  }
  key: string = 'descricao'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key: string) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    handlePageChange(event: any): void {
      this.page = event;
    }
}
