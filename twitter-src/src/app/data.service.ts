import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //url='https://jsonplaceholder.typicode.com';
  url='http://rest.twitter.com/api/v1';

  constructor(private http: HttpClient) { }

  setTweet(data){
    return this.http.post(this.url+"/tweet",data);
  }
  getTweets(){
    return this.http.get(this.url+'/tweet');
  }
  getTweetsByUser(user:String){
    return this.http.get(this.url+'/tweet/'+user);
  }
}
