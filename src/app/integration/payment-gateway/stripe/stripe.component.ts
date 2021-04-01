import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../../integration.service';
import { localisation } from '../../../../localisation/localisation';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  user: any;
  other: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  stripeForm: FormGroup;

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('is_edit'))
    if( this.user == 1){
      this.other = true;
    }if(this.user == 0){
      this.other =false;
    }
    this.stripeForm = this.fb.group({
      secretKey: ['', Validators.required],
      publishableKey: ['', Validators.required]
    });

    this.integrationService.getStripeKey().subscribe(
      response => {
        this.stripeForm = new FormGroup({
          secretKey: new FormControl(response.body['stripeData']['value']['secretKey']),
          publishableKey: new FormControl(response.body['stripeData']['value']['publishableKey']),
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;

    if (this.stripeForm.invalid) {

      this.errorMessage = localisation.errorMandatory;

      return;
    }

    const stripeData = this.stripeForm.value;

    this.integrationService.updateStripeKey(stripeData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Stripe Keys Saved',
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
