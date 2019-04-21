import { Component, OnInit } from '@angular/core';
import { EditGroundDialogComponent } from '../edit-ground-dialog/edit-ground-dialog.component';
import { MatDialog } from '@angular/material';
import { EditBackgroudDialogComponent } from '../edit-backgroud-dialog/edit-backgroud-dialog.component';

declare const $;

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.scss']
})
export class PortifolioComponent implements OnInit {
  imageObject:Array<object>
  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  editGround(){
    let dialogRef = this.dialog.open(EditGroundDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        const ground = $('#ground')
        ground.css('background', '')
        ground.css('background-size', '')
        if(result.isImage){
          ground.css('background-image', result.imageUrl)
          ground.css('background-repeat', 'repeat')
        } else {
          ground.css('background', result.ground["background"])
          ground.css('background-size', result.ground["background-size"])
          ground.css('background-image', result.ground["background-image"])
          ground.css('background-color', result.ground["background-color"])
        }
      }
    });
  }

  editBackground() {
    let dialogRef = this.dialog.open(EditBackgroudDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        const folio = $('.folio')
        folio.css('background', '')
        folio.css('background-image', '')
        folio.css('background-repeat', '')
        folio.css('background-color', '')

        folio.css('background-image', result["background-image"])
        folio.css('background-color', result["background-color"])
        folio.css('background-repeat', result["background-repeat"])
        $('h1').css('color', result["color"])
        $('h2').css('color', result["color"])
      }
    });
  }

}
