import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ngLucrareLicenta';
  
  constructor (private db:AngularFireDatabase){

  }

  ngOnInit(){

    /* const body_element = document.getElementById('container-fluid');
    const footer_element = document.getElementById('footer-container');

    body_element.style.paddingBottom = footer_element.offsetHeight.toString(); */ 

  }
}
