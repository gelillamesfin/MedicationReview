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
      <button (click)="getMedsForLetter('A')">A</button>
      <button (click)="getMedsForLetter('B')">B</button>
      <button (click)="getMedsForLetter('C')">C</button>
      <button (click)="getMedsForLetter('D')">D</button>
      <button (click)="getMedsForLetter('E')">E</button>
      <button (click)="getMedsForLetter('F')">F</button>
      <button (click)="getMedsForLetter('G')">G</button>
      <button (click)="getMedsForLetter('H')">H</button>
      <button (click)="getMedsForLetter('I')">I</button>
      <button (click)="getMedsForLetter('J')">J</button>
      <button (click)="getMedsForLetter('K')">K</button>
      <button (click)="getMedsForLetter('L')">L</button>
      <button (click)="getMedsForLetter('M')">M</button>
      <button (click)="getMedsForLetter('N')">N</button>
      <button (click)="getMedsForLetter('O')">O</button>
      <button (click)="getMedsForLetter('P')">P</button>
      <button (click)="getMedsForLetter('Q')">Q</button>
      <button (click)="getMedsForLetter('R')">R</button>
      <button (click)="getMedsForLetter('S')">S</button>
      <button (click)="getMedsForLetter('T')">T</button>
      <button (click)="getMedsForLetter('U')">U</button>
      <button (click)="getMedsForLetter('V')">V</button>
      <button (click)="getMedsForLetter('W')">W</button>
      <button (click)="getMedsForLetter('X')">X</button>
      <button (click)="getMedsForLetter('Z')">Z</button>

      <!-- fix route   -->
    </nav>
    <div>
      @for(med of $meds(); track med._id){
      <ul>
        <li>
          <a [routerLink]="['', 'medications', med._id]"> {{ med.name }}</a>
        </li>
      </ul>
      }
  
    </div>
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

  $meds = signal<Medication[]>([]);
  $allMeds = signal<Medication[]>([]);
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

  // getAll$() {
  //   console.log('inside get all...');
  //   const alphabets = 'abcdefghigklmnopqrstuvwxyz'.split('');
 

  //   for (let letter of alphabets) {
  //     this.medService.getMeds$(letter).subscribe((response) => {
  //       if(response.success){

  //         // this.$allMeds.set(response.data)
  //         this.$allMeds.update((old)=>{
  //           return [...old,response.data]
  //         })
  //         console.log(response.data)
  //       }
  //       });
  //     }
  // }
// ngOnInit(){
// this.getAll$()

// }
}
