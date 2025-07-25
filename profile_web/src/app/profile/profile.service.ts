import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.development';





@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _httpClient:HttpClient) { }
  // connect with the apiUrl in the environmennts.development.ts

  private baseUrl:string="/api/profiles"

// create the api for get the profile data
  getProfiles():Observable<Profile[]>{
    return this._httpClient.get<Profile[]>(`${environment.apiUrl}${this.baseUrl}`);
  }

// create the api for add profile records
  createProfiles(data:Profile){
    return this._httpClient.post<Profile>(`${environment.apiUrl}${this.baseUrl}/`,data);
}
// create the api for update the profile
  updateProfiles(modifiedData:Profile){
     return this._httpClient.put<Profile>(`${environment.apiUrl}${this.baseUrl}/${modifiedData.id}/`,modifiedData);
   
}
// create the api for delete the profile
deleteProfiles(id:Number){
  return this._httpClient.delete<Profile>(`${environment.apiUrl}${this.baseUrl}/${id}/`);

}

}