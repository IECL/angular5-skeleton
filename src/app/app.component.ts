import {Component} from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ocrReading: string;
  loading: boolean;
  fileName;
  links: [{
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


  OnButtonClick() {
    // const myImage = 'assets/z te atau-3-feb-69.03.png';
    const myImage = 'assets/everest-24-jan-154.50.png';
    // const myImage='assets/spark-november-bill-106.png';
    // const myImage='assets/thai peninsula-2-nov-76.png';
    // const myImage = 'assets/parking-16-feb-14.00.png';

    // Step 1: Read files from folder
    // not able to complete as fs library is not recognised with typescript. Need to find solution
    /*   const testFolder = 'assets/';
       console.log(fs);
       fs.readdir(testFolder, (err, files) => {
         files.forEach(file => {
           console.log(file);
         });
       });*/

    // Step 2: Tessearct OCR
    Tesseract.recognize(myImage)
      .progress(message => {
        console.log(message);
        this.loading = true;
      })
      .catch(err => console.error(err))
      .then(result => {
        console.log(result);

        this.ocrReading = result.text;

        console.log(result.lines);
        const date = result.lines.filter(line => {
            return line.text.includes('/') ? line.text.split(' ').filter(x => x.includes('/')) : '';
          })
        ;
        const dateToAppend = date[0].text.split(' ').filter(x => x.includes('/'))[0].replace(/\//g, '_');

        this.fileName = result.lines[1].text + '_' + dateToAppend + '.jpg';
        this.loading = false;
      })
      .finally(resultOrError => console.log(resultOrError));

  }



}

