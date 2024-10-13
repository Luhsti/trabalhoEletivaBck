import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cadTransacao',
  templateUrl: './cadTransacao.component.html',
  styleUrls: ['./cadTransacao.component.css']
})
export class CadTransacaoComponent implements OnInit {

  cadastro!:FormGroup
  acaoTitulo:string = 'Cadastro'

  tipoTransacao:any[] = [
    {id:'R', nome: 'Receita'},
    {id:'D', nome: 'Despesa'},
  ]

  tipoCategoria:any[] = [
    {id:'C', nome: 'Casa'},
    {id:'E', nome: 'Escola'},
    {id:'T', nome: 'Trabalho'},
    {id:'X', nome: 'Estudo'}
  ]

  constructor(
    private form: FormBuilder,
    private dialogRef: MatDialogRef<CadTransacaoComponent>,
  ) { }

  ngOnInit() {
    this.cadastro = this.form.group({
      tipoTransacao: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      valor: [null, [Validators.required]], 
      dataTransacao: [null, [Validators.required]],
      descricao: [null],
    })
  }

  enviarTransacao(){
    this.dialogRef.close(this.cadastro.value)
  }


}
