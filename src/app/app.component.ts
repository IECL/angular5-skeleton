import {Component} from '@angular/core';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';

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

    // Step 3: Once verified - email to given emailaddress for xero
  }

  GetTransactions(){

  }


  function getXeroClient(session) {
    let config = {};
    try {
      config = require('./config/config.json');
    } catch (ex) {
      if (process && process.env && process.env.APPTYPE) {
        //no config file found, so check the process.env.
        config.appType = process.env.appType.toLowerCase();
        config.callbackUrl = process.env.callbackUrl.toLowerCase();
        config.consumerKey = process.env.consumerKey;
        config.consumerSecret = process.env.consumerSecret;
      } else {
        throw "Config not found";
      }
    }

    return new XeroClient(config, session);
  }

  async function authorizeRedirect(req, res, returnTo) {
    var xeroClient = getXeroClient(req.session);
    let requestToken = await xeroClient.oauth1Client.getRequestToken();

    var authoriseUrl = xeroClient.oauth1Client.buildAuthoriseUrl(requestToken);
    req.session.oauthRequestToken = requestToken;
    req.session.returnTo = returnTo;
    res.redirect(authoriseUrl);
  }

  function authorizedOperation(req, res, returnTo, callback) {
    if (req.session.accessToken) {
      callback(getXeroClient(req.session.accessToken));
    } else {
      authorizeRedirect(req, res, returnTo);
    }
  }

  function handleErr(err, req, res, returnTo) {
    console.log(err);
    if (err.data && err.data.oauth_problem && err.data.oauth_problem == "token_rejected") {
      authorizeRedirect(req, res, returnTo);
    } else {
      res.redirect('error', err);
    }
  }
/*
  app.get('/error', function(req, res) {
    console.log(req.query.error);
    res.render('index', { error: req.query.error });
  })

// Home Page
  app.get('/', function(req, res) {
    res.render('index', {
      active: {
        overview: true
      }
    });
  });

// Redirected from xero with oauth results
  app.get('/access', async function(req, res) {
    var xeroClient = getXeroClient();

    let savedRequestToken = req.session.oauthRequestToken;
    let oauth_verifier = req.query.oauth_verifier;
    let accessToken = await xeroClient.oauth1Client.swapRequestTokenforAccessToken(savedRequestToken, oauth_verifier);

    req.session.accessToken = accessToken;

    var returnTo = req.session.returnTo;
    res.redirect(returnTo || '/');
  });*/


}

