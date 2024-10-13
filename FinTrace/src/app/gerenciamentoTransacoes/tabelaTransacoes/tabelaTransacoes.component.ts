import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TransacoesService } from '../service/transacoes.service';

@Component({
  selector: 'app-tabelaTransacoes',
  templateUrl: './tabelaTransacoes.component.html',
  styleUrls: ['./tabelaTransacoes.component.css']
})
export class TabelaTransacoesComponent implements OnInit {

  lista:any[] = [

  ]

  colunasTabela: string[] = ['transacao', 'categoria', 'valor', 'data', 'descricao', 'alteracao']
  dados = new MatTableDataSource<any>()
  dadoOriginal = new MatTableDataSource<any>()
  excluirRegistro$!: Subscription

  start:number = 0
  limit:number = 10
  end: number = this.limit + this.start
  selectedRowIndex!:number
  
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @Output()
  registroExcluido:EventEmitter<number> = new EventEmitter

  constructor(
    protected service: TransacoesService
  ) { }

  ngOnChanges(){
    console.log('xablau')
    this.atualizaRegistros()
  }

  ngOnInit() {
    this.atualizaRegistros()
  }

  tableScroll(e:any){
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight 
    const scrollLocation = e.target.scrollTop
    
    const buffer = 2000
    const limit = tableScrollHeight - tableViewHeight - buffer

    if((scrollLocation > limit)){ //&& !this.pesquisa
      let data = this.getTableData(this.start, this.end)
      this.dados.data = this.dados.data.concat(data) 
      this.updateIndex()
    }
  }

  getTableData(start:any,end:any){
    return this.dadoOriginal.data.filter((value, index) => index>start && index<end)
  }

  updateIndex(){
    this.start = this.end
    this.end = this.limit + this.start

  }

  atualizaRegistros(){
    this.dados.data = this.lista
    this.dadoOriginal.data = this.lista
    this.dados.paginator = this.paginator
  }

  adicionaRegistro(item:any){
    this.lista.push(item)
    console.log(this.lista)
    this.atualizaRegistros()
  }

  retornaRegistros(){
    return this.lista
  }

  editar(id:any){

    
  }

  remover(id:number){
    /*const dialogRef = this.dialog.open(DialogExcluirComponent);
  
    dialogRef.afterClosed().subscribe(val=>{

      if(val){
      this.excluirForm(id, this.cde);
    }
  })*/
  }

  excluirForm(id:number, cde:number){
    /*this.excluirRegistro$ = this.service.excluirForm481(id, cde).subscribe({
      next: (dado) => {
        console.log('dado:: ', dado)
      },
      complete: () => {
        this.toast.success('Registro Excluído')
        this.registroExcluido.emit(id)

      },
    })*/


  }

  reiniciar(){
    this.dados.data = this.dadoOriginal.data
  }

  pesquisar(form:any){
    console.log('chegamos: ', form)
    if(form.data1 || form.data2){
      this.listarDatas(form)
    } else if (form.id){
      this.listarID(form)
    } else {
      this.listarDiario(form)
    }
  }

  listarDatas(form:any){
    console.log('passando lista datas')
    if(form.data1 && form.data2){
      this.listarID(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.data.substring(0,10)) >= Date.parse(form.data1) && Date.parse(dado.data.substring(0,10)) <= Date.parse(form.data2)
          } 
        )
      )
    } else if (form.data1) {
      this.listarID(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.data.substring(0,10)) >= Date.parse(form.data1)
          } 
        )
      )    
    } else {
      this.listarID(
        form,
        this.lista.filter(
          (dado) => {
            return Date.parse(dado.data.substring(0,10)) <= Date.parse(form.data2)
          } 
        )
      )
    }
  }

  listarID(form:any, dadoFiltrado?:any[]){
    console.log('passando lista id')
    if(form.id && dadoFiltrado){
      this.listarDiario(
        form,
        dadoFiltrado.filter(
          (dado) => {
            return dado.idForm481 == form.id
          } 
        )
      )
    } else if (form.id){
      this.listarDiario(
        form,
        this.lista.filter(
          (dado) => {
            return dado.idForm481 == form.id
          }  
        )
      )
    } else if (dadoFiltrado){
      this.listarDiario(
        form,
        dadoFiltrado
      )
    } else {
      this.listarDiario(form)
    }
  }
  

  listarDiario(form:any, dadoFiltrado?:any[]){
    if(form.diario && dadoFiltrado){
      this.dados.data = dadoFiltrado.filter(
        (dado) => {
          return dado.registroDiario?.toUpperCase().includes(form.diario.toUpperCase())
        } 
      )
    } else if (form.diario) {
      this.dados.data = this.lista.filter(
        (dado) => {
          return dado.registroDiario?.toUpperCase().includes(form.diario.toUpperCase())
        }
      )
    } else if (dadoFiltrado) {
      this.dados.data = dadoFiltrado
    } 
  }

}
