import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild('lista') lista : IonList;
  @Input() terminado = true;

  constructor(
    private router: Router,
    public _deseoService: DeseosService,
    private alertCtrl: AlertController) { }

  ngOnInit() { }

  listaSeleccionada(lista: Lista) {    
    if (this.terminado) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)

    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  }

  async editarLista(lista:Lista){    
    const alert = await this.alertCtrl.create({
      header: 'Editar Lista',
      inputs: [
        {
          name:'titulo',
          type:'text',
          value: lista.titulo,
          placeholder:'Nombre de la Lista'
        }
      ],      
      buttons: [{
        text:'Cancelar',
        role:'cancel',
        handler: ()=>{
          this.lista.closeSlidingItems();          
        }},
        {
          text:'Actualizar',
          handler: (data)=>{
            if (data.titulo.length=== 0) {
              return;              
            }
            lista.titulo = data.titulo
            this._deseoService.guardarStorage();
            this.lista.closeSlidingItems();
        }        
      }]
    });

    alert.present();

    // this.route.navigateByUrl('/tabs/tab1/agregar');
  }




}
