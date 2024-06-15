import { Component, inject, signal } from '@angular/core';
import { MedService } from './med.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgStyle } from '@angular/common';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatGridListModule, RouterLink,NgStyle],
  template: `
    <nav>
      <button (click)="getMedsForLetter('A')">A</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('B')">B</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('C')">C</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('D')">D</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('E')">E</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('F')">F</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('G')">G</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('H')">H</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('I')">I</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('J')">J</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('K')">K</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('L')">L</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('M')">M</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('N')">N</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('O')">O</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('P')">P</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('Q')">Q</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('R')">R</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('S')">S</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('T')">T</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('U')">U</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('V')">V</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('W')">W</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('X')">X</button>&nbsp;&nbsp;
      <button (click)="getMedsForLetter('Z')">Z</button>&nbsp;&nbsp;

      <!-- fix route   -->
    </nav>
    <div>
      <h2 [ngStyle]="{'margin-left':'30px'}">Most Common Drugs</h2>
      @for(med of $meds(); track med._id){
      <div class="meds">
        <a [routerLink]="['', 'medications', med._id]"> {{ med.name }}</a>
      </div>
      }
    </div>
  `,
  styles: `

  .meds{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    // justify-content:center;
    margin-top:2px;
    margin-left:30px
    
  }
  nav{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    margin-top:20px
    
    },

  
  `,
})
export class ListComponent {
  readonly medService = inject(MedService);

  $meds = signal<Medication[]>([]);

  constructor() {
    this.medService.getMeds$().subscribe((response) => {
      this.$meds.set(response.data);
    });
  }
  getMedsForLetter(letter: string) {
    this.medService.getMeds$(letter).subscribe((response) => {
      this.$meds.set(response.data);
    });
  }


}
