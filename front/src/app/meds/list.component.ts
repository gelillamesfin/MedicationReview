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
      <button><a [routerLink]="['', 'medications','A']">A</a></button>
      <button><a [routerLink]="['', 'medications','A']">B</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">C</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">D</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">E</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">F</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">G</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">H</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">I</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">J</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">K</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">L</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">M</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">N</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">O</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">P</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">Q</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">R</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">S</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">T</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">U</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">V</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">W</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">X</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">Y</a></button>
      <button><a [routerLink]="['', 'medications', 'A']">Z</a></button>

      <!-- fix route   -->
    </nav>
    <div>
      @for(med of $meds(); track med._id){
      <ul>
        <li> <a [routerLink]="['','medications',med._id]"> {{ med.name }}</a>

        </li>
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
  nav{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:space-around;
    

  },

  
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
