import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AddRestaurant } from './add-restaurant.model';
import { RestaurantService } from '../restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  password: any;
  submitted = false;
  addRestaurant: AddRestaurant;
  errorMessage: String;
  url = '';

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  restaurantForm: FormGroup;

  ngOnInit() {

    this.restaurantForm = this.fb.group({
      restaurantName: ['', Validators.required],
      email: ['', Validators.required]
    });

  }

  generatePassword() {
    this.password = Math.random().toString(36).slice(-8);
  }
  onSubmit() {
    this.submitted = true;

    const restaurantData = this.restaurantForm.value;

    const formData = new FormData();
    formData.append('restaurantName', restaurantData.restaurantName);
    formData.append('email', restaurantData.email);

    this.spinner.show();

    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
    }, 5000);

    this.restaurantService.addRestaurant(formData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {
          this.errorMessage = response.body['errorMessage'];
          this.spinner.hide();
        } else {
          localStorage.setItem('success', 'Restaurant Successfully Added');
          this.router.navigateByUrl('/restaurantList');
        }

      },
      error => {
        console.log(error);
      }
    );
  }

}
