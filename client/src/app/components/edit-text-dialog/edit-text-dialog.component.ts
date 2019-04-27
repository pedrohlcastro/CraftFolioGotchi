import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PortifolioComponent } from '../portifolio/portifolio.component';

@Component({
  selector: 'app-edit-text-dialog',
  templateUrl: './edit-text-dialog.component.html',
  styleUrls: ['./edit-text-dialog.component.scss']
})
export class EditTextDialogComponent implements OnInit {
  text
  fontSize
  backgroundColor
  textColor
  borderColor
  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.text = dataReceive.text;
      this.fontSize = dataReceive["font-size"];
      this.backgroundColor = dataReceive["background-color"];
      this.textColor = dataReceive["text-color"];
      this.borderColor = dataReceive["border-color"];
    }
  }

  ngOnInit() {
  }


  exit(status) {
    if(status && this.text && this.fontSize && this.backgroundColor && this.borderColor && this.textColor){
      this.dialogRef.close({
        "text": this.text,
        "background-color": this.backgroundColor,
        "border-color": this.borderColor,
        "font-size": this.fontSize,
        "text-color": this.textColor
      });
    } else {
      this.dialogRef.close(false);
    }
  }
}
