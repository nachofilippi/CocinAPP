import {Component} from '@angular/core';
import {LoginProvider} from '../../providers/login/login';
import {NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home'


@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    logueado: boolean = false;
    usuario: any = {};

    constructor(private login: LoginProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.usuario = this.navParams.get("usr");
    }

    logout() {
        this.login.logout().then(() => this.navCtrl.setPages([{page: HomePage}]),()=>{});
    }
}
