import { Component, OnInit } from '@angular/core';
import { OutletService } from 'src/app/outlet/outlet.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  deliveryType: any;
  restaurants: any;
  url: any;
  outletForm: FormGroup;
  typeid: any;
  image:File = null;
  constructor(   private outletService: OutletService, private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.outletService.getTypeList().subscribe(
      response => {
        
        this.deliveryType = response.body['data'];
      },
      err => {
        this.restaurants.navigateByUrl('/serverError');
      }
    );
    this.outletForm = this.fb.group({
      type: ['',Validators.required],
      name: ['',Validators.required],
      image: ['',Validators.required]
     
    });
    this.route.params.subscribe( params => this.typeid = params.id );
    var id ={ id: this.typeid}
    this.restaurantService.restaurantlist(id).subscribe(
      response => {
        console.log(response)
        this.outletForm = this.fb.group({
          type: [ response.body['data'][0].type,],
          name:  [ response.body['data'][0].name,],
          image: ['']
        })
        this.url = response.body['data'][0].image
        
       
   
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
    formData.append('id',this.typeid);
    formData.append('image', this.image);
    formData.append('type',outletData.type);
    formData.append('name',outletData.name);
   // formData.append('status',outletData.status)
    console.log(formData)
   
    //var type ={ key:this.keyname, type: this.typename, status: this.status, img: formData}
    this.restaurantService.restaurantEdit(formData).subscribe(
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
            this.router.navigateByUrl('/restaurantList');
          });
        }
  
      },
      error => {
        this.router.navigateByUrl('/serverError');
      }
    );
  }

}
