import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
// import { localisation } from '../../../localisation/localisation';
import { ReportsService } from './reports.service';
import { registerOutsideClick } from 'ngx-bootstrap';
//import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  fromdate: any;
  outlets: any;
  provider: any;
  todate: any;
  selectedItems = [];
  pages: any;
  page = 1;
  success: String = null;
  itemsPerPage: Number = 10;
  pagePrevious = 1;

  fromdatedata: any = new Date();
  outletdata: any= null;
  restaurant: any;
  providerdata: any = null;
  restaurantdata: any = [];
  todatedata: any = new Date();
  orderdata: any = null;
  fromDayDate: any = new Date();
  toDayDate: any;

  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public minDate: Object = new Date(this.currentYear - 5, 12, 31);
  public maxDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  public tominDate: Object = new Date(this.currentYear - 5, 12, 31);
  public tomaxDate: Object = new Date(this.currentYear, this.currentMonth, this.currentDay);

  result: any;
  excelResult: any = [];
 // serviceSettings: IDropdownSettings;
  serviceList = [];
  orderdata1 = [];
  serviceList1 = [];
  orderlis = [];
  orderlis1: any[];
  b = [];
  providerdata1 = [];
  outletdata1 = [];
  restaurantdata1 = []
  serviceList2 = [];
  serviceSettings=  {
  };
  todatedata1: any;
  fromdatedata1: any;

  constructor(
    private reportService: ReportsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fromdatedata = ''
    this.todatedata =''
    this.reportService.reportsSendData(this.page).subscribe(
      response => {
        console.log(response)
        this.result = response.body['results'].data
        this.pages = response.body['results'].total;
      });
    
    // this.route.params.subscribe( params => this.orderId = params.id );
    this.serviceSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.orderlis = [{ "item_id": '1', "item_text": 'unassigned' }, { "item_id": '2', "item_text": 'accepted' }, { "item_id": '3', "item_text": 'rejected' }, { "item_id": '4', "itemName": 'pickedup' }, { "item_id": '5', "item_text": 'delivered' }, { "item_id": '6', "itemName": 'confirmed' }, { "item_id": '7', "item_text": 'assigned' }, { "item_id": '8', "item_text": 'reachOutlet' }, { "item_id": '9', "item_text": 'reachUserLocation' }]
    this.orderlis1 = this.orderlis;
    this.reportService.getReportData().subscribe(
      response => {
        console.log(sessionStorage.getItem('outletAccessToken'));
        console.log(response);
        const order = response.body['reports'];
        this.restaurant = order.restaurants;
        this.provider = order.provider;
        this.fromdate = order.ordersdate;
        this.todate = order.ordersdate;
        this.outlets = order.outlets;
        var statelist = [];
        order.outlets.filter((x) => {
          statelist.push({ "item_id": x['id'], "item_text": x['name'] });
        });
        this.serviceList = statelist;
        var statelist2 = [];
        order.restaurants.filter((x) => {
          statelist2.push({ "item_id": x['id'], "item_text": x['name'] });
        });
        this.serviceList2 = statelist2;
        //  statelist.array.forEach(element => {
        //    arr.push({""})
        //  });
       this.fromdatedata = null;
        
    this.todatedata = null;
    this.todatedata1 =null
    this.fromdatedata1 = null
        var statelist1 = [];
        console.log(order.provider)
        order.provider.filter((x) => {
          statelist1.push({ "item_id": x['id'], "item_text": x['name'] });
        });
        this.serviceList1 = statelist1;
        // console.log(this.serviceList);
         console.log(this.serviceList1);
        //          for(var i = 0, len = statelist.length; i < len; i++) {
        //           // console.log(this.serviceList[i].id);
        //           let id = statelist[i].id;
        //           this.a.push(id);
        //         }
        //         var NAMES = [];
        // for (let i = 1; i < 100; i++) {
        //     let newName = i
        //     NAMES.push(newName);
        // }
        //         console.log(NAMES);
        //         console.log(this.a);
        //  this.deliveryAddressType = order.deliveryAddressType;
        //  this.deliveryAddress = order.deliveryAddress;
        //  this.orderReferenceId = order.orderReferenceId;
        //  this.orderStatus = order.orderStatus;
        //  this.netAmount = order.netAmount;
        //  this.userMobileNumber = order.userMobileNumber;
        //  this.userEmail = order.userEmail;
        //  this.staffName = order.staffName;
        //  this.staffMobileNumber = order.staffMobileNumber;
        //  this.staffeEmail = order.staffeEmail;
        //  this.paymentname = order.paymentDetails['name'];
        //  this.dishes = order.dishes;
        //  this.userName = order.userName;
        //  this.billTotals = order.billTotals;

      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );

  this.filter1(1);

  }

  filter(page) {

    const senddata: { [key: string]: any } = {};
    
    // if (this.fromdatedata == undefined || this.fromdatedata == '') {
    //   this.fromdatedata = null;
    // }
    // if (this.todatedata == undefined || this.todatedata == '') {
    //   this.todatedata = null;
    // }
    if (this.outletdata == undefined || this.outletdata == '') {
      this.outletdata = null;
    }
    if (this.restaurantdata == undefined || this.restaurantdata == '') {
      this.restaurantdata = null;
    }
    if (this.providerdata == undefined || this.providerdata == '') {
      this.providerdata = null;
    }
    if (this.orderdata == undefined || this.orderdata == '') {
      this.orderdata = null;
    }

    // console.log(this.fromdatedata,this.todatedata,this.providerdata,this.outletdata);

    if (this.fromdatedata == null && this.todatedata == null && this.providerdata == null && this.outletdata == null) {
      // console.log("select any one select box");
    }

    if (this.fromdatedata != null && this.outletdata == null && this.providerdata == null && this.orderdata == null && this.todatedata == null) {
      senddata.type = 'one';
    } else if (this.fromdatedata == null && this.outletdata != null && this.providerdata == null && this.orderdata == null && this.todatedata == null) {
      senddata.type = 'two';

    } else if (this.fromdatedata == null && this.outletdata == null && this.providerdata != null && this.orderdata == null && this.todatedata == null) {
      senddata.type = 'three';

    } else if (this.fromdatedata == null && this.outletdata == null && this.providerdata == null && this.orderdata == null && this.todatedata != null) {
      senddata.type = 'four';

    }
    else if (this.fromdatedata == null && this.outletdata == null && this.providerdata == null && this.orderdata != null && this.todatedata == null) {
      senddata.type = 'five';
    }
    else if (this.fromdatedata == null && this.outletdata == null && this.providerdata == null && this.orderdata == null && this.todatedata == null && this.restaurantdata != null) {
      senddata.type = 'six';
    }
    else if (this.fromdatedata != null && this.outletdata != null) {
      if (this.fromdatedata != null && this.outletdata != null && this.providerdata != null && this.todatedata == null) {
        senddata.type = 'one&two&three';
      } else {
        if (this.fromdatedata != null && this.outletdata != null && this.providerdata != null && this.todatedata != null) {
          senddata.type = 'one&two&three&four';
        } else {
          if (this.fromdatedata != null && this.outletdata != null) {
            senddata.type = 'one&two';
          } else {
            senddata.type = 'one&two&four';
          }
        }
      }

    }
    else if (this.fromdatedata != null && this.outletdata != null && this.providerdata != null) {
      senddata.type = 'one&two&three';

    } else if (this.outletdata != null && this.providerdata != null && this.todatedata != null) {
      senddata.type = 'two&three&four';

    } else if (this.fromdatedata != null && this.providerdata != null && this.todatedata != null) {
      senddata.type = 'one&three&four';

    } else if (this.fromdatedata != null && this.outletdata != null && this.todatedata != null) {
      senddata.type = 'one&two&four';

    } else if (this.fromdatedata != null && this.outletdata != null && this.providerdata != null && this.todatedata != null) {
      senddata.type = 'one&two&three&four';

    }else if (this.fromdatedata != null && this.outletdata != null && this.providerdata != null && this.todatedata != null && this.orderdata != null) {
      senddata.type = 'one&two&three&four&five';

    } 
    else if (this.outletdata != null && this.providerdata != null) {
      senddata.type = 'two&three';

    } else if (this.providerdata != null && this.todatedata != null) {
      senddata.type = 'three&four';

    } else if (this.fromdatedata != null && this.providerdata != null) {
      senddata.type = 'one&three';

    } else if (this.fromdatedata != null && this.todatedata != null) {
      senddata.type = 'one&four';

    } else if (this.fromdatedata != null && this.orderdata != null) {
      senddata.type = 'one&five';

    } else if (this.outletdata != null && this.todatedata != null) {
      senddata.type = 'two&four';

    }
    else if (this.outletdata != null && this.orderdata != null) {
      senddata.type = 'two&five';

    }
    else if (this.outletdata != null && this.restaurantdata != null) {
      senddata.type = 'two&six';

    }
  if(this.providerdata != null && this.orderdata != null){
      senddata.type = 'three&five'
    }
   
    if (this.providerdata != null) {
      this.providerdata1 =[]
      for (var u = 0, len1 = this.providerdata.length; u < len1; u++) {
        let id1 = this.providerdata[u].item_id
        this.providerdata[u].item_id=== undefined ? "" : this.providerdata1.push(id1)
      }

    } 
    // var ress: any;
    // ress= this.restaurantdata
if (this.restaurantdata != null) {
  this.restaurantdata1 =[]
    for (var u = 0, len1 = this.restaurantdata.length; u < len1; u++) {
        let id1 = this.restaurantdata[u].item_id 
        this.restaurantdata[u].item_id=== undefined ? "" : this.restaurantdata1.push(id1)
        if (id1) {
            this.b = this.restaurantdata1
        }
    }
}
    //console.log(this.restaurantdata[0].item_id);
    var data = {RestaurantId: this.b }
      this.reportService.outlet(data).subscribe(
        response => {
          console.log(response)
          var statelist = [];
          response.body['listOrders'] === undefined ? "" : response.body['listOrders'].filter((x) => {
           statelist.push({ "item_id": x['id'], "item_text": x['name'] });
          });
          this.serviceList = statelist;
    });
    if (this.orderdata != null) {
    this.orderdata1= []
      for (var u = 0, len1 = this.orderdata.length; u < len1; u++) {
        let id1 = this.orderdata[u].item_text
        this.orderdata[u].item_id=== undefined ? "" :  this.orderdata1.push(id1)
      }

    }
   
    if (this.outletdata != null) {
      this.outletdata1 =[]
      for (var i = 0, len = this.outletdata.length; i < len; i++) {
        let id = this.outletdata[i].item_id
        this.outletdata[i].item_id=== undefined ? "" :  this.outletdata1.push(id)
      }

    }
    if(this.fromdatedata < this.todatedata){
      Swal({
        title: 'Error',
        text: 'To Date should be greater than From Date',
        type: 'error',
        confirmButtonText: 'Ok',
      });
     }
     else{

    this.fromdatedata =  this.formatDate(this.fromdatedata);
    this.fromdatedata = this.fromdatedata === "1970-01-01" ? null : this.fromdatedata
    this.fromdatedata1 =this.fromdatedata;
    this.todatedata = this.formatDate(this.todatedata);
    this.todatedata = this.todatedata === "1970-01-01" ? null : this.todatedata
    this.todatedata1 = this.todatedata
  
   
  
   // var theRemovedElement = this.outletdata.shift();
    
    // this.orderdata = this.orderdata.filter((el, i, a) => i === a.indexOf(el))
    // this.providerdata = this.providerdata.filter((el, i, a) => i === a.indexOf(el))
    // this.restaurantdata = this.restaurantdata.filter((el, i, a) => i === a.indexOf(el))
    // this.outletdata = this.outletdata.filter((el, i, a) => i === a.indexOf(el))
   // console.log(this.a);
    senddata.search = 1;
    senddata.fromData = this.fromdatedata ;
    senddata.outletData = this.outletdata1;
    senddata.restaurantData = this.restaurantdata1;
    senddata.providerData = this.providerdata1;
    senddata.orderData = this.orderdata1;
    senddata.toData = this.todatedata;
    //senddata.page = page;

    this.reportService.reportsSendData(senddata).subscribe(
      response => {

        this.excelResult = [];
       // console.log(response)
        this.result = response.body['results'].data;
        this.pages = response.body['results'].total;
        const totalData = response.body['results'].data;
        console.log(totalData);
        totalData.map((x, i) => {
          const sampData: { [key: string]: any } = {};
          sampData.Order = x.id;
          sampData.OrderId = x.orderReferenceId;
          sampData.OrderedAt = x.orderPlaceTime;
          sampData.Restaurant = x.restaurantname;
          sampData.User = x.username;
          if(x.PaymentTypeId == 10){
            sampData.paid_online ="Yes";
          }
          else{
            sampData.paid_online = "No"; 
          }
          if(x.PaymentTypeId == 11){
            sampData.paid_cash ="Yes";
          }
          else{
            sampData.paid_cash = "No"; 
          }
          sampData.subtoatl = "$" + x.netAmount;
          sampData.sale_tax	 = "$" + x.tax ;
          sampData.commission	 = "$" + x.adminServiceCharge;
          sampData.convenience_Fee = "$" + x.convenienceFee;
          sampData.promo = x.couponName;
          sampData.driver_tip = "$" + x.tip;
          sampData.delivery_fee	 = "$" + x.deliverycharge;
          sampData.mileage	 = "1234";
          sampData.earnings	 = "$" + x.providerEarnings ;
        
          this.excelResult.push(sampData);
          //console.log(x.orderStatus);

        });
       
      },
      err => {
      }
    );
  }
  }
  filter1(page){
    const senddata: { [key: string]: any } = {};
    senddata.search = 1;
    senddata.fromData = this.fromdatedata1 ;
    senddata.outletData = this.outletdata1;
    senddata.restaurantData = this.restaurantdata1;
    senddata.providerData = this.providerdata1;
    senddata.orderData = this.orderdata1;
    senddata.toData = this.todatedata1;
    senddata.page = page;

    this.reportService.reportsSendData(senddata).subscribe(
      response => {

        this.excelResult = [];
       // console.log(response)
        this.result = response.body['results'].data;
        this.pages = response.body['results'].total;
        const totalData = response.body['results'].data;
        totalData.map((x, i) => {
          const sampData: { [key: string]: any } = {};
          sampData.Order = x.id;
          sampData.OrderId = x.orderReferenceId;
          sampData.OrderedAt = x.orderPlaceTime;
          sampData.Restaurant = x.restaurantname;
          sampData.User = x.username;
          if(x.PaymentTypeId == 10){
            sampData.paid_online ="Yes";
          }
          else{
            sampData.paid_online = "No"; 
          }
          if(x.PaymentTypeId == 11){
            sampData.paid_cash ="Yes";
          }
          else{
            sampData.paid_cash = "No"; 
          }
          sampData.subtoatl = "$" + x.netAmount ;
          sampData.order_total = "1234";
          sampData.sale_tax	 = "$" + x.tax ;
          sampData.commission	 = "$" + x.adminServiceCharge ;
          sampData.convenience_Fee = "$" + x.convenienceFee ;
          sampData.promo = x.couponName;
          sampData.driver_tip = "$" + x.tip;
          sampData.delivery_fee	 = "$" + x.deliverycharge ;
          sampData.mileage	 = "1234";
          sampData.earnings	 = "$" + x.providerEarnings ;
          
          this.excelResult.push(sampData);
          //console.log(x.orderStatus);

        });
        // this.todatedata = this.formatDate1(this.todatedata);
        // this.fromdatedata =  this.formatDate1(this.fromdatedata);
      },
      err => {
        // this.router.navigateByUrl('/serverError');
      }
    );
  }

  exportAsXLSX(): void {
    if (this.excelResult.length === 0) {
      Swal({
        title: 'Error',
        text: 'Orders Data has empty',
        type: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      this.reportService.exportAsExcelFile(this.excelResult, 'reports');
    }
  }

  reset() {
   
    this.fromdatedata1 = null;
    
     this.todatedata1 = null;
     
    this.outletdata = null;
    this.orderdata = null;
    this.providerdata = null;
    this.fromdatedata = null;
    this.todatedata = null;
    this.restaurantdata = null;
    this.reportService.reportsSendData(this.page).subscribe(
      response => {
        this.result = response.body['results'].data
        this.pages = response.body['results'].total;
      });
      window.location.reload();
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    // this.todatedata=  [year, month, day].join('-')
    // console.log(this.todatedata)
    // this.fromdatedata = [year, month, day].join('-')
    // console.log(this.fromdatedata)
    return [year, month, day].join('-');
  }
  
  onItemSelect(item: any) {
    
    console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }
}
