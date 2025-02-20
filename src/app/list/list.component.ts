import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../model/Recipe';

@Component({
  selector: 'app-list',
  imports: [MatButtonModule, MatCardModule, CommonModule, MatTabsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  public cardIterations = [1, 2, 3];
  public firstTabList$ = Observable<any[]>;
  public secondTabList$ = Observable<any[]>;

  constructor(private readonly recipesService: RecipesService) {}

  ngOnInit(): void {
  }
}
