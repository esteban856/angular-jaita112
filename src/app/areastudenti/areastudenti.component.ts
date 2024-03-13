import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Studente } from 'src/models/Studente';

@Component({
  selector: 'app-areastudenti',
  templateUrl: './areastudenti.component.html',
  styleUrls: ['./areastudenti.component.css']
})
export class AreastudentiComponent {
  studente?: Studente


  constructor(private http : HttpClient){
    this.http = http;
    this.checkLogin();
    this.getStudente();
  }


  getStudente(){
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
    var idStudente = sessionStorage.getItem("token")?.split("-")[2];

    // var params = new HttpParams().set('idStudente', idStudente!);

    this.http.get("http://localhost:8080/api/persona/studente-byId?idStudente=" + idStudente, {headers}).subscribe(risposta =>{
      this.studente = risposta as Studente;
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
