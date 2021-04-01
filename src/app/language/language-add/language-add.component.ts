import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { LanguageService } from '../language.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-language-add',
  templateUrl: './language-add.component.html',
  styleUrls: ['./language-add.component.css']
})
export class LanguageAddComponent implements OnInit {

  password: any;
  submitted = false;
  selectedImage: File = null;
  errorMessage: String;
  url = '';
  statusEnabled: Boolean = false;
  statusDisabled: Boolean = false;
  formName: String = 'New language';
  languageId: any = null;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  languageForm: FormGroup;

  ngOnInit() { 

    this.route.params.subscribe( params => this.languageId = params.id );

    this.languageForm = this.fb.group({
      lang: ['', Validators.required],
      iso: [''],
      status: ['', Validators.required]
    });

    if (this.languageId) {

      this.formName = 'Edit language';

      const cusineEdit = { languageCode: this.languageId };

      this.languageService.getlanguageEdit(cusineEdit).subscribe(
        response => {
            this.languageForm = new FormGroup({
              lang: new FormControl(response['lang']),
              iso: new FormControl(response['iso']),
              status: new FormControl(response['status']),
            });

            if (response['status'] === 1) {
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

    const languageData = this.languageForm.value;

    if (this.languageId) {
      this.editlanguage(languageData, this.languageId);

      return false;
    }

    this.languageService.languageAdd(languageData).subscribe(
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
            this.router.navigateByUrl('/languageList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

  editlanguage(languageEdit, id) {

    const languageData = {languageesId: id, languageesName: languageEdit.languageesName, status: languageEdit.status};

    this.languageService.languageEdit(languageData).subscribe(
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
            this.router.navigateByUrl('/languageList');
          });
        }

      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
