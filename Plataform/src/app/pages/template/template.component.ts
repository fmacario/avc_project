import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

export class Patient {
  fname : string;
  lname : string;
  adress: string;
  city: string;
  state: string;
  postal: string;
}

const queryObservable = af.database.list('/items', {
  query: {
    orderByChild: 'size',
    equalTo: 'large' 
  }
});

@Component({
  selector: 'seed-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})

export class PatientsComponent implements OnInit {
  patients: FirebaseListObservable<any>;
  selectedPatient: Patient;
  patient: Patient;
  key: string;

  constructor(af: AngularFire) {
    this.patients = af.database.list('/patients');
    this.selectedPatient = new Patient();
    this.patient = new Patient();
  }

  submit() {
    if(this.patient.fname === this.selectedPatient.fname){
       this.patients.update(this.key, this.selectedPatient);
    }
    else{
      this.patients.push(this.selectedPatient);
    }
  }

  deleteItem(key: string) {    
    this.patients.remove(key); 
  }
  deleteEverything() {
    this.patients.remove();
  }

  onSelect(patient: Patient, key: string): void {
    this.patient = JSON.parse(JSON.stringify(patient));
    this.key = key;
    this.selectedPatient = JSON.parse(JSON.stringify(patient));;
  }

  ngOnInit(): void {
    console.debug('patients');
  }

}