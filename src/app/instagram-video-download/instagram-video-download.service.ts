import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramVideoDownloadService {

  constructor(private httpClient: HttpClient) { }


  fetchResult(query_hash, shortcode) {
    const url = environment.localhostProxy;

    return this.httpClient.get(url, { params: { query_hash, variables: shortcode } });
  }
  downloadFile(url: string, fileName, extension) {
    return new Promise((resolve, reject) => {
      let proxyUrl = environment.instagramProxyUrl + `?fileName=${fileName}&url=`;
      url = proxyUrl + encodeURIComponent(url);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', fileName + extension);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      resolve(true);
    })
  }
}
