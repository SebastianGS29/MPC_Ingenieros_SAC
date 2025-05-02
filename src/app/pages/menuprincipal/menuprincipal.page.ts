import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
  standalone: false
})
export class MenuprincipalPage implements OnInit {

  form = new FormGroup({
    voltaje: new FormControl('',[Validators.required]),
    amperaje: new FormControl('',[Validators.required]),
    consumo_KWH: new FormControl('',[Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

}
