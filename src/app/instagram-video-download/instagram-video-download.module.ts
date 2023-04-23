import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstagramVideoDownloadComponent } from './instagram-video-download.component';
import { HttpClientModule } from '@angular/common/http';
import { InstagramVideoDownloadService } from './instagram-video-download.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InstagramVideoDownloadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    InstagramVideoDownloadService
  ]
})
export class InstagramVideoDownloadModule { }
