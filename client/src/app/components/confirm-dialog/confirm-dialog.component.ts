import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PortifolioComponent } from '../portifolio/portifolio.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  text
  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.text = dataReceive;
    } else {
      this.text = "Tem certeza dessa ação?"
    }
  }

  ngOnInit() {
  }

  exit(status) {
    this.dialogRef.close(status)
  }

}
