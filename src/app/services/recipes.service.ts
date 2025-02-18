import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from '../model/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getAllRecipes(limit: number) {
    return this.http.get('https://dummyjson.com/recipes', {
      params: {
        limit
      }
    }).pipe(
      map((response: any) => response['recipes'])
    );
  }

  getRecipeById(id: number) {
    return this.http.get(`https://dummyjson.com/recipes/${id}`);
  }

  updateRecipeById(id: number, recipe: Partial<Recipe>) {
    return this.http.put(`https://dummyjson.com/recipes/${id}`, recipe);
  }
}
