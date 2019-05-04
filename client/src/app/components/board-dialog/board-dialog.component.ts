import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PortifolioComponent } from '../portifolio/portifolio.component';

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.scss']
})
export class BoardDialogComponent implements OnInit {
  edit:boolean
  text:string

  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.edit = dataReceive.isAuthenticated;
      this.text = dataReceive.text;
    }
    console.log(this.text, this.edit)
  }

  ngOnInit() {
  }

  exit(status){
    if(status) {
      this.dialogRef.close(this.text);
    } else {
      this.dialogRef.close(false);
    }
  }
}
