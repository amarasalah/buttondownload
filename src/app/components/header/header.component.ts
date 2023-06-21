import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Click the Button to download pdf ';
  showAddMenu: boolean = false;
  imageUrl: any;

  constructor(
    private uiService: UiService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }
  toggleAddText(): void {
    const downloadUrl = 'https://dev.qbox-api.com/api/v1/behaviorreport/download/x8bz2jzpm8b9594ea61e1146?lang=ar';
    const headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');
    this.http.get(downloadUrl, { headers, responseType: 'blob', observe: 'response' })
      .subscribe((response: HttpResponse<Blob>) => {
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        const fileName = this.getFileNameFromContentDisposition(contentDispositionHeader);
        if (response.body) {
          const fileBlob = new Blob([response.body], { type: 'application/pdf' });
          saveAs(fileBlob, fileName);
        } else {
          console.error('Empty response body');
        }
      });
  }

  

  private getFileNameFromContentDisposition(contentDisposition: string | null): string {
    const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = regex.exec(contentDisposition || '');
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, '');
    }
    return 'download.pdf';
  }

  hasRoute(router: string): boolean {
    return this.router.url === router;
  }
}
