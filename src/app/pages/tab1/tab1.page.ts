import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  listas: any[] = []
  darkMode: boolean=true;
  constructor( 
    public _deseoService: DeseosService, 
    private router : Router,
    public alertCtrl: AlertController) {
    this.listas = _deseoService.listas;
  }

  async agregarLista(){
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      inputs: [
        {
          name:'titulo',
          type:'text',
          placeholder:'Nombre de la Lista'
        }
      ],      
      buttons: [{
        text:'Cancelar',
        role:'cancel',
        handler: ()=>{ }},
        {
          text:'Crear',
          handler: (data)=>{
            if (data.titulo.length=== 0) {
              return;              
            }
            const listaId = this._deseoService.crearLista(data.titulo)
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`)

        }        
      }]
    });

    alert.present();

    // this.route.navigateByUrl('/tabs/tab1/agregar');
  }

  cambio(){
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark')
  }



}
