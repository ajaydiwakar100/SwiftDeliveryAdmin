import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { deliveryboyList } from '../detailviewout/detailviewout.model';
import { deliveryBoyService } from '../detailviewout/detailviewout.service';
@Component({
  selector: 'app-detailviewout',
  templateUrl: './detailviewout.component.html',
  styleUrls: ['./detailviewout.component.css']
})
export class DetailviewoutComponent implements OnInit {
  deliveryBoyList:deliveryboyList[];
  status =1
  paramsid: any;
  page: any = 1;
  pages: number;
  constructor(private deliveryBoyService: deliveryBoyService,private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.paramsid = params.id;});
     // console.log(this.paramsid)
      //this.paramsid = JSON.parse(this.paramsid);
      var data1 ={page:this.page, outletId: this.paramsid}
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
      var data1 ={page:page, outletId: this.paramsid}
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
