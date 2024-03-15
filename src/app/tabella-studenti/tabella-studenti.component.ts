import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Classe } from 'src/models/Classe';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-tabella-studenti',
  templateUrl: './tabella-studenti.component.html',
  styleUrls: ['./tabella-studenti.component.css']
})
export class TabellaStudentiComponent {
  @Input() studenti? : Studente[]
  @Input() classi? : Classe[]

  formModificaStudente : FormGroup;

  isModifing = false;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;
    this.formModificaStudente = formBuilder.group(
      {
        id : "",
        nome : "", 
        cognome : "",
        dataNascita : "",
        classe : ""
      }
    )
  }


  eliminaStudente(id : number){
    var token = sessionStorage.getItem("token")

    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token': token as string
      }
    );

    const params = new HttpParams().set("idStudente", id);

    this.http.get("http://localhost:8080/api/persona/studente-delete", {headers, params}).subscribe(risposta =>{
      var check = risposta as boolean;
      if(check){
        alert("Eliminazione avvenuta con successo")
        // window.location.href = "/areadirigenti"
        var indice = this.studenti?.findIndex(x => x.id === id)
        console.log("indice", indice)
        if(indice! > -1){
          this.studenti?.splice(indice!, 1);
        }
      }
    })
  }

  modificaStudente(studente : Studente){
    this.formModificaStudente.patchValue(
      {
        id : studente.id,
        nome : studente.nome,
        cognome : studente.cognome,
        dataNascita : studente.dataNascita,
        classe : studente.classe.id
      }
    );
    this.isModifing = true;
  }

  annullaModifica(){
    this.isModifing = false;
    this.formModificaStudente.patchValue(
      {
        id : "",
        nome : "",
        cognome : "",
        dataNascita : "",
        classe : ""
      }
    );
  }


  submitModificaStudente(){
    var token = sessionStorage.getItem("token")
    if(token == null){
      token = "";
    }

    const formValues = this.formModificaStudente.value;
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token': token as string
      }
    );

    const body = JSON.stringify(formValues);

    this.http.post("http://localhost:8080/api/persona/studente-update", body, {headers}).subscribe(risposta =>{
      var check = risposta as boolean;
      if(check){
        alert("Modifica avvenuta con successo")
        // window.location.href = "/areadirigenti"
        var stud : Studente = JSON.parse(body) as Studente;
        var classe : Classe = this.classi![this.classi?.findIndex(x => x.id == formValues.classe) as number];
        stud.classe = classe;

        var index = this.studenti?.findIndex(x => x.id == stud.id)
        this.studenti?.splice(index!, 1, stud);

      }
    })

    this.isModifing = false;
  }
}
