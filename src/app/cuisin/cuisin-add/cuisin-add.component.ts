import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { CuisinService } from '../cuisin.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuisin-add',
  templateUrl: './cuisin-add.component.html',
  styleUrls: ['./cuisin-add.component.css']
})
export class CuisinAddComponent implements OnInit {

  password: any;
  submitted = false;
  selectedImage: File = null;
  errorMessage: String;
  url = '';
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  formName: String = 'New Cuisine';
  cuisinId: any = null;

  constructor(
    private fb: FormBuilder,
    private cuisinService: CuisinService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  cuisinForm: FormGroup;

  ngOnInit() {

    this.route.params.subscribe(params => this.cuisinId = params.id);

    this.cuisinForm = this.fb.group({
      cuisinesName: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (this.cuisinId) {

      this.formName = 'Edit Cuisine';

      const cusineEdit = { cuisinesId: this.cuisinId };

      this.cuisinService.getcuisinEdit(cusineEdit).subscribe(
        response => {
          this.cuisinForm = new FormGroup({
            cuisinesName: new FormControl(response['CuisinesName']),
            status: new FormControl(response['status']),
          });

          if (Number(response['status']) === 1) {
            this.statusEnabled = true;
          } else {
            this.statusDisabled = true;
          }
        },
        err => {
          this.router.navigateByUrl('/serverError');
        }
      );
    }

  }

  onSubmit() {
    this.submitted = true;

    const cuisinData = this.cuisinForm.value;

    if (this.cuisinId) {
      this.editCuisin(cuisinData, this.cuisinId);

      return false;
    }

    this.cuisinService.cuisinAdd(cuisinData).subscribe(
      response => {

        if (response.body['error'] === 'true') {

          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });


        } else {

          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/cuisinList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editCuisin(cuisinEdit, id) {

    const cuisinData = { cuisinesId: id, cuisinesName: cuisinEdit.cuisinesName, status: cuisinEdit.status };

    this.cuisinService.cuisinEdit(cuisinData).subscribe(
      response => {

        if (response.body['error'] === 'true') {

          Swal({
            title: 'Error',
            text: response.body['errorMessage'],
            type: 'error',
            confirmButtonText: 'Ok',
          });


        } else {

          Swal({
            title: 'Success',
            text: response.body['errorMessage'],
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then(() => {
            this.router.navigateByUrl('/cuisinList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
