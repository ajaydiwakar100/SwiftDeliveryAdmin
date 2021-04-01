import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  widgetList: any;
  users: any;
  restaurants: any;
  outlets: any;
  revenue: any;
  outletsrevenue: any;
  providers: any;


  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit() {

    this.dashboardService.getWidgets().subscribe(
      response => {
         this.widgetList = response.body['widgets'][0];
        var currency = this.widgetList.currency;
         this.users = this.widgetList.users;
         this.restaurants = this.widgetList.restaurants;
         this.outlets = this.widgetList.outlets;
         this.revenue = currency + this.widgetList.revenue.adminrevenue;
         this.outletsrevenue = currency + this.widgetList.outletsrevenue;
         this.providers = currency + this.widgetList.Providersrevenue;

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
