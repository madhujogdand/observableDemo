import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string="http://localhost:8080/employee/"
  constructor(private http:HttpClient) { }

  public getEmployees():Observable<any>
  {
    return this.http.get<any>(this.url+"getallemployees");
  }

  public saveEmployees(employee:any):Observable<any>
  {
     return this.http.post<any>(this.url+"saveEmployee",employee).pipe(
      catchError(this.errorHandler)) ;  
  }

  public updateEmployees(id:number,employee:any):Observable<any>
  {
    return this.http.put<any>(this.url+"updateEmployee",employee).pipe(
      catchError(this.errorHandler));
  }

  public deleteEmployees(id:any):Observable<any>
  {
    return this.http.delete<any>(this.url+"deleteEmployee/"+id).pipe(
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
