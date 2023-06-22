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
    const headers = new HttpHeaders().append('Content-Type', 'application/pdf').append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODc0NDI0MzMsImV4cCI6MTY4NzQ2NDAzMywicm9sZXMiOnsiUk9MRV9BRE1JTiI6dHJ1ZSwiMCI6WyJST0xFX0FETUlOIl19LCJlbWFpbCI6ImFkbWluQGFtamFkYWNhZGVteS5xYSIsImlkIjo2MTIsInNlbGVjdG9yIjoid3FqbjB4bmxzcWozMGREU1ZWRGYzMmExYzlkMDYiLCJmaXJzdE5hbWUiOiJQbGF0Zm9ybSIsImZpcnN0TmFtZUFyIjoiXHUwNjQ1XHUwNjJmXHUwNjRhXHUwNjMxIiwibGFzdE5hbWUiOiJBZG1pbiIsImxhc3ROYW1lQXIiOiJcdTA2MjdcdTA2NDRcdTA2NDZcdTA2MzhcdTA2MjdcdTA2NDUiLCJkYXRlT2ZCaXJ0aCI6bnVsbCwicGhvbmUiOiIwMDAwIiwiZ2VucmUiOiJtYWxlIiwiYWRkcmVzcyI6Ii0tLS0iLCJhYnNlbmNlcyI6e30sImF2YXRhciI6Imh0dHBzOlwvXC9kZXYucWJveC1hcGkuY29tXC91cGxvYWRzXC8yMDIzXC8wM1wvMDhcLzY0MDhkNGJhNGU5ZDIuanBlZyIsImNoaWxkcmVuIjp7fSwicGxhdGZvcm0iOlsiRURVQ0FUSU9OIl0sImF1dGhvcml0aWVzIjpudWxsfQ.Oc31It_qITlNcKfWcIxEXfQSv4RnS6djnboYmWksDRJf7iytDCy5w4faDCFuMyIBOCYHVMgubCPNx-nzKIXR1YOwhhX8MsCB1Dx_f-dTNJpSuzzGZvVxYKood1GE7A4NKqlm4SaP1K4b6yJK2Fr3KNx8l5d8KKDrrHHQ-p9xotef4ycBj3my0pSaRh1-bUvcqqZnedR4m7veeeISM8vR6JdKWsup57WNwfYFgXvrwAzt8VN8AKyDPH2Mja0WU0vRT94mInYC_wniiNM_KPPc6E59sFCV6gS9B5OZf6xwbV83GLpGuWuRHi8vdtsCz63A3xEBtKp8zcV2sFBNjEkbfd6F92IiaSW86U8-tZV39XMJMaLFl3sTpwxPQVPJ6n9aE4i89NeIHxKGWwgtckDTIR2kXh23i0E4qt4OUbL1odR1lTRtRbrHUbetDMyOB9ZW8Vbu7g3bEh3Y4-_4djU7eO_zCOYvNlw0VTUWuj-ARdfbOOYM0IUu5eJbxOGo_HKFPRb14LwdoIxKRLwztDlTVZrHer5pTmRPS9jQnpITGzxtdeqTQpcSdhEbRtvrWD_a0bAx-yUqgx-5V_AsgnJMBfwA8_rMO1KXnAFAug5663g-ktdQDgnR5By92CSk1axwufyTBMk1zaSuJcOugEKg1uxCJHdaAPcLNTfr2cHATNA');
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
