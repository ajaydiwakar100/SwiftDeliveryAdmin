import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { BannerService } from '../banner.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { localisation } from '../../../localisation/localisation';

@Component({
  selector: 'app-banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.css']
})
export class BannerAddComponent implements OnInit {

  password: any;
  submitted = false;
  selectedImage: File = null;
  errorMessage: String;
  url: any = '';
  outlets: any;
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  bannerData: any;
  banner: String = 'New banner';

  constructor(
    private fb: FormBuilder,
    private bannerService: BannerService,
    private router: Router
  ) { }

  bannerForm: FormGroup;

  ngOnInit() {

    this.bannerForm = this.fb.group({
      outletId: ['', Validators.required],
      status: ['', Validators.required],
      bannerImage: ['', Validators.required]
    });

    this.bannerService.getOutlets().subscribe(
      response => {
        this.outlets = response.body['outlets'];
      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    const bannerId = localStorage.getItem('editbanner');

    if (bannerId) {
      this.banner = 'Edit banner';
      this.bannerService.getbannerEdit(bannerId).subscribe(
        response => {
          this.url = response['bannerImage'],
          this.bannerForm = new FormGroup({
            status: new FormControl(response['status']),
            outletId: new FormControl(response['outletId']),
            bannerImage: new FormControl('')
          });

          if (Number(response['status']) === 0) {
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

    if (this.bannerForm.invalid) {

      Swal({
        title: 'Error',
        text: localisation.errorMandatory,
        type: 'error',
        confirmButtonText: 'Ok',
      });

      return false;
    }

    const bannerData = this.bannerForm.value;

    const bannerId = localStorage.getItem('editbanner');

    const formData = new FormData();
    formData.append('bannerImage', this.selectedImage);
    formData.append('outletId', bannerData.outletId);
    formData.append('status', bannerData.status);

    if (bannerId) {

      if (this.selectedImage) {
        formData.append('bannerId', bannerId);
        this.editBanner(formData, bannerId);
      } else {
        this.editBanner(bannerData, bannerId);
      }

      return false;
    }

    this.bannerService.bannerAdd(formData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {

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
            this.router.navigateByUrl('/bannerList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editBanner(bannerEdit, id) {

    if (this.selectedImage) {
      this.bannerData = bannerEdit;
    } else {
      this.bannerData = {bannerId: id, bannerImage: bannerEdit.bannerImage, status: bannerEdit.status, outletId: bannerEdit.outletId};
    }

    this.bannerService.bannerEdit(this.bannerData).subscribe(
      response => {

        if (response.body['error'] === 'true' ) {

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
            this.router.navigateByUrl('/bannerList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

  handleFileInput(file: FileList) {

    this.selectedImage = file[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.selectedImage); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result;
    };

    }


}
