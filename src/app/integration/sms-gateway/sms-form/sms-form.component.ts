import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../../integration.service';

@Component({
  selector: 'app-sms-form',
  templateUrl: './sms-form.component.html',
  styleUrls: ['./sms-form.component.css']
})
export class SmsFormComponent implements OnInit {

  submitted = false;
  errorMessage: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  smsForm: FormGroup;

  ngOnInit() {

    this.smsForm = this.fb.group({
      secretKey: ['', Validators.required]
    });

    this.integrationService.getTwilioKey().subscribe(
      response => {
        this.smsForm = new FormGroup({
          secretKey: new FormControl(response.body['twilioData']['value']),
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.smsForm.invalid) {

      this.errorMessage = 'All Fields are Mandatory';

      return;
    }

    const twilioData = this.smsForm.value;

    this.integrationService.updateTwilioKey(twilioData).subscribe(
      response => {

        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text: 'Twilio Keys Saved',
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
