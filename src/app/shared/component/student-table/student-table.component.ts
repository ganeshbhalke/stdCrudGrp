import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../modules/std';
import { StdServicesService } from '../../Services/std-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  stdArr: Array<Istudent> = [];

  constructor(
    private _studentService: StdServicesService,
    private _snackBar: MatSnackBar
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

  this._studentService.removeStudent(stdObj)
    .subscribe({
      next: res => {

        console.log(res);

        this._snackBar.open(
          'Student deleted successfully !!',
          'Close',
          {
            duration: 3000
          }
        );

      },
      error: err => {
        console.log(err);

        this._snackBar.open(
          'Failed to delete student !!',
          'Close',
          {
            duration: 3000
          }
        );
      }
    });

}

}