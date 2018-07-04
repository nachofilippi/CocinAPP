import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LoginProvider } from '../../providers/login/login';
import {InfoNutricionalPage} from '../info-nutricional/info-nutricional';
import { TextToSpeech } from '@ionic-native/text-to-speech';


@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html'
})
export class DetalleComponent implements OnInit {
  receta: any;
  stars: any;
  video: boolean = false;
  ingredientes: boolean = false;
  puedeBorrar: boolean = false;
  favorito: boolean;
  share: any = { facebook: true, whatsapp: true, twitter: true, instagram: true };
  yaPuntuo: number;
  reproduciendo: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private toastCtrl: ToastController, private rest: RestProvider, public modalCtrl: ModalController,
    public socialSharing: SocialSharing, private login: LoginProvider, private tts: TextToSpeech) {
    this.receta = this.navParams.get("receta");
  }

  clickStart(num) {
    this.login.checkLogin().then(
      () => this.pintarEstrellas(num),
      () => this.login.solicitarLogin().then(
        () => this.pintarEstrellas(num),
        () => { }
      )
    );
  }

  pintarEstrellas(num) {
    if (this.yaPuntuo === num + 1) {
      let toast = this.toastCtrl.create({
        message: 'Ya habías calificado a esta receta con ' + this.yaPuntuo + (this.yaPuntuo === 1 ? ' estrella!' : ' estrellas!'),
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return;
    }
    if (this.yaPuntuo) {
      let confirm = this.alertCtrl.create({
        message: 'Ya habías calificado a esta receta con ' + this.yaPuntuo + (this.yaPuntuo === 1 ? ' estrella!' : ' estrellas! Querés modicar esta puntuación?'),
        buttons: [{
          text: 'No', cssClass: 'alert-button'
        },
        {
          text: 'Sí',
          handler: () => {
            this.rest.puntuarReceta(this.receta.id, num + 1).subscribe(() => { }, () => { });
            for (var i = 0; i < this.stars.length; i++) {
              this.stars[i].pintada = 0;
              if (i <= num)
                this.stars[i].click = true;
              else
                this.stars[i].click = false;
            }
            let toast = this.toastCtrl.create({
              message: 'Gracias por calificar la receta!',
              duration: 2500,
              position: 'bottom'
            });
            toast.present();
            this.yaPuntuo = num + 1;
          },
          cssClass: 'alert-button'
        }]
      });
      confirm.present();
    }
    else{
      this.rest.puntuarReceta(this.receta.id, num + 1).subscribe(() => { }, () => { });
      for (var i = 0; i < this.stars.length; i++) {
        this.stars[i].pintada = 0;
        if (i <= num)
          this.stars[i].click = true;
        else
          this.stars[i].click = false;
      }
      let toast = this.toastCtrl.create({
        message: 'Gracias por calificar la receta!',
        duration: 2500,
        position: 'bottom'
      });
      toast.present();
      this.yaPuntuo = num + 1;
    }
  }

  borrarReceta() {
    let confirm = this.alertCtrl.create({
      title: 'Borrar receta',
      message: '¿Estás seguro que querés borrar la receta?',
      buttons: [{ text: 'Cancelar', cssClass: 'alert-button' },
      {
        text: 'Eliminar',
        handler: () => {
          this.rest.deleteReceta(this.receta.id).subscribe(
            () => {
              let toast = this.toastCtrl.create({
                message: 'La receta fue eliminada',
                duration: 2500,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.pop();
            }, () => {
              let toast = this.toastCtrl.create({
                message: 'No se pudo eliminar la receta. Verificá tu conexión a internet',
                duration: 2500,
                position: 'bottom'
              });
              toast.present();
              this.navCtrl.pop();
            }
          );
        },
        cssClass: 'alert-button'
      }]
    });
    confirm.present();
  }

  ngOnInit() {
    this.stars = [];
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    this.stars.push({ click: false });
    for (let i = 1; i <= 5; i++) {
      if (i <= this.receta.puntuaciones)
        this.stars[i - 1].pintada = 2;
      else if (i - 1 < this.receta.puntuaciones)
        this.stars[i - 1].pintada = 1;
    }

    if (localStorage.getItem("usuario")) {
      let usuario: any = JSON.parse(localStorage.getItem("usuario"));
      if (this.receta.creador && usuario.email === this.receta.creador.mail)
        this.puedeBorrar = true;
    }

    this.rest.getPuntuaciones(this.receta.id).subscribe(
      res => this.yaPuntuo = res[0].puntuacion, (data) => { if (data) this.yaPuntuo = data.puntuacion });

    this.socialSharing.canShareVia("com.facebook.android").catch(
      () => this.socialSharing.canShareVia("com.facebook.ios").catch(() => this.share.facebook = false)
    );
    this.socialSharing.canShareVia("com.twitter.android").catch(
      () => this.socialSharing.canShareVia("com.twitter.ios").catch(() => this.share.twitter = false)
    );
    this.socialSharing.canShareVia("com.instagram.android").catch(
      () => this.socialSharing.canShareVia("com.instagram.ios").catch(() => this.share.instagram = false)
    );
    this.socialSharing.canShareVia("com.whatsapp").catch(() => this.share.whatsapp = false)
  }

  agregarFavorito() {
      this.login.checkLogin().then(
        ()=>{this.addFav()},
        ()=>{this.login.solicitarLogin().then(()=>this.addFav(), ()=>{})}
      );
  }

  addFav() {
    let toast = this.toastCtrl.create({
      message: 'La receta fue añadida a favoritos!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.receta.favorito = true;
    this.rest.postFavorito(this.receta).subscribe(data => {}, offline => {});
  }

  eliminarFavorito() {
    let confirm = this.alertCtrl.create({
      title: 'Quitar favorito',
      message: '¿Estás seguro que querés eliminar la receta de la lista de favoritos?',
      buttons: ['Cancelar',
        {
          text: 'Eliminar',
          handler: () => {
            this.receta.favorito = false;
            this.rest.deleteFavorito(this.receta.id).subscribe(data => {}, offline => {});
          }
        }
      ]
    });
    confirm.present();
  }

  shareFacebook() {
    this.socialSharing.shareViaFacebook("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareTwitter() {
    this.socialSharing.shareViaTwitter("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareInstagram() {
    this.socialSharing.shareViaInstagram("Miren lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  shareWhatsApp() {
    this.socialSharing.shareViaWhatsApp("Mirá lo que estoy cocinando gracias a CocinApp!!", this.receta.imagenes[0]).then(
      () => { },
      () => { }
    );
  }

  verInfoNutricional() {
    let info_nutricional = this.receta.info_nutricional;
    info_nutricional.comensales= this.receta.personas;
    let profileModal = this.modalCtrl.create(InfoNutricionalPage, { info_nutricional }, { cssClass: 'info-nutricional-modal' });
    profileModal.present();
  }

  reproducir(texto: string) {
    this.reproduciendo = true;
    this.tts.speak({ text: texto, locale: 'es-ES' })
      .then(() => this.reproduciendo = false)
      .catch((reason: any) => console.log(reason));
  }

  stop() {
    this.reproduciendo = false;
    this.tts.speak("").then(() => {})
      .catch((reason: any) => console.log(reason));;
  }

  ionViewWillLeave(){
    this.stop();
  }

}
