import { HttpClient } from '@angular/common/http';
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
      }
      else if(loginStatus.ruolo == "DOCENTE"){
        //Pagina areadocenti
      }
      else if(loginStatus.ruolo == "DIRIGENTE"){
        //Pagina areadirigenti
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
}
