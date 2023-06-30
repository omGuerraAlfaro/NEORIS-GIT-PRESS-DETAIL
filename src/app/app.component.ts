import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

declare const Liferay: any;

@Component({
  selector: 'portlet-press-detail',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contentBlog: any[] = [];
  title = 'angular-portlet-blog-detail';
  private readonly LIFERAY_API = '/o/c/presses/';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: _ => { 
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
          this.http.get<any>(`${this.LIFERAY_API}${id}`, {
            headers: new HttpHeaders({
              'x-csrf-token': Liferay.authToken 
            })
          }).subscribe({
            next: (response: any) => {
              this.contentBlog = [response];
            },
            error: error => {
              console.log('HTTP Error:', error);
            }
          });
        } else {
          console.log('Blog ID not provided in the URL parameters.');
        }
      },
      error: error => {
        console.log('Route Params Error:', error);
      }
    });
  }
}
