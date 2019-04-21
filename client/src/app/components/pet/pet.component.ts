import { Component, OnInit, HostListener } from '@angular/core';

declare const $;

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  velocity = 0.5
  position = 0
  constructor() { }

  ngOnInit() {
  }
  
  @HostListener('window:keydown', ['$event'])
  move(ev){
    $('#pet').removeClass('move-right move-left')
    if (37 === ev.keyCode) {
      $('#pet').addClass('move-left')
      if((this.position - this.velocity) >= 0){
        this.position -= this.velocity;
      }
    }
    if (39 === ev.keyCode) {
      $('#pet').addClass('move-right')
      if((this.position + this.velocity) <= 80){
        this.position += this.velocity;
      }
    }
    $('#pet').css('margin-left', `${this.position}%`)
  }
}
