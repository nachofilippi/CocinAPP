import {Injectable} from '@angular/core';
import {recetas, ingredientes, enfermedades, categorias_recetas, categorias_ingredientes} from '../../mock/mock';

@Injectable()
export class OfflineProvider {

    getIngredientes(): any {
        let ingredientes: any = [];
        if (localStorage.getItem("ingredientes")) {
            ingredientes = JSON.parse(localStorage.getItem("ingredientes"));
        }
        return ingredientes;
    }

    getRecetas(): any {
      let recetas: any = [];
      if (localStorage.getItem("recetas")) {
        recetas = JSON.parse(localStorage.getItem("recetas"));
      }
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
    }

    getEnfermedades(): any {
        let enfermedades: any = [];
        if (localStorage.getItem("enfermedades")) {
            enfermedades = JSON.parse(localStorage.getItem("enfermedades"));
        }
        return enfermedades;
    }

    getCategoriasRecetas(): any {
        let categorias: any = [];
        if (localStorage.getItem("categorias_recetas")) {
            categorias = JSON.parse(localStorage.getItem("categorias_recetas"));
        }
        return categorias;
    }

    getCategoriasIngredientes(): any {
        let categorias: any = [];
        if (localStorage.getItem("categorias_ingredientes")) {
            categorias = JSON.parse(localStorage.getItem("categorias_ingredientes"));
        }
        return categorias;
    }

    postReceta(receta: any): any {
      let recetas: any = [];
      if (localStorage.getItem("recetas")) {
        recetas = JSON.parse(localStorage.getItem("recetas"));
      }
      receta.puntuaciones = [];
      let items: any=[];
      receta.ingredientes.forEach(item => {
        let ingrediente: any= this.getIngredientes().filter((ingre) => {
          return (ingre.id === item.ingrediente);
        })[0];
        items.push({ ingrediente: ingrediente, cantidad: item.cantidad });
      });
      receta.ingredientes= items;
      recetas.push(receta);
      localStorage.setItem("recetas", JSON.stringify(recetas));
      return receta;
    }

    postFavorito(favorito: any): any {
        favorito.favorito = true;
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        favoritos.push(favorito);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        return favorito;
    }

    deleteFavorito(idReceta): any {
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id == idReceta)
                favoritos.splice(i, 1);
        }
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    getFavoritos(): any {
        let favoritos: any = [];
        if (localStorage.getItem("favoritos")) {
            favoritos = JSON.parse(localStorage.getItem("favoritos"));
        }
        return favoritos;
    }

    puntuarReceta(id_receta: number, puntos: number): any {
      let recetas: any = [];
      let usuario:any={};
      if (localStorage.getItem("recetas")) {
        recetas = JSON.parse(localStorage.getItem("recetas"));
      }
      if (localStorage.getItem("usuario")) {
        usuario = JSON.parse(localStorage.getItem("usuario"));
      }
      recetas.forEach(receta => {
        if (receta.id===id_receta)
          receta.puntuaciones.push ({puntuacion: puntos, usuario: usuario});
      });
      localStorage.setItem("recetas", JSON.stringify(recetas));
      return recetas;
    }

    getPuntuaciones(id_receta: number, usuario: any) {
      let recetas: any = [];
      let puntuacion: any;
      if (localStorage.getItem("recetas")) {
        recetas = JSON.parse(localStorage.getItem("recetas"));
      }
      recetas.forEach(receta => {
        if (receta.id === id_receta) {
          receta.puntuaciones.forEach(pts => {
            if (pts.usuario.email === usuario.email) {
              return puntuacion = pts;
            }
          });
        }
      });
      return puntuacion;
    }

    init() {
        if (!localStorage.getItem("ingredientes")) {
            localStorage.setItem("ingredientes", JSON.stringify(ingredientes));
        }
        if (!localStorage.getItem("recetas")) {
            localStorage.setItem("recetas", JSON.stringify(recetas));
        }
        if (!localStorage.getItem("enfermedades")) {
            localStorage.setItem("enfermedades", JSON.stringify(enfermedades));
        }
        if (!localStorage.getItem("categorias_recetas")) {
            localStorage.setItem("categorias_recetas", JSON.stringify(categorias_recetas));
        }
        if (!localStorage.getItem("categorias_ingredientes")) {
            localStorage.setItem("categorias_ingredientes", JSON.stringify(categorias_ingredientes));
        }
        if (!localStorage.getItem("favoritos")) {
            let favoritos: any = [];
            localStorage.setItem("favoritos", favoritos);
        }
    }
}
