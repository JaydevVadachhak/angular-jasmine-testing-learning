import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RecipesService } from '../services/recipes.service';
import { RECIPES } from '../data/recipes';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debugElement: DebugElement;
  let recipesService: any;
  
  beforeEach(async () => {
    const recipesServiceSpy = jasmine.createSpyObj('RecipesService', ['getAllRecipes']);
    await TestBed.configureTestingModule({
      imports: [ListComponent, NoopAnimationsModule],
      providers: [{ provide: RecipesService, useValue: recipesServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    recipesService = TestBed.inject(RecipesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card', () => {
    component.cardIterations = [1,2,3];
    const card = debugElement.queryAll(By.css('.example-card'));
    expect(card).toBeTruthy();
    expect(card.length).toBe(3);
  });

  it('should display the tab 1', () => {
    recipesService.getAllRecipes.and.returnValue(RECIPES);
    component.cardIterations = [1,2,3];
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css('.mdc-tab'));
    expect(tabs.length).toBe(1);
  });

  it('should display both tabs', () => {
    recipesService.getAllRecipes.and.returnValue(RECIPES);
    component.cardIterations = [1,2,3,4];
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css('.mdc-tab'));
    expect(tabs.length).toBe(2);
  });

  it('should display the tab 2', () => {
    recipesService.getAllRecipes.and.returnValue(RECIPES);
    component.cardIterations = [1,2,3,4];
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css('.mdc-tab')); 
    tabs[1].nativeElement.click();
    expect(tabs[1].nativeElement.textContent).toBe('Second');
  });
});
