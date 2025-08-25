import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline, trash } from 'ionicons/icons';

import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';
import { UiService } from 'src/app/service/ui.service';

addIcons({ add, 'create-outline': createOutline, trash });

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class HomePage {
  contatos: Contato[];

  constructor(
    private router: Router,
    private contatoService: ContatoService,
    private uiService: UiService
  ) {
    this.contatos = this.contatoService.contatos;
  }

  ionViewWillEnter() {
    // Atualiza a lista sempre que voltar para a página
    this.contatos = this.contatoService.contatos;
  }

  irParaCadastrar() {
    this.router.navigate(['/cadastrar']);
  }

  detalhar(contato: Contato) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: contato } });
  }

  editarContato(contato: Contato) {
    this.router.navigateByUrl('/cadastrar', { state: { objeto: contato } });
  }

  async removerContato(contato: Contato) {
    const confirm = await this.uiService.showConfirm(
      'Excluir Contato',
      `Deseja realmente excluir ${contato.nome}?`
    );
    if (confirm) {
      this.contatoService.delete(contato); // atualiza os dados
      this.contatos = this.contatoService.contatos; // atualiza lista visível
      this.uiService.showToast('Contato removido!', 2000, 'success');
    }
  }
}
