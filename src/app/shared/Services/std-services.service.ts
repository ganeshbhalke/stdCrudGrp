import { Injectable } from '@angular/core';
import { Istudent } from '../modules/std';
import { Observable, of } from 'rxjs';
import { IRes } from '../modules/Istdres';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StdServicesService {

  stdArr: Array<Istudent> = [

    {
      fname: 'Jhon',
      lname: 'Doe',
      email: 'jhon@gmail.com',
      contact: 1234567890,
      stdId: '123',
      isActive: false
    },

    {
      fname: 'May',
      lname: 'Doe',
      email: 'may@gmail.com',
      contact: 9876543210,
      stdId: '124',
      isActive: true
    },

    {
      fname: 'Rahul',
      lname: 'Sharma',
      email: 'rahul@gmail.com',
      contact: 9988776655,
      stdId: '125',
      isActive: true
    },

    {
      fname: 'Priya',
      lname: 'Patil',
      email: 'priya@gmail.com',
      contact: 8877665544,
      stdId: '126',
      isActive: false
    },

    {
      fname: 'Aman',
      lname: 'Verma',
      email: 'aman@gmail.com',
      contact: 7766554433,
      stdId: '127',
      isActive: true
    }

  ];

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  fetchstudent(): Observable<Istudent[]> {

    return of(this.stdArr);

  }

  createStudent(student: Istudent): Observable<IRes<Istudent>> {

    // API Call
    this.stdArr.push(student);

    // observable ko subscribe kiya to <IRes<Istudent> ka data milega
    return of({
      msg: `Student with id ${student.stdId} added successfully !!!`,
      data: student
    });

  }

  removeStudent(removeObj: Istudent): Observable<IRes<Istudent>> {

    let getIndex = this.stdArr.findIndex(
      std => std.stdId === removeObj.stdId
    );

    this.stdArr.splice(getIndex, 1);

    return of({
      msg: `Student with id ${removeObj.stdId} removed successfully !!!`,
      data: removeObj
    });

  }

}