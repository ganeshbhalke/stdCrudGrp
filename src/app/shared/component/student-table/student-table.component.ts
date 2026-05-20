import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../modules/std';
import { StdServicesService } from '../../Services/std-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../Confirm Dialog Component/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  stdArr: Array<Istudent> = [];

  constructor(
    private _studentService: StdServicesService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    this._studentService.fetchstudent()
      .subscribe({
        next: res => {
          this.stdArr = res;
        },
        error: err => {
          console.log(err);
        }
      });

  }
  onRemoveStd(stdObj: Istudent) {

    console.log(stdObj);
  
    let config = new MatDialogConfig();
  
    config.width = '300px';
    config.disableClose = true;
  
    config.data = `Are you sure, you want to remove the student with id ${stdObj.stdId} ?`;
    console.log(stdObj);
  
    let matDialog = this._matDialog.open(
      ConfirmDialogComponent,
      config
    );
  
    matDialog.afterClosed()
      .subscribe(getConfirm => {
  
        if (getConfirm) {
  
          this._studentService.removeStudent(stdObj)
            .subscribe({
  
              next: res => {
  
                console.log(res);
  
                this._snackBar.open(
                  `Student with id ${stdObj.stdId} removed successfully !!`,
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top'
                  }
                );

                
              },
  
              error: err => {
  
                console.log(err);
  
                this._snackBar.open(
                  `Failed to remove student with id ${stdObj.stdId} !!`,
                  'Close',
                  {
                    duration: 3000,
                    verticalPosition: 'top'
                  }
                );
              }
            });
        }
      });
  }



}