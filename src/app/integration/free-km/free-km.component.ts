import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-free-km',
  templateUrl: './free-km.component.html',
  styleUrls: ['./free-km.component.css']
})
export class FreeKmComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  freedistance: String
  user: number;
  other: boolean;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  distanceForm: FormGroup;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
    if( this.user == 1){
      this.other = true;
    }if(this.user == 0){
      this.other =false;
    }
    this.distanceForm = this.fb.group({
   
      freedistance: ['']
    });

    this.integrationService.getChargesKey().subscribe(
      response => {
        var data = response.body['data'];
        data.map((x) => {
          if(x.FieldName === "DISTANCE_THRESHOLD") { 
            this.freedistance = x.Value;
          }
        });

        this.distanceForm = new FormGroup({
          freedistance: new FormControl(this.freedistance)
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;

    const chargesApiData = this.distanceForm.value;

    this.integrationService.updateCharges(chargesApiData).subscribe(
      response => {
        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Distance value updated',
            type: 'success',
            confirmButtonText: 'Ok',
          });
        } else {
          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });
        }
      }
    );

  }

}




