import { Component, OnInit } from '@angular/core';
import { EditGroundDialogComponent } from '../edit-ground-dialog/edit-ground-dialog.component';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
import { EditBackgroudDialogComponent } from '../edit-backgroud-dialog/edit-backgroud-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { EditTextDialogComponent } from '../edit-text-dialog/edit-text-dialog.component';
import { TextService } from '../../services/text.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

declare const $;

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.scss']
})
export class PortifolioComponent implements OnInit {
  imageObject:Array<object>
  userId
  layout
  texts = []
  // MatPaginator Output
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
            this.texts.splice(currentText._id,1);
          }
        })
      }
    })
  }

}
