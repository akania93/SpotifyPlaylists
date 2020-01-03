import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  apiUrl = 'https://api.spotify.com/v1/search?type=album&query=metallica';
  currentDate;

  // constructor(private http: Http, private auth: AuthService) {
  //   this.http.get('https://api.spotify.com/v1/search?type=album&query=metallica')
  //   .subscribe(response => {
  //     console.log(response.json());
  //   })
  // }

constructor(private http: Http, private auth: AuthService) {
  

  this.http.get(this.apiUrl).subscribe(
    // (value) => { console.log('app.component constructor received value: ', value.json()) },
    (value) => null,
    (error) => { 
      console.error('app.component Error!! > ', error)
      auth.authorize();
    }
    // ,
    // () => { console.log('End of values') }
  );
}

ngOnInit() {
  this.currentDate = new Date().getFullYear();
}

}
