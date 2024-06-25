import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url:string="http://localhost:8080/department/"
  constructor(private http:HttpClient) { }

  public getDepartments():Observable<any>
  {
    return this.http.get<any>(this.url+"getalldepartments");
  }

  public saveDepartments(department:any):Observable<any>
  {
     return this.http.post<any>(this.url+"saveDepartment",department).pipe(
      catchError(this.errorHandler)) ;  
  }

  public updateDepartments(id:number,department:any):Observable<any>
  {
    return this.http.put<any>(this.url+"updateDepartment",department).pipe(
      catchError(this.errorHandler));
  }

  public deleteDepartments(id:any):Observable<any>
  {
    return this.http.delete<any>(this.url+"deleteDepartment/"+id).pipe(
     catchError(this.errorHandler));
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
 }
}


