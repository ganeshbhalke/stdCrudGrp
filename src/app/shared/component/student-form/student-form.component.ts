import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Istudent } from '../../modules/std';
import { StdServicesService } from '../../Services/std-services.service';
import { SnackBarServiceService } from '../../Services/snack-bar-service.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

@ViewChild('stdForm')stdForm!:NgForm

  isInEditMode:boolean=false


  constructor(
private _studentService : StdServicesService,
  private _snackBar : SnackBarServiceService
  ) { }

  ngOnInit(): void {
  }


  onStudentSubmit(){
    if(this.stdForm.valid){
      let stdobj :Istudent={
        ...this.stdForm.value,stdId:Date.now().toString()
      }
      console.log(stdobj);
      this.stdForm.reset()

      this._studentService.createStudent(stdobj) //it will return observable than consum subscribe method
      .subscribe({
        next:res=>{
          this._snackBar.openSnackBar(res.msg)
        },
        error:err=>{
          this._snackBar.openSnackBar(err.msg)
        }
      })
      
    }
  }
}
