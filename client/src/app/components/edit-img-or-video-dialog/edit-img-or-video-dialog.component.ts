import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PortifolioComponent } from '../portifolio/portifolio.component';

@Component({
  selector: 'app-edit-img-or-video-dialog',
  templateUrl: './edit-img-or-video-dialog.component.html',
  styleUrls: ['./edit-img-or-video-dialog.component.scss']
})
export class EditImgOrVideoDialogComponent implements OnInit {
  isVideo:boolean = false
  image:string
  video:string
  title:string
  constructor(
    public dialogRef: MatDialogRef<PortifolioComponent>,
    @Inject(MAT_DIALOG_DATA) public dataReceive: any
  ) {
    if (dataReceive) {
      this.isVideo = dataReceive["video"] != "";
      this.image = dataReceive["image"];
      this.video = dataReceive["video"];
      this.title = dataReceive["title"];
    }
  }

  ngOnInit() {
    console.log(this.isVideo)
  }


  exit(status) {
    if(status){
      console.log(status, this.isVideo, this.video)
      if(this.isVideo && this.video != "") {
        console.log('aqui')
        this.dialogRef.close({
          video: this.video,
          image: "",
          thumbImage: "",
          title: this.title
        })
      } else if(!this.isVideo && this.image != "") {
        this.dialogRef.close({
          video: "",
          image: this.image,
          thumbImage: this.image,
          title: this.title
        })
      } else {
        this.dialogRef.close(false)
      }
    } else {
      this.dialogRef.close(false)
    }
  }
}
