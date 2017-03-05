import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';

import * as _ from "lodash";

import { PatientsComponent }       from './patients.component';
import { PatientsRoutingModule }   from './patients-routing.module';

@NgModule({
  imports: [
    PatientsRoutingModule,
    MaterialModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [PatientsComponent]
})
export class PatientsModule { }
