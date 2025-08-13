import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';
import { AlertController  } from '@ionic/angular/standalone';



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
  maxDate: string = ''; // adicionado

  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private contatoService: ContatoService
  ) { }

  ngOnInit() {
    this.maxDate = new Date().toISOString().split('T')[0]; // define data máxima como hoje

    const nav = this.router.getCurrentNavigation();
    if(nav?.extras?.state?.['objeto']) {
      this.contato = nav?.extras?.state?.['objeto'];
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.dataNascimento = this.contato.dataNascimento || '';
      this.genero = this.contato.genero || '';
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private validar(campo:any) : boolean {
    return !!campo;
  }

  salvar() {
    this.dataNascimento = this.dataNascimento.split('T')[0];
    if(!this.validar(this.nome) || !this.validar(this.telefone)) {
      this.presentAlert("Erro ao cadastar", "Erro ao cadastrar");
      return;
    }
    if(this.contatoService.editar(this.contato, this.nome, this.telefone, this.genero, this.dataNascimento)) {
      this.presentAlert('Atualizar', 'Contato atualizado com sucesso');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Atualizar', 'Erro ao atualizar contato');
    }
  }

  excluir() {}

  alterarEdicao() {
    this.editar = !this.editar;
  }
}
