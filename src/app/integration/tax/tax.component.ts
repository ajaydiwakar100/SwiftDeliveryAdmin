import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  submitted = false;
  errorMessage: String;
  freedistance: String
  per: any;
  na: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  distanceForm: FormGroup;

  ngOnInit() {

    this.distanceForm = this.fb.group({
   
      name: ['',Validators.required],
      percent: ['',[Validators.required,Validators.min(0),Validators.max(100)]]
    });

    this.integrationService.getTax().subscribe(
      response => {
        this.distanceForm = this.fb.group({
   
          name: [response.body['data'].name,Validators.required],
          percent: [response.body['data'].percentage,[Validators.required,Validators.min(0),Validators.max(100)]]
        });
        console.log(response.body['data'])
        // this.na = response.body['data'].name;
        // this.per = response.body['data'].percentage;
        // console.log(this.per)
        
      },
      error => {
        console.log(error);
      }
    );

  }

  
  onSubmit() {
    this.submitted = true;
console.log(this.distanceForm)
    if(this.distanceForm.invalid ){
      Swal({
        title: 'Error',
        text:   'Check the Tax Percent Given Should be within 100',
        type: 'warning',
        confirmButtonText: 'Ok',
      });
    }
else{
  const changeStatus = {taxId:1 , taxName:this.distanceForm.value.name , percentage: this.distanceForm.value.percent}
    this.integrationService.updateTax(changeStatus).subscribe(
      response => {
        console.log(changeStatus)
        if (response.body['error'] === 'false') {
          Swal({
            title: 'Success',
            text:   'Tax Details Updated',
            type: 'success',
            confirmButtonText: 'Ok',
          });
     
        }
        else{
          Swal({
            title: 'Error',
            text:   'Check the Tax Percent Given Should be within 100',
            type: 'warning',
            confirmButtonText: 'Ok',
          });
        }
       
      },
      error => {
        console.log(error);
      }
      
    );

  }
}
}




