import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InstagramVideoDownloadService } from './instagram-video-download.service';

@Component({
  selector: 'app-instagram-video-download',
  templateUrl: './instagram-video-download.component.html',
  styleUrls: ['./instagram-video-download.component.css']
})
export class InstagramVideoDownloadComponent implements OnInit {
  url: string;
  loading = false
  count = 0;
  failedUrls = [];
  arr = [];
  constructor(
    private instagramVideoDownloadService: InstagramVideoDownloadService
  ) { }

  ngOnInit(): void {
  }
  async fetch(urls) {
    this.loading = true;
    this.arr = urls.split("\n");
    const getInstagramPostId = (url) => {
      if (!url.endsWith("/")) {
        url += "/";
      }
      const match = url.match(/\/p\/([a-zA-Z0-9_-]+)/);
      return match ? match[1] : '';
    };
    this.arr = this.arr.map(url => getInstagramPostId(url.replace(/\s/g, "")));
    this.count = 0;
    this.failedUrls = [];
    for (let i = 0; i < this.arr.length; i++) {
      this.loading = true;
      await this.download(this.arr[i]);
    }
  }
  async download(url) {
    return new Promise((resolve, reject) => {
      let query_hash = "2c4c2e343a8f64c625ba02b2aa12c7f8";

      this.instagramVideoDownloadService.fetchResult(query_hash, JSON.stringify({ shortcode: url })).pipe(
        catchError((error) => {
          this.failedUrls.push(url);
          this.loading = false;
          resolve(error);
          return of(null); // return an observable with a null value to continue the observable chain
        })
      ).subscribe(async (res: any) => {
        if (res && res.data && res.data.shortcode_media) {
          if (res.data.shortcode_media.video_url) {
            await this.instagramVideoDownloadService.downloadFile(res.data.shortcode_media.video_url, res.data.shortcode_media.owner.username, '.mp4');
            this.count++;
            this.loading = false;
            resolve(true);
          } else if (res.data.shortcode_media.is_video == false) {
            await this.instagramVideoDownloadService.downloadFile(res.data.shortcode_media.display_resources[res.data.shortcode_media.display_resources.length - 1].src, res.data.shortcode_media.owner.username, '.jpg');
            this.count++;
            this.loading = false;
            resolve(true);
          } else {
            this.failedUrls.push(url);
            resolve(true);
          }

        } else {
          resolve(true);
        }
      })

    })
  }
}
