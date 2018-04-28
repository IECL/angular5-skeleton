import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

import {Data} from './shared/data.model';
import {DataService} from './shared/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: []
})

export class DataComponent implements OnInit {
  data: Data[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData()
      .then(data => this.data = data)
      .catch(err => console.log('error while retrieving data', err));
  }

}
