
import { Categoria } from "./Categoria";

export interface Cursos{
  id: number;
  descricao: string;
  alunos:number;
  inicio: Date;
  termino: Date;
  cat: Categoria;

}
