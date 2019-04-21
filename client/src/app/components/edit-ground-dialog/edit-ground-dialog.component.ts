import { Component, OnInit, Inject } from '@angular/core';
import { PortifolioComponent } from '../portifolio/portifolio.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-ground-dialog',
  templateUrl: './edit-ground-dialog.component.html',
  styleUrls: ['./edit-ground-dialog.component.scss']
})
export class EditGroundDialogComponent implements OnInit {
  imageUrl: string = "";
  selected: number = 0;
  grounds = [
    {
      "background": "radial-gradient(circle at 0% 50%, rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px) 0px 10px, radial-gradient(at 100% 100%,      rgba(96, 16, 48, 0) 9px, #613 10px, rgba(96, 16, 48, 0) 11px), #8a3",
      "background-size": "20px 20px"
    },
    {
      "background-image": "repeating-linear-gradient(120deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),repeating-linear-gradient(60deg, rgba(255,255,255,.1), rgba(255,255,255,.1) 1px, transparent 1px, transparent 60px),linear-gradient(60deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1)),linear-gradient(120deg, rgba(0,0,0,.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,.1) 75%, rgba(0,0,0,.1))",
      "background-size": "70px 120px",
      "background-color": "#6d695c"

    },
    {
      "background": "linear-gradient(63deg, #999 23%, transparent 23%) 7px 0, linear-gradient(63deg, transparent 74%, #999 78%), linear-gradient(63deg, transparent 34%, #999 38%, #999 58%, transparent 62%),#444",
      "background-size": "16px 48px"
    },
  ]
  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) { }

  ngOnInit() {
  }

  select(item) {
    this.selected = item;
  }

  exit(status){
    if(status) {
      if(this.imageUrl) {
        this.dialogRef.close({isImage: true, imageUrl: `url("${this.imageUrl}")`});
      } else {
        if(this.selected != 0)
          this.dialogRef.close({isImage: false, ground: this.grounds[this.selected - 1]});
        else 
          this.dialogRef.close(false)
      }
      
    } else {
      this.dialogRef.close(false);
    }
    
  }
  
}
