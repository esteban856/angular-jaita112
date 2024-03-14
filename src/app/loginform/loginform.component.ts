import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginStatus } from 'src/models/LoginStatus';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent {
  formLogin: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    this.http = http;
    this.formLogin = formBuilder.group({
      username: "",
      password: ""
    })

    this.checkLogin();
  }

  submitForm(){
    const formValues = this.formLogin.value;
    const headers = {'Content-Type' : 'application/json'}
    const body = JSON.stringify(formValues);
    this.http.post("http://localhost:8080/api/login/signin", body, {'headers' : headers}).subscribe(risposta => {
      var loginStatus : LoginStatus = risposta as LoginStatus;
      
      sessionStorage.setItem("token", loginStatus.token)

      if(loginStatus.ruolo == "STUDENTE"){
        //Pagina areastudenti
        window.location.href = "/areastudenti"
      }
      else if(loginStatus.ruolo == "DOCENTE"){
        //Pagina areadocenti
      }
      else if(loginStatus.ruolo == "DIRIGENTE"){
        //Pagina areadirigenti
        window.location.href = "/areadirigenti"
      }
      else{
        alert("ERRORE LOGIN");
        this.formLogin.patchValue(
          {
            username : "",
            password : ""
          }
        )
      }

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
      if(check){
        if(token?.split("-")[0] == "STUDENTE"){
          //Pagina areastudenti
          window.location.href = "/areastudenti"
        }
        else if(token?.split("-")[0] == "DOCENTE"){
          alert("Sei un docente")
        }
        else if(token?.split("-")[0] == "DIRIGENTE"){
          window.location.href = "/areadirigenti"
        }
      }
    })
  }
}
