import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MapsService {

  public lat: number = 13.05325201248103;
  public lng: number = 80.24680565118813;
  public zoom: number = 8;

  public newCoordinators = new Subject();

  public openWindow = new Subject();

  constructor() { }

}