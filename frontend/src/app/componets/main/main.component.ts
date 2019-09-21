import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  getres: Object;
  mens: Object;
  postres: Object;
  enmens: Object;

  constructor(private mainService: MainService) {}
  ngOnInit() {
  }
  get(){
    this.mainService.get(this.postres).subscribe(res =>{

      this.getres = res;
      console.log("respuesta",res)
    })
  }
  post(){

    this.mainService.post(this.mens).subscribe(res =>{
      this.postres = res;
      console.log("Respuesta", res)
    })
  }
}
