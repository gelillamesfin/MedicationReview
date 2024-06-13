import { Component, inject, signal } from '@angular/core';
import { MedService } from './med.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medication } from './medTypes';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: ` 
  @for(med of $meds(); track med.name){
<ul>
  <li>{{med.name}}</li>
</ul>
  }
  
  
  `,
  styles: ``,
})
export class ListComponent {
readonly medService=inject(MedService)
readonly #router=inject(Router);
readonly #notifcation=inject(ToastrService)
$meds=signal<Medication[]>([])

constructor(){
  this.medService.getMeds$().subscribe(response=>{
   this.$meds.set(response.data) 
  })
}
}
