import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PortifolioComponent } from '../portifolio/portifolio.component';

@Component({
  selector: 'app-edit-backgroud-dialog',
  templateUrl: './edit-backgroud-dialog.component.html',
  styleUrls: ['./edit-backgroud-dialog.component.scss'],
})
export class EditBackgroudDialogComponent implements OnInit {
  color:string
  image:string
  repeat:boolean
  linearGradient:string
  fontColor:string

  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.fontColor = dataReceive.color;
      this.repeat = dataReceive["background-repeat"] == "repeat";
      this.color = dataReceive["background-color"];
    }
  }

  ngOnInit() {
  }

  exit(status){
    if(status) {
      let repeatString = 'no-repeat';
      if(this.repeat) {
        repeatString = 'repeat'
      }

      if(this.linearGradient) {
        this.linearGradient = this.linearGradient.replace(/;/g, "");
        this.dialogRef.close({
          "background-color": this.color,
          "background-image": this.linearGradient,
          "background-repeat": repeatString,
          "color": this.fontColor
        });
      } else {
        this.dialogRef.close({
          "background-color": this.color,
          "background-image": `url("${this.image}")`,
          "background-repeat": repeatString,
          "color": this.fontColor
        });
      }
    } else {
      this.dialogRef.close(false);
    }
  }

}
