import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  deliveryCharges: String;
  distanceCharges: String;
  perKmCharges: String;
  user: any;
  other: boolean;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  chargesForm: FormGroup;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
    if( this.user == 1){
      this.other = true;
    }if(this.user == 0){
      this.other =false;
    }
    this.chargesForm = this.fb.group({
      deliverycharges: [''],
      distancecharges: [''],
      perkmcharges: ['']
    });

    this.integrationService.getChargesKey().subscribe(
      response => {
        var data = response.body['data'];
        data.map((x) => {
          if(x.FieldName === "DELIVERY_CHARGES") { 
            this.deliveryCharges = x.Value;
          } else if(x.FieldName === "DISTANCE_CHARGES") {
            this.distanceCharges = x.Value;
          } else if(x.FieldName === "PER_KM_CHARGES") {
            this.perKmCharges = x.Value;
          } else {
            
          }
        });

        this.chargesForm = new FormGroup({
          deliverycharges: new FormControl(this.deliveryCharges),
          distancecharges: new FormControl(this.distanceCharges),
          perkmcharges: new FormControl(this.perKmCharges)
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;

    const chargesApiData = this.chargesForm.value;

    this.integrationService.updateCharges(chargesApiData).subscribe(
      response => {
        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Charges value updated',
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




