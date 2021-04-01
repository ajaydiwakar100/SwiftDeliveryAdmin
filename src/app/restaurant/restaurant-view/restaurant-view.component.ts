import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-view',
  templateUrl: './restaurant-view.component.html',
  styleUrls: ['./restaurant-view.component.css']
})
export class RestaurantViewComponent implements OnInit {

  restaurantId: Number;
  restaurantName: String;
  email: String;
  outlets: any;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe( params => this.restaurantId = params.id );

    this.restaurantService.getRestaurantDetail(this.restaurantId).subscribe(
      response => {

        this.restaurantName = response.body['restaurantDetails']['restaurantName'];
        this.email = response.body['restaurantDetails']['email'];
        this.outlets = response.body['restaurantDetails']['outlets'];
        this.outlets.map((x) => {
          if(x.status === 0) {
            x.status = 'false';
          } else {
            x.status = 'true';
          }
        })
      },
      err => {
        console.log(err);
      }
    );

  }

}
