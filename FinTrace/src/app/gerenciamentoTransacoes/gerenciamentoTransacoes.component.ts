import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadTransacaoComponent } from './cadTransacao/cadTransacao.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TabelaTransacoesComponent } from './tabelaTransacoes/tabelaTransacoes.component';
import { TransacoesService } from './service/transacoes.service';

@Component({
  selector: 'app-gerenciamentoTransacoes',
  templateUrl: './gerenciamentoTransacoes.component.html',
  styleUrls: ['./gerenciamentoTransacoes.component.css']
})
export class GerenciamentoTransacoesComponent implements OnInit {

  pesquisa!:FormGroup

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

  @ViewChild(TabelaTransacoesComponent)tabela!: TabelaTransacoesComponent

  constructor(
    private dialog: MatDialog,
    private form: FormBuilder,
    protected service: TransacoesService
  ) { }

  ngOnInit() {

    this.pesquisa = this.form.group({
      transacao: [null],
      categoria: [null],
      dataInicio: [null],
      dataFim: [null],

    })
  }

  obtemDespesa(){
    const item = this.tabela?.retornaRegistros()
    if(item?.length > 0){
      return this.service.retornaTotalDespesa(item)
    }else{
      return 0
    }
  }

  obtemReceita(){
    const item = this.tabela?.retornaRegistros()
    if(item?.length > 0){
      return this.service.retornaTotalReceita(item)
    }else{
      return 0
    }
  }

  obtemSaldo(){
    const receita = this.obtemReceita()
    const despesa = this.obtemDespesa()
    return parseFloat(receita.toFixed(2)) - parseFloat(despesa.toFixed(2))
  }

  dialogTransacao(){

    const dialogRef = this.dialog.open(CadTransacaoComponent, {
      width: '700px',
      height: '507px'
    })

    dialogRef.afterClosed().subscribe(val=>{
      if(val){
        this.tabela.adicionaRegistro(val)
      }
    })


    
  }

}
