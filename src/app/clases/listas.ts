import { ListaItem } from './lista.item';

export class Lista  {
    nombre: string;
    completado: boolean;
    items: ListaItem[];


constructor (nombre: string){
        this.nombre= nombre;
        this.completado = false;
    }
}
