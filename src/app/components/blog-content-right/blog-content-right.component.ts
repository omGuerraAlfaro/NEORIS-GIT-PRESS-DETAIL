import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare const Liferay: any;
@Component({
  selector: 'app-blog-content-right',
  templateUrl: './blog-content-right.component.html',
  styleUrls: ['./blog-content-right.component.css']
})
export class BlogContentRightComponent implements OnInit {
  private readonly LIFERAY_API = '/o/c/presses/';
  token?: string;
  contentMostView: any[] = [];
  contentFeature: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.token = Liferay.authToken;
    if (!this.token) {
      console.error('Token is not defined');
      return;
    }

    this.http.get<any>(this.LIFERAY_API, {
      headers: new HttpHeaders({
        'x-csrf-token': this.token
      })
    }).subscribe({
      next: (data: any) => {
        const sortedBlogs = data.items.sort((a: any, b: any) => b.viewCount - a.viewCount);
        this.contentMostView = sortedBlogs.slice(0, 4);

        // Filter out the featured blogs
        this.contentFeature = data.items.filter((blog: any) => blog.destacado.key === 'si');
      },
      error: (err) => { console.error(err); }
    });
  }

  goToBlogDetail(blog: any) {
    const blogId = blog.id;
    window.location.href = `/web/neoris/press-detail?id=${blogId}`;
  }

}
