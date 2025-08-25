import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalharPage implements OnInit {
  contato!: Contato;
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  editar: boolean = true;
  maxDate: string = '';

  constructor(
    private router: Router,
    private contatoService: ContatoService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.maxDate = new Date().toISOString().split('T')[0];

    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['objeto']) {
      this.contato = nav.extras.state['objeto'];
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.dataNascimento = this.contato.dataNascimento || '';
      this.genero = this.contato.genero || '';
    }
  }

  private validar(campo: any): boolean {
    return !!campo;
  }

  async salvar() {
    if (!this.validar(this.nome) || !this.validar(this.telefone)) {
      this.uiService.showAlert('Erro ao cadastrar', 'Preencha todos os campos obrigatórios.');
      return;
    }

    this.dataNascimento = this.dataNascimento.split('T')[0];

    const sucesso = this.contatoService.editar(
      this.contato,
      this.nome,
      this.telefone,
      this.genero,
      this.dataNascimento
    );

    if (sucesso) {
      await this.uiService.showAlert('Atualizar', 'Contato atualizado com sucesso');
      this.router.navigate(['/home']);
    } else {
      await this.uiService.showAlert('Atualizar', 'Erro ao atualizar contato');
    }
  }

  async confirmarExclusao() {
    const confirm = await this.uiService.showConfirm(
      'Excluir',
      'Deseja realmente excluir este contato?'
    );

    if (confirm) {
      this.excluirContato();
    }
  }

  private async excluirContato() {
    const sucesso = this.contatoService.delete(this.contato);

    if (sucesso) {
      await this.uiService.showAlert('Excluir', 'Contato excluído com sucesso');
      this.router.navigate(['/home']);
    } else {
      await this.uiService.showAlert('Erro ao excluir', 'Contato não encontrado');
    }
  }

  alterarEdicao() {
    this.editar = !this.editar;
  }
}
