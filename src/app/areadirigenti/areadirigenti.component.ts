import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Classe } from 'src/models/Classe';
import { Dirigente } from 'src/models/Dirigente';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-areadirigenti',
  templateUrl: './areadirigenti.component.html',
  styleUrls: ['./areadirigenti.component.css']
})
export class AreadirigentiComponent {
  dirigente? : Dirigente
  studenti? : Studente[]
  classi? : Classe[]

  constructor(private http : HttpClient){
    this.http = http;
    this.checkLogin();
    this.getDirigente();
    this.getAllStudenti();
  }



  getAllStudenti(){
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

    this.http.get("http://localhost:8080/api/persona/studente-all", {headers}).subscribe(risposta => {
      this.studenti = risposta as Studente[]
    })
  }

  getDirigente(){
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
    

    //Per passare parametri ad una richiesta posso ad esempio utilizzare l'oggetto HttpParams settando i parametri che mi servono
    const params = new HttpParams().set("idDirigente", token.split("-")[2])

    this.http.get("http://localhost:8080/api/persona/dirigente-byId", {headers, params}).subscribe(risposta => {
      this.dirigente = risposta as Dirigente;
    })
  }

  checkLogin(){
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

    this.http.get("http://localhost:8080/api/login/checklogin", {headers}).subscribe(risposta =>{
      var check : boolean = risposta as boolean;
      if(!check){
        this.logout();
      }
    })
  }

  logout(){
    sessionStorage.clear()
    window.location.href = "/loginpage"
  }
}
