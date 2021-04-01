import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IntegrationService } from '../integration.service';

@Component({
  selector: 'app-smtp-mail',
  templateUrl: './smtp-mail.component.html',
  styleUrls: ['./smtp-mail.component.css']
})
export class SmtpMailComponent implements OnInit {

  submitted = false;
  errorMessage: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService
  ) { }

  mailForm: FormGroup;

  ngOnInit() {

    this.mailForm = this.fb.group({
      hostName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      port: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.mailForm.invalid) {

      Swal({
        title: 'Error',
        text: 'All Fiels Required',
        type: 'error',
        confirmButtonText: 'Ok',
      });

      return;
    }

  }

}
