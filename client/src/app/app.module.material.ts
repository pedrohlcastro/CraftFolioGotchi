import 'hammerjs';
import { NgModule } from '@angular/core';
import {MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule, MatIconModule],
  exports: [MatCardModule, MatTabsModule, MatButtonModule,MatRadioModule, MatTooltipModule, MatCheckboxModule, MatSidenavModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule, MatGridListModule, MatIconModule],
})
export class AppMaterialModule { }