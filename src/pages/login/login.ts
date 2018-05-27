import {Component, OnInit} from '@angular/core';
import {LoginProvider} from '../../providers/login/login';


@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

    logueado: boolean = false;
    usuario: any = {};

    constructor(private login: LoginProvider) {

    }

    ngOnInit() {
        this.login.checkLogin().then((usuario) => {this.logueado = true; this.usuario = usuario}, () => this.loginFb());
    }

    logout() {
        this.login.logout().then(() => this.logueado = false);
    }
    loginFb() {
        this.login.loginFacebook().then(usuario => {this.usuario = usuario; this.logueado = true;});

    }
}
