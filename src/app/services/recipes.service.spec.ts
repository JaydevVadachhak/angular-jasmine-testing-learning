import { TestBed } from '@angular/core/testing';

import { RecipesService } from './recipes.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { Recipe } from '../model/Recipe';
import { HttpTestingController, provideHttpClientTesting, TestRequest } from '@angular/common/http/testing';
import { RECIPES } from '../data/recipes';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(RecipesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all recipes', () => {
    const dataLimit = RECIPES.length;
    service.getAllRecipes(dataLimit).subscribe((recipes) => {
      expect(recipes).toBeTruthy();
      expect(recipes.length).toBe(dataLimit);
      const recipe = recipes.find((r: Recipe) => r.id === 1);
      expect(recipe.name).toBe('Classic Margherita Pizza');
    });
    const req: TestRequest = httpMock.expectOne(req => req.url === 'https://dummyjson.com/recipes');
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('limit')).toEqual(dataLimit.toString());
    req.flush({
      total: 50,
      limit: dataLimit,
      skip: 0,
      recipes: RECIPES
    });
    httpMock.verify();
  });

  it('should return one recipe', () => {
    const id = 1;
    service.getRecipeById(id).subscribe((recipe: any) => {
      expect(recipe).toBeTruthy();
      expect(recipe.id).toBe(id);
      expect(recipe.name).toBe('Classic Margherita Pizza');
    });
    const req: TestRequest = httpMock.expectOne(`https://dummyjson.com/recipes/${id}`);
    expect(req.request.method).toEqual('GET');
    const recipe = RECIPES.find((r: Recipe) => r.id === 1);
    req.flush({...recipe});
    httpMock.verify();
  });

  it('should update one recipe', () => {
    const id = 1;
    const changes: Partial<Recipe> = {
      name: 'New Updated Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Instruction 1', 'Instruction 2']
    };
    service.updateRecipeById(id, changes).subscribe((recipe: any) => {
      expect(recipe).toBeTruthy();
      expect(recipe.id).toBe(id);
    });
    const req: TestRequest = httpMock.expectOne(`https://dummyjson.com/recipes/${id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({...RECIPES.find((r: Recipe) => r.id === id), ...changes});
    httpMock.verify();
  });

  it('should given error in case of update recipe fails', () => {
    const id = 1;
    const changes: Partial<Recipe> = {
      name: 'New Updated Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Instruction 1', 'Instruction 2']
    };
    service.updateRecipeById(id, changes).subscribe({
      next: () => fail('should not be called'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
      complete: () => fail('should not be called')
    });
    const req: TestRequest = httpMock.expectOne(`https://dummyjson.com/recipes/${id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush('Update Recipe Failed', {
      status: 500,
      statusText: 'Internal Server Error'
    });
    httpMock.verify();
  });
});
