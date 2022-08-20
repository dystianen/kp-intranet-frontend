import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import API from 'api/API';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  #sales_ : BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) { }

  get sales$():Observable<any[]>{
    return this.#sales_.asObservable();
  }

  getSales():Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.apiUrl}${API.REPORT_SALES}`).pipe(map((sales: any) => {
      if (sales.statusCode == 200) {
        this.#sales_.next(sales.data);
        return sales.data;
      }
      return [];
    }))
  }

}
