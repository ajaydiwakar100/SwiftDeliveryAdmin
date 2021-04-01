import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');

  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.add('theme-orange');
  }

}
