import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
url:string="http://localhost:8080/product/"
  constructor(private http:HttpClient) { }

  public getProducts():Observable<any>
  {
    return this.http.get<any>(this.url+"getallproducts");
  }

  public saveProducts(product:any):Observable<any>
  {
     return this.http.post<any>(this.url+"saveProduct",product).pipe(
      catchError(this.errorHandler)) ;  
  }

  public updateProducts(id:number,product:any):Observable<any>
  {
    return this.http.put<any>(this.url+"updateProduct",product).pipe(
      catchError(this.errorHandler));
  }

  public deleteProducts(id:any):Observable<any>
  {
    return this.http.delete<any>(this.url+"deleteProduct/"+id).pipe(
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
