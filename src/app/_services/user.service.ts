import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/User';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = environment.apiUrl;
  baseUrl2 = environment.api2Url;
  employee: any;
  constructor(private HttpClient: HttpClient) { }

  getUsers(pageNumber?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams()
    if(pageNumber!=null && itemsPerPage!=null)
    {
      params =  params.append('pageNumber', pageNumber);
      params = params.append('pageSize',itemsPerPage);
    }

    if(userParams !=null)
    {
      params = params.append('gender', userParams.gender);
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
    }

    return this.HttpClient.get<User[]>(this.baseUrl + 'users', {observe: 'response', params}).pipe(
      map(responce=> {
        paginatedResult.result = responce.body;
        if(responce.headers.get('paginationheaders')!=null){
          paginatedResult.pagination = JSON.parse(responce.headers.get('paginationheaders'));
        }
        return paginatedResult;
      })
    );
  }
  
  getUser(id): Observable<User> {
    return this.HttpClient.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User) {
     return this.HttpClient.put(this.baseUrl + 'users/'+ id, user);
  }

  gg(): Observable<any[]>{
    return this.HttpClient.get<any[]>(this.baseUrl2);
  }
}
