import { Component, OnInit } from '@angular/core';
import { Istudent } from '../../modules/std';
import { StdServicesService } from '../../Services/std-services.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {

  stdArr: Array<Istudent> = [];

  constructor(
    private _studentService: StdServicesService
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
  
        },
        error: err => {
          console.log(err);
        }
      });
  
  }
  

}