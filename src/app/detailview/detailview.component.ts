import { Component, OnInit } from '@angular/core';
import { deliveryBoyService}from '../detailview/detailview.service';
import { deliveryboyList } from './detailview.model';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.css']
})
export class DetailviewComponent implements OnInit {
  deliveryBoyList: deliveryboyList[];
  pages: any;
  page = 1;
  paramsid: any;
 status =1 ;
  constructor(private deliveryBoyService: deliveryBoyService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.paramsid = params.id;});
      this.paramsid = JSON.parse(this.paramsid);
      var data1 ={page:this.page, deliveryStaffId: this.paramsid}
     // var data ={ page: this.page, delivery:}
    this.deliveryBoyService.getdeliveryBoyPage(data1).subscribe(
      response => {
       
        this.deliveryBoyList = response.body['listPayStaffDetails'].data
         this.pages = response.body['listPayStaffDetails'].last_page * 10;
      },
      err => {
      //  this.router.navigateByUrl('/serverError');
      }
    );

  }
  getdeliveryBoy(page) {
    this.route.params.subscribe(params => {
      this.paramsid = params.id;});
      var data1 ={page:page, deliveryStaffId: this.paramsid}
     // var data ={ page: this.page, delivery:}
    this.deliveryBoyService.getdeliveryBoyPage(data1).subscribe(
      response => {

         this.deliveryBoyList = response.body['listPayStaffDetails'].data
        this.pages = response.body['listPayStaffDetails'].last_page * 10;
      },
      err => {
        //this.router.navigateByUrl('/serverError');
      }
    );

  }
}
