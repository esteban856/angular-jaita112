import { HttpClient } from '@angular/common/http';
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
}
