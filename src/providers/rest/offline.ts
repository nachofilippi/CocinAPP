import { Injectable } from '@angular/core';
import { recetas, ingredientes, enfermedades, categorias_recetas, categorias_ingredientes } from '../../mock/mock';

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
        receta.puntuaciones = 0;
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
    receta.apto_para=[];
    receta.id= Math.floor(Math.random() * 9999) + 1050;
    receta.imagenes=['https://www.freeiconspng.com/uploads/restaurant-icon-png-7.png'];
    receta.puntuaciones = [];
    let items: any = [];
    receta.ingredientes.forEach(item => {
      let ingrediente: any = this.getIngredientes().filter((ingre) => {
        return (ingre.id === item.ingrediente);
      })[0];
      items.push({ ingrediente: ingrediente, cantidad: item.cantidad });
    });
    receta.info_nutricional = {
      "id": 140,
      "cantidad": 0,
      "calorias": (Math.floor(Math.random() * 400) + 100)*receta.personas,
      "grasas_totales": (Math.floor(Math.random() * 200) + 20)*receta.personas,
      "sodio": (Math.floor(Math.random() * 40) + 0)*receta.personas,
      "carbohidratos": (Math.floor(Math.random() * 100) + 20)*receta.personas,
      "fibras": (Math.floor(Math.random() * 150) + 0)*receta.personas,
      "proteinas": (Math.floor(Math.random() * 50) + 1)*receta.personas,
      "calcio": (Math.floor(Math.random() * 30) + 0)*receta.personas,
      "hierro": (Math.floor(Math.random() * 30) + 1)*receta.personas,
      "potasio": (Math.floor(Math.random() * 50) + 1)*receta.personas,
      "colesterol": (Math.floor(Math.random() * 50) + 0)*receta.personas,
      "magnesio": (Math.floor(Math.random() * 20) + 0)*receta.personas,
      "zinc": (Math.floor(Math.random() * 20) + 0)*receta.personas
    };
    receta.ingredientes = items;
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
    let usuario: any = {};
    if (localStorage.getItem("recetas")) {
      recetas = JSON.parse(localStorage.getItem("recetas"));
    }
    if (localStorage.getItem("usuario")) {
      usuario = JSON.parse(localStorage.getItem("usuario"));
    }
    recetas.forEach(receta => {
      if (receta.id === id_receta) {
        receta.puntuaciones.forEach((puntuacion, index) => {
          if (puntuacion.usuario.email === usuario.email)
            receta.puntuaciones.splice(index, 1);

        });
        receta.puntuaciones.push({ puntuacion: puntos, usuario: usuario });
      }
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
    if (!localStorage.getItem("yaEntro")) {
      localStorage.removeItem("ingredientes");
      localStorage.removeItem("recetas");
      localStorage.removeItem("enfermedades");
      localStorage.removeItem("categorias_recetas");
      localStorage.removeItem("categorias_ingredientes");
      localStorage.removeItem("favoritos");
      localStorage.setItem("yaEntro", JSON.stringify("llala"));
    }

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
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
    if (!localStorage.getItem("filtros")) {
      let filtros: any = { tiempo: { lower: 10, upper: 180 }, enfermedades: [], ingredientes: [], categorias: [], dificultades: [], comensales: { lower: 1, upper: 15 } };
      localStorage.setItem("filtros", JSON.stringify(filtros));
    }
  }
}
