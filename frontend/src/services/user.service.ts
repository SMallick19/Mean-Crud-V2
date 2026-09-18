import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  // Get data from the API
  getUserData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/get-users').pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError) // Error handling
    );
  }

  addUserData(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/add-users', data).pipe(
      map((response) => {
        return response; // Transform or manipulate response if needed
      }),
      catchError(this.handleError) // Error handling
    );
  }

  deleteUserData(id: any): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/delete-user' + '/' +id).pipe(
      map((response) => {
        return response; // Transform or manipulate response if needed
      }),
      catchError(this.handleError) // Error handling
    );
  }

  getSingleUserData(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/get-user' + '/' +id).pipe(
      map((response) => {
        return response; // Transform or manipulate response if needed
      }),
      catchError(this.handleError) // Error handling
    );
  }

  editSingleUserData(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/update-user' + '/' +id, data).pipe(
      map((response) => {
        return response; // Transform or manipulate response if needed
      }),
      catchError(this.handleError) // Error handling
    );
  }


  // Error handling function
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error.message);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
