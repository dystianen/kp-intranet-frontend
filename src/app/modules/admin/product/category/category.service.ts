import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Category } from './category.types';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _category: BehaviorSubject<Category | null> = new BehaviorSubject(null);
  private _categories: BehaviorSubject<Category[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }

  get category$() {
    return this._category.asObservable();
  }

  get categories$() {
    return this._categories.asObservable();
  }

  getCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${environment.apiUrl}/admin/product-category`).pipe(map((response: any) => {
      if (response.statusCode == 200) {
        this._categories.next(response.data);
        return response.data;
      }
      return []
    }))
  }

  getCategory(id: number): Observable<Category> {
    return this._httpClient.get<Category>(`${environment.apiUrl}/admin/product-category/${id}`).pipe(map((response: any) => {
      if (response.statusCode == 200) {
        this._category.next(response.data);
        return response.data;
      }
      return []
    }))
  }

  /**
     * Create Product
     * @returns 
     */
  createCategory(dataCategory: any): Observable<Category> {
    return this.categories$.pipe(
      take(1),
      switchMap(categories => this._httpClient.post<Category>(`${environment.apiUrl}/admin/product-category`, dataCategory)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
        .pipe(
          map((newCategory) => {
            // Update the categories with the new product
            // this._categories.next([newCategory.data, ...categories]);
            // Return the new product
            return newCategory;
          })
        ))
    );
  }

  /**
   * update supplier
   * @param id 
   * @param dataCategory 
   * @returns 
   */
  updateCategory(id: number, dataCategory: any): Observable<Category> {
    return this.categories$.pipe(
      take(1),
      switchMap(categories => this._httpClient.patch<Category>(`${environment.apiUrl}/admin/product-category/${id}`, dataCategory)
        .pipe(map((response: any) => {
          if (response.statusCode == 200) {
            return response.data;
          }
          return [];
        }))
      )
    )
  }

}
