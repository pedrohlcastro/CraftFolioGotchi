import { Component, OnInit, ViewChild } from '@angular/core';
import { EditGroundDialogComponent } from '../edit-ground-dialog/edit-ground-dialog.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { EditBackgroudDialogComponent } from '../edit-backgroud-dialog/edit-backgroud-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { EditTextDialogComponent } from '../edit-text-dialog/edit-text-dialog.component';
import { TextService } from '../../services/text.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgImageSliderComponent } from 'ng-image-slider';
import { EditImgOrVideoDialogComponent } from '../edit-img-or-video-dialog/edit-img-or-video-dialog.component';

declare const $;

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.scss']
})
export class PortifolioComponent implements OnInit {
  medias = [
    {
      image: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      thumbImage: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      video: ''
    },
    {
      image: '',
      thumbImage: '',
      video: 'https://youtu.be/6pxRHBw-k8M' // Youtube url
    },
  ]
  sliderImageWidth = 1080
  sliderImageHeight = 200
  currentImageIndex = 0
  @ViewChild('nav') slider: NgImageSliderComponent;

  userId
  layout
  texts = []
  pageEvent: PageEvent;
  
  
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private layoutService: LayoutService,
    private snackBar: MatSnackBar,
    private textService: TextService
  ) { }

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.paramMap.get('userId')
    this.sliderImageWidth = $(document).width()
    $( window ).resize(() => {
      this.sliderImageWidth = $(document).width()
    });
    this.layoutService.getLayout(this.userId).subscribe((res) => {
      this.layout = res;
      this.setGround(res.ground);
      this.setBackground(res.background);
      this.textService.getAllByUser(this.userId).subscribe((res) => {
        this.texts = res;
      })
    })
  }

  editGround(){
    let dialogRef = this.dialog.open(EditGroundDialogComponent, {
      width: '75%',
    });

    dialogRef.afterClosed().subscribe( result => {
      this.setGround(result)
      if(result) {
        this.layoutService.updateLayout(this.userId, {ground: result})
          .subscribe(res => {
            this.snackBar.open("Ground atualizado com sucesso.", 'Fechar', {duration: 3000});
          })
      }
      
    });
  }

  setGround(groundUpdate) {
    if(groundUpdate) {
      const ground = $('#ground')
      ground.css('background', '')
      ground.css('background-size', '')
      if(ground.isImage){
        ground.css('background-image', groundUpdate.imageUrl)
        ground.css('background-repeat', 'repeat')
      } else {
        ground.css('background', groundUpdate.ground["background"])
        ground.css('background-size', groundUpdate.ground["background-size"])
        ground.css('background-image', groundUpdate.ground["background-image"])
        ground.css('background-color', groundUpdate.ground["background-color"])
      }
    }
  }

  editBackground() {
    let dialogRef = this.dialog.open(EditBackgroudDialogComponent, {
      width: '75%',
      data: this.layout.background
    });

    dialogRef.afterClosed().subscribe( result => {
      this.setBackground(result)
      if(result) {
        this.layoutService.updateLayout(this.userId, {background: result})
          .subscribe(res => {
            this.snackBar.open("Background atualizado com sucesso.", 'Fechar', {duration: 3000});
          })
      }
    });
  }

  setBackground(background) {
    if(background) {
      this.layout.background = background;
      const folio = $('.folio')
      folio.css('background', '')
      folio.css('background-image', '')
      folio.css('background-repeat', '')
      folio.css('background-color', '')

      folio.css('background-image', background["background-image"])
      folio.css('background-color', background["background-color"])
      folio.css('background-repeat', background["background-repeat"])
      $('h1').css('color', background["color"])
      $('h2').css('color', background["color"])
      $('mat-paginator').css('color', background["color"])
    }
  }

  createText() {
    let dialogRef = this.dialog.open(EditTextDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.textService.createText(result).subscribe((res) => {
          if(res) {
            this.texts.push(res)
            this.snackBar.open("Texto criado com sucesso.", 'Fechar', {duration: 3000});
          }
        });
      }
    });
  }

  editText() {
    const currentText = this.texts[this.pageEvent ? this.pageEvent.pageIndex : 0]
    let dialogRef = this.dialog.open(EditTextDialogComponent, {
      width: '75%',
      data: currentText
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.textService.updateText(result, currentText._id).subscribe((res) => {
          if(res) {
            this.texts[this.pageEvent ? this.pageEvent.pageIndex : 0] = result
            this.snackBar.open("Texto atualizado com sucesso.", 'Fechar', {duration: 3000});
          }
        });
      }
    });
  }

  deleteText() {
    const currentText = this.texts[this.pageEvent ? this.pageEvent.pageIndex : 0]
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '75%',
      data: "Você tem certeza que deseja deletar esse texto?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.textService.deleteText(currentText._id).subscribe((res) => {
          if(res) {
            this.texts.splice(this.pageEvent ? this.pageEvent.pageIndex : 0 ,1);
            this.snackBar.open("Texto deletado com sucesso.", 'Fechar', {duration: 3000});
          }
        })
      }
    })
  }


  createMedia() {
    let dialogRef = this.dialog.open(EditImgOrVideoDialogComponent, {
      width: '75%'
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        // this.textService.createText(result).subscribe((res) => {
          // if(res) {
            this.medias.push(result)
            this.snackBar.open("Img/Video criado com sucesso. Para ver as mudanças é preciso atualizar a pagina", 'Fechar', {duration: 8000});
          // }
        // });
      }
    });
  }

  editMedia() {
    const currentMedia = this.medias[this.currentImageIndex]
    let dialogRef = this.dialog.open(EditImgOrVideoDialogComponent, {
      width: '75%',
      data: currentMedia
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        // this.textService.updateText(result, currentText._id).subscribe((res) => {
          // if(res) {
            this.medias[this.currentImageIndex] = result
            this.snackBar.open("Img/Video atualizado com sucesso. Para ver as mudanças é preciso atualizar a pagina", 'Fechar', {duration: 8000});
          // }
        // });
      }
    });
  }

  deleteMedia() {
    const currentMedia = this.texts[this.currentImageIndex]
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '75%',
      data: "Você tem certeza que deseja deletar essa imagem ou video?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // this.textService.deleteText(currentMedia._id).subscribe((res) => {
          // if(res) {
            this.medias.splice(this.currentImageIndex,1);
            this.snackBar.open("Img/Video deletado com sucesso. Para ver as mudanças é preciso atualizar a pagina", 'Fechar', {duration: 8000});
          // }
        // })
      }
    })
  }

  switchImage(ev) {
    if(ev == "next" && this.currentImageIndex < this.medias.length -1 ){
      this.currentImageIndex++
    } else if (ev == "previous" && this.currentImageIndex >= 0){
      this.currentImageIndex--
    }
  }


}
