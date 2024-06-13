import { Component, inject, signal } from '@angular/core';
import { MedService } from './med.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';
import { MatGridListModule } from '@angular/material/grid-list';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatGridListModule, RouterLink],
  template: `
    <nav>
      <li><a [routerLink]="['', 'medications']">A</a></li>
      <li><a [routerLink]="['', 'medications']">A</a></li>

      <!-- fix route   -->
    </nav>
    <div>
      @for(med of $meds(); track med.name){
      <ul>
        <li>{{ med.name }}</li>
      </ul>
      }
    </div>
    <!-- <mat-grid-list cols="4" rowHeight="100px">
      @for(med of $meds(); track med.name){

      <mat-grid-tile
        [colspan]="med.name"
        [rowspan]="med.medication_class"
      
        >{{ med.reviews }}</mat-grid-tile
      >
      }
    </mat-grid-list> -->
  `,
  styles: `
  .navbar{},
  
  `,
})
export class ListComponent {
  readonly medService = inject(MedService);
  readonly #router = inject(Router);
  readonly #notifcation = inject(ToastrService);
  $meds = signal<Medication[]>([]);

  constructor() {
    this.medService.getMeds$().subscribe((response) => {
      this.$meds.set(response.data);
    });
  }
}
