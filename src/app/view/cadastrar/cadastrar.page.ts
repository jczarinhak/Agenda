import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  maxDate: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private contatoService: ContatoService
  ) {
    let hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0]; 
  }

  ngOnInit() {}

  cadastrar() {
    if (
      !this.validar(this.nome) ||
      !this.validar(this.telefone) ||
      !this.validar(this.dataNascimento) ||
      !this.validar(this.genero)
    ) {
      this.presentAlert("Erro ao Cadastrar", "Todos os campos são obrigatórios");
      return;
    }

    let contato: Contato = new Contato(
      this.nome,
      this.telefone,
      this.dataNascimento,
      this.genero
    );

    this.contatoService.create(contato);
    this.presentAlert("Sucesso", "Contato cadastrado com sucesso!");
    this.router.navigate(["/home"]);
  }

  private validar(campo: any): boolean {
    return campo != null && campo !== '';
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader,
      message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}
