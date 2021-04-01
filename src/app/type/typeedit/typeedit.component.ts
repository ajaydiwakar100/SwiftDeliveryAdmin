import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuisinService } from '../type.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-typeedit',
  templateUrl: './typeedit.component.html',
  styleUrls: ['./typeedit.component.css']
})
export class TypeeditComponent implements OnInit {

  keyname: any;
  typename : any;
    status: any;
    url: any = '';
    image:File = null;

    outletForm: FormGroup;
  routeSub: any;
  typeid: any;
  statusEnabled: boolean;
    
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
      this.route.params.subscribe( params => this.typeid = params.id );
      var id ={ id: this.typeid}
      this.cuisinService.getTypeId(id).subscribe(
        response => {
          console.log(response.body['data'])
          this.outletForm = this.fb.group({
            typename: [ response.body['data'][0].type,],
            keyname:  [ response.body['data'][0].key,],
           status: [ response.body['data'][0].status,],
            img: ['']
          })
          this.url = response.body['data'][0].img
          if (response.body['data'][0].status === 1) {
            this.statusEnabled = true;
          }
          if (response.body['data'][0].status === 0) {
            this.statusEnabled = false;
          }
         
     
    });
    this.status =1
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
    formData.append('id',this.typeid);
    formData.append('img', this.image);
    formData.append('type',outletData.typename);
    formData.append('key',outletData.keyname);
    formData.append('status',outletData.status)
    
   
    //var type ={ key:this.keyname, type: this.typename, status: this.status, img: formData}
    this.cuisinService.typeEdit(formData).subscribe(
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
