import {Component, OnInit} from '@angular/core';
import {LoginProvider} from '../../providers/login/login';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    logueado: boolean = false;
    usuario: any = {};

    constructor(private login: LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.usuario = this.navParams.get("usr");
        console.log (this.usuario);
    }

    ngOnInit() {
//        this.login.checkLogin().then((usuario) => {this.logueado = true; this.usuario = usuario}, () => this.loginFb());
    }

    logout() {
        this.login.logout().then(() => this.logueado = false);
    }
    loginFb() {
        this.login.solicitarLogin().then(usuario => {this.usuario = usuario; this.logueado = true;});

    }
}
