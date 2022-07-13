import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  msg: String = '';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {}
  formEmail = new FormGroup({
    de: new FormControl('',[Validators.required]),
    para: new FormControl('',[Validators.required]),
    assunto: new FormControl('',[Validators.required]),
    texto: new FormControl('',[Validators.required]),
  })

  get form(): any{
    return this.formEmail.controls;
  }

  onEmail(): void{
    this.httpClient.post(environment.email, this.formEmail.value,
      {responseType: 'text',}).subscribe(data=>{this.msg = "E-mail Enviado com Sucesso!!";
      this.formEmail.reset();},
      e=> {this.msg = 'Deu um ERRO inesperado!!!';
      this.formEmail.reset();
      console.log(e);
      });
  }


}
