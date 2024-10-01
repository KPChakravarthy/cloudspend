import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { CloudSpendData } from './components/dashboard/types';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private apiUrl = 'https://raw.githubusercontent.com/KPChakravarthy/cloudspend/refs/heads/main/src/mockData.json';

  constructor(private http: HttpClient) { }

  getMockData(): Observable<CloudSpendData> {
    return this.http.get<CloudSpendData>(this.apiUrl);
  }
}