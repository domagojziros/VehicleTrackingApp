import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = environment.antiForgeryTokenUrl;

  private token: string | null = null;

  constructor(private http: HttpClient) {
  }

  refreshToken(): void {
    // Get the new token and cookies
    this.http.get<{token: string}>(this.apiUrl, { withCredentials: true }).subscribe({
      next: resp => {
        console.log("Received and remembered the token!");
        console.log(resp);
        this.token = <string>resp.token;
      },
      error: err => {
        console.error("Error while fetching Anti Forgery Token: ", err);
      }
    });
  }

  getToken(): string | null {
    return this.token;
  }

  setTokenNull() {
    this.token = null;
  }
}
