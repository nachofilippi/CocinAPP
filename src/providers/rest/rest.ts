import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map, catchError, timeout} from 'rxjs/operators';
import 'rxjs/Rx';
import {OfflineProvider} from '../rest/offline';

@Injectable()
export class RestProvider {
    timeout: number = 3000;
    baseUrl: string = "http://192.168.0.34/CocinApi/web/app_dev.php/api";

    constructor(public http: HttpClient, public offline: OfflineProvider) {
    }

    getIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente').pipe(timeout(this.timeout),
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getIngredientes());
            }
            )
        );
    }

    getRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta').pipe(timeout(this.timeout),
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
                  receta.puntuaciones = 0;
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
        return this.http.get(this.baseUrl + '/enfermedad').pipe(timeout(this.timeout),
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getEnfermedades());
            })
        );
    }

    getCategoriasRecetas(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/receta/categoria').pipe(timeout(this.timeout),
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasRecetas());
            })
        );
    }

    getCategoriasIngredientes(): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        return this.http.get(this.baseUrl + '/ingrediente/categoria').pipe(timeout(this.timeout),
            map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getCategoriasIngredientes());
            })
        );
    }

    postReceta(receta: any): Observable<{}> {
      let offlineProvider: OfflineProvider = this.offline;
      try {
        let usuario: any = this.getUsuario();
        receta.creador = usuario.email;
      } catch (e) {
        return Observable.throw(offlineProvider.postReceta(receta));
      }
      return this.http.post(this.baseUrl + '/receta', receta).pipe(timeout(this.timeout),
      map(this.extractData),
        catchError(function () {
          return Observable.throw(offlineProvider.postReceta(receta));
        })
      );
    }

    deleteReceta(idReceta: any): Observable<{}> {
      return this.http.delete(this.baseUrl + '/receta/' + idReceta).pipe(timeout(this.timeout),
        map(this.extractData),
          catchError(function () {
              return Observable.throw({});
          })
      );
  }

    postFavorito(favorito: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let email: string;
        try {
          let usuario: any = this.getUsuario();
          email = usuario.email;
        } catch (e) {
          return Observable.throw(offlineProvider.postFavorito(favorito));
        }
        return this.http.post(this.baseUrl + '/usuario/favorito', {receta: favorito.id, usuario: email}).pipe(timeout(this.timeout),
        map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.postFavorito(favorito));
            })
        );
    }

    deleteFavorito(idReceta: any): Observable<{}> {
        let offlineProvider: OfflineProvider = this.offline;
        let email: string;
        try {
          let usuario: any = this.getUsuario();
          email = usuario.email;
        } catch (e) {
          return Observable.throw(offlineProvider.deleteFavorito(idReceta));
        }
        return this.http.delete(this.baseUrl + '/usuario/favorito?usuario=' + email + "&receta=" + idReceta).pipe(timeout(this.timeout),
        map(this.extractData),
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
        return this.http.get(this.baseUrl + '/usuario/favorito/' + usuario.email).pipe(timeout(this.timeout),map(this.extractData),
            catchError(function () {
                return Observable.throw(offlineProvider.getFavoritos());
            })
        );
    }

    postUsuario(usuario: any): Observable<{}> {
        return this.http.post(this.baseUrl + '/usuario', usuario).pipe(timeout(this.timeout),map(this.extractData),
            catchError(function () {
                return Observable.throw(usuario);
            })
        );
    }

    puntuarReceta(receta: number, puntos: number): Observable<{}> {
      let offlineProvider: OfflineProvider = this.offline;
      let usuario: any;
      let puntuacion: any;
      try {
        usuario = this.getUsuario();
        puntuacion = { usuario: usuario.email, receta: receta, puntuacion: puntos };
      } catch (e) { return Observable.throw({}) }
      return this.http.post(this.baseUrl + '/usuario/puntuacion', puntuacion).pipe(timeout(this.timeout),
      map(this.extractData),
        catchError(function () {
          return Observable.throw(offlineProvider.puntuarReceta(receta, puntos));
        })
      );
    }

    getPuntuaciones(receta: number = null): Observable<{}> {
      let offlineProvider: OfflineProvider = this.offline;
      let usuario: any = this.getUsuario();
      if (!usuario)
        return Observable.throw(null);
      let queryString: string = '?usuario=' + usuario.email;
      if (receta)
        queryString += '&receta=' + receta
      return this.http.get(this.baseUrl + '/usuario/puntuacion'+queryString).pipe(timeout(this.timeout),
      map(this.extractData),
          catchError(function (e) {
              return Observable.throw(offlineProvider.getPuntuaciones(receta, usuario));
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
