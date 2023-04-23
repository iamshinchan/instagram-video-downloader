import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstagramVideoDownloadService {

  constructor(private httpClient: HttpClient) { }


  fetchResult(query_hash, shortcode) {
    const url = `http://localhost:4200/graphql/query/`;

    return this.httpClient.get(url, { params: { query_hash, variables: shortcode } });
  }
  downloadFile(url: string, fileName, extension) {
    return new Promise((resolve, reject) => {
      let proxyUrl = `http://localhost:2547/proxy?fileName=${fileName}&url=`;
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
