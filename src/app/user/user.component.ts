import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';
import { localisation } from '../../localisation/localisation';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ UserService ],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class UserComponent implements OnInit {

  users: any;
  pages: number;
  page = 1;
  status = 1;
  search_key: string;
  search_pages: number;
  public popoverTitle: String = 'Confirm Delete ?';
  public cancelClicked: Boolean = false;
  success: String;
 
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.userService.getUsers(this.page).subscribe(
      res => {
       // console.log(res);
        this.users = res.body['users'];
        this.pages = res.body['pages'] * 10;
        
      },
      err => {
        console.log(err);
      }
    );

  }

  getUsers(page) {

    this.userService.getUsers(page).subscribe(
      
      res => {
        console.log(res);
        this.users = res.body['users'];
        this.pages = res.body['pages'] * 10;

      },
      err => {
        console.log(err);
      }
    );

  }

  confirmClicked(id) {
   // console.log(id);
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
        this.userService.deleteUser(id).subscribe(
          res => {
            this.getUsers(1); 
           console.log(res);
           Swal({
                title: localisation.deletedText,
                text: localisation.deletedMessage,
                type: "success",
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                //this.router.navigateByUrl('/userList')
              });
          },
        );
      }
    });

  }

  Search(params) {
    this.search_key = params;
    if (!params) {
      this.status = 1;
      this.getUsers(this.page);
    } 
    else {
      this.status = 2;
        var data = {
          key: this.search_key,
          pageNumber: 1
        };
        this.userService.searchUsers(data).subscribe(
        res => {
          this.users = res.body['users'];    
          this.search_pages = res.body['pages'] * 10;
      
        },
        err => {
          console.log(err);
        }
      );
    }
  }  

  
  searchUsers(params) {
    this.status = 2;
      var data = {
        key: this.search_key,
        pageNumber: params
      };
      this.userService.searchUsers(data).subscribe(
      res => {
        this.users = res.body['users'];
        console.log(res.body['users']);
        
        this.search_pages = res.body['pages'] * 10;
      },
      err => {
        console.log(err);
      });
  }
}


