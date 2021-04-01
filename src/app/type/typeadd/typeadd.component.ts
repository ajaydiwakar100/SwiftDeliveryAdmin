import { Component, OnInit } from '@angular/core';
import { CuisinService } from '../type.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-typeadd',
  templateUrl: './typeadd.component.html',
  styleUrls: ['./typeadd.component.css']
})
export class TypeaddComponent implements OnInit {
keyname: any;
typename : any;
  status: any;
  url: any = '';
  image:File = null;
  image1: any;
  outletForm: FormGroup;
 
  constructor(  private cuisinService: CuisinService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.outletForm = this.fb.group({
      typename: ['',Validators.required],
      keyname: ['',Validators.required],
      status:['',Validators.required],
      img: ['', Validators.required],
     
    });
  }
  handleFileInput(file: FileList) {

    this.image = file[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.image); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = reader.result;
    };

    }
onSubmit(){
  const outletData = this.outletForm.value;
  const formData = new FormData();
  formData.append('img', this.image);
  formData.append('type',outletData.typename);
  formData.append('key',outletData.keyname);
  formData.append('status',outletData.status)
 
  //var type ={ key:this.keyname, type: this.typename, status: this.status, img: formData}
  this.cuisinService.typeAdd(formData).subscribe(
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
          this.router.navigateByUrl('/type');
        });
      }

    },
    error => {
      this.router.navigateByUrl('/serverError');
    }
  );
}
}
