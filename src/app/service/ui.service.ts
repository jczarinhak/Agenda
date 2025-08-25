import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Alert simples
  async showAlert(header: string, message: string, buttons: string[] = ['OK']) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons
    });
    await alert.present();
  }

  // Confirmar ação
  async showConfirm(header: string, message: string): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          { text: 'Cancelar', role: 'cancel', handler: () => resolve(false) },
          { text: 'Confirmar', handler: () => resolve(true) }
        ]
      });
      await alert.present();
    });
  }

  // Toast simples
  async showToast(message: string, duration = 2000, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration,
      color
    });
    await toast.present();
  }
}
