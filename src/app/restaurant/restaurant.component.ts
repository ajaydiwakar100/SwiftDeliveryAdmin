import { Component, OnInit } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { RestaurantList } from './restaurant-list.model';
import { Restaurant } from './restaurant.model';
import Swal from 'sweetalert2';
import { localisation } from '../../localisation/localisation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers: [ RestaurantService ],
})
export class RestaurantComponent implements OnInit {

  restaurantList: RestaurantList[];
  restaurant: Restaurant;
  pages: any;
  page = 1;
  status = 1;
  currentRate = 8;
  search_key: string;
  search_pages: number;
  success: String = null;
  public popoverTitle: String = 'Confirm Delete ?';
  public cancelClicked: Boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (localStorage.getItem('success')) {
      this.success = 'Success';

      localStorage.removeItem('success');
    }

    this.restaurantService.getRestaurantList(this.page).subscribe(
      response => {
        console.log(response);
        this.restaurantList = response;

      },
      err => {
        console.log(err);
      }
    );

    this.restaurantService.getRestaurant(this.page).subscribe(
      response => {

        this.restaurant = new Restaurant(response.body['error'], response.body['errorMessage'], response.body['totalPage']);

        this.pages = this.restaurant['totalPage'] * 10;
        console.log(response.body)
      },
      err => {
        console.log(err);
      }
    );
  }

  getRestaurant(page) {

    this.restaurantService.getRestaurantList(page).subscribe(
      response => {

        this.restaurantList = response;

      },
      err => {
        console.log(err);
      }
    );

    this.restaurantService.getRestaurant(page).subscribe(
      response => {

        this.restaurant = new Restaurant(response.body['error'], response.body['errorMessage'], response.body['totalPage']);

        this.pages = this.restaurant['totalPage'] * 10;
      },
      err => {
        console.log(err);
      }
    );
  }


  
  confirmClicked(id) {
    console.log(id);
    Swal({
      title: localisation.deleteTitle,
      text: "delete",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: localisation.deleteConfirmButton
    }).then((result) => {
      if (result.value) {
        this.restaurantService.deleteRestaurant(id).subscribe(
          res => {
          console.log(res);
          if (res['error'] === 'true' ) {

            Swal({
              title: 'Error',
              text: res['errorMessage'],
              type: 'error',
              confirmButtonText: 'Ok',
            });
  
  
          } else {
  
                     
            Swal({
              title: localisation.deletedText,
              text: localisation.deletedMessage,
              type: "success",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              this.getRestaurant(1);
            });
          }
 
          },
        );
      }
    });

  }
  Search(params) {
    this.search_key = params;
    if (!params) {
   this.status = 1;
   this.getRestaurant(this.page);
    } else {
   this.status = 2;
     var data = {
       key: this.search_key,
       pageNumber: 1
     };
     this.restaurantService.searchRestaurant(data).subscribe(
      res => {
        this.restaurantList = res.body['restaurantList'];
        this.search_pages = res.body['totalPage'] * 10;
    
      },
      err => {
        console.log(err);
      }
    );
    }
   }
   searchRestaurant(params) {
    this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: params
      };
      this.restaurantService.searchRestaurant(data).subscribe(
       res => {
         this.restaurantList = res.body['restaurantList'];
         this.search_pages = res.body['totalPage'] * 10;
       },
       err => {
         console.log(err);
       });
    } 
}
