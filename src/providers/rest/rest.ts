import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import 'rxjs/Rx';
import {OfflineProvider} from '../rest/offline';

@Injectable()
export class RestProvider {

    baseUrl: string = "http://192.168.0.34/CocinApi/web/app_dev.php/api";

    constructor(public http: HttpClient, public offline: OfflineProvider) {
    }

    getIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getIngredientes());
            }
            )
        );
    }

    getRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta').pipe(
            map((res) => {
              let recetas = res as any[];
              recetas.forEach(receta => {
                let pts = 0;
                receta.puntuaciones.forEach(puntuacion => {
                  pts += puntuacion.puntuacion;
                });
                if (receta.puntuaciones.length)
                  receta.puntuaciones = pts / receta.puntuaciones.length;
                else
                  delete receta.puntuaciones;
              });
              return recetas;
            }),
            catchError(function () {
                return Observable.throw(offlineProvider.getRecetas());
            })
        );
    }

    getEnfermedades(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/enfermedad').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getEnfermedades());
            })
        );
    }

    getCategoriasRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta/categoria').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasRecetas());
            })
        );
    }

    getCategoriasIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente/categoria').pipe(
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasIngredientes());
            })
        );
    }

    postReceta(receta: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = this.getUsuario();
        receta.creador = usuario.email;
        return this.http.post(this.baseUrl + '/receta', receta).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.postReceta(receta));
            })
        );
    }

    deleteReceta(idReceta: any): Observable<{}> {
      return this.http.delete(this.baseUrl + '/receta/' + idReceta).pipe(map(this.extractData),
          catchError(function () {
              return Observable.throw({});
          })
      );
  }

    postFavorito(favorito: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = this.getUsuario();
        return this.http.post(this.baseUrl + '/usuario/favorito', {receta: favorito.id, usuario: usuario.email}).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.postFavorito(favorito));
            })
        );
    }

    deleteFavorito(idReceta: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = this.getUsuario();
        return this.http.delete(this.baseUrl + '/usuario/favorito?usuario=' + usuario.email + "&receta=" + idReceta).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.deleteFavorito(idReceta));
            })
        );
    }

    getFavoritos(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let usuario: any = this.getUsuario();
        if (!usuario)
          return Observable.throw(offlineProvider.getFavoritos());
        return this.http.get(this.baseUrl + '/usuario/favorito/' + usuario.email).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getFavoritos());
            })
        );
    }

    postUsuario(usuario: any): Observable<{}> {
        return this.http.post(this.baseUrl + '/usuario', usuario).pipe(map(this.extractData),
            catchError(function () {
                return Observable.throw(usuario);
            })
        );
    }

    puntuarReceta(receta: number, puntos: number): Observable<{}> {
      let usuario: any = this.getUsuario();
      let puntuacion: any = { usuario: usuario.email, receta: receta, puntuacion: puntos };
      return this.http.post(this.baseUrl + '/usuario/puntuacion',puntuacion).pipe(map(this.extractData),
          catchError(function () {
              return Observable.throw({});
          })
      );
    }

    getPuntuaciones(receta: number = null): Observable<{}> {
      let usuario: any = this.getUsuario();
      if (!usuario)
        return Observable.throw([]);
      let queryString: string = '?usuario=' + usuario.email;
      if (receta)
        queryString += '&receta=' + receta
      return this.http.get(this.baseUrl + '/usuario/puntuacion'+queryString).pipe(map(this.extractData),
          catchError(function (e) {
              return Observable.throw(e);
          })
      );
    }

    private getUsuario() {
      if (localStorage.getItem("usuario"))
        return JSON.parse(localStorage.getItem("usuario"));
      return null;
    }

    private extractData(res: Response) {
      let body = res;
      return body || {};
    }
}
