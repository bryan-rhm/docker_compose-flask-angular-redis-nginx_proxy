import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tweet } from '../models/Tweet';
import { ResponseData } from '../models/ResponseData';
import { DataService } from '../data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from "@angular/router";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal/modal.component';
@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss']
})
export class TweetsComponent implements OnInit {
  title:'Tweets';
  tweets :Tweet[];
  user_id:String;

  constructor(private route:ActivatedRoute,private dataService : DataService,private router:Router, private modalService : NgbModal) {
    this.route.params.subscribe(params=>this.user_id=params.id);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    if(this.user_id){
      this.dataService
      .getTweetsByUser(this.user_id)
      .subscribe((data:Tweet[])=>{
        this.tweets=data;
      },error =>{
        console.log(error);
      });

    }else{
      this.dataService
      .getTweets()
      .subscribe((data:Tweet[])=>{
        this.tweets=data;
      },error =>{
        console.log(error);
      });
    }
  }

  onSubmit(f) {
    if(f.valid){
      this.newTweet(f.value.user,f.value.message);
      f.resetForm();
    }else{
      this.openModal("ERROR","Please enter the message and your username");
    }
  }
  newTweet(user:String,message:String){ 
    let data = {
        user:user,
        message:message
    }
    this.dataService.setTweet(data).subscribe((response:ResponseData)=>{
      let title ='';
      if (response.status =='ok'){
        title='Twitter'
        let tweet={} as Tweet;
        tweet.message=message;
        tweet.user=user;
        this.tweets.push(tweet);
      }else{
        title ='ERROR'
      }
        this.openModal(title,response.message);
    },error =>{
      this.openModal("ERROR","Error comunicating with the server, try again!");
    });

  }

  openModal(title:String,message:String){
    const modal =this.modalService.open(ModalComponent);
    modal.componentInstance.title=title;
    modal.componentInstance.message=message;
  }


}
