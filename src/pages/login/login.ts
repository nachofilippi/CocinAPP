import { Component, OnInit } from '@angular/core';
import { CrearUsuarioPage } from '../crear-usuario/crear-usuario';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController ) {
  }

  ngOnInit() { }

  irCrear(){
      this.navCtrl.push(CrearUsuarioPage);
  }



}
