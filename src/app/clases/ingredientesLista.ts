import { Ingredientes } from './ingredientes';

export class IngredientesLista  {
    nombre: string;
    completado: boolean;
    cantidad: number;
    ingredientes: Ingredientes[];


constructor (nombre: string, cantidad: number){
        this.nombre= nombre;
        this.completado = false;
        this.cantidad = cantidad;
    }
}
