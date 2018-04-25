import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  links = [{
    link: 'https://angular.io/tutorial',
    name: 'Angular IO Tutorial',
    icon: 'school'
  }, {
    link: 'https://github.com/angular/angular-cli/wiki',
    name: 'Angular CLI Wiki',
    icon: 'book'
  }, {
    link: 'https://blog.angular.io/',
    name: 'Angular IO Blog',
    icon: 'info'
  }];
}
