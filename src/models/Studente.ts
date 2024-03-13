import { Classe } from "./Classe";

export interface Studente{
    id : number, 
    nome : string,
    cognome : string, 
    dataNascita : string,
    classe : Classe
}