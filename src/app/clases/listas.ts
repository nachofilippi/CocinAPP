import { ListaItem } from './lista.item';


export class Lista  {
    nombre: string;
    completado: boolean;
    personas: string;
    items: ListaItem[];
    show: boolean;
    favorito: boolean;
    // foto: string;
    // pasos: number;
    // dificultad: number;
    // tiempo_preparacion: number;
    // apto_para: string;
    // video: string;
    // creador: string;



constructor (nombre: string, personas: string){
        this.nombre= nombre;
        this.completado = false;
        this.personas = personas;
        this.show=false;
        // this.foto=foto;
        this.favorito=false;

    }
}
