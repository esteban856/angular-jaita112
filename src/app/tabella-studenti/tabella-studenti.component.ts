import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-tabella-studenti',
  templateUrl: './tabella-studenti.component.html',
  styleUrls: ['./tabella-studenti.component.css']
})
export class TabellaStudentiComponent {
  @Input() studenti? : Studente[]


  constructor(private http : HttpClient){
    this.http = http;
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
}
