import { Classe } from "./Classe";
import { Persona } from "./Persona";

export interface Studente extends Persona{
    classe : Classe
}