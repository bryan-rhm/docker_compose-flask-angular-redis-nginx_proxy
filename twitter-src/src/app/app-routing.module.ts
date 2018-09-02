import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main/main.component';
import {TweetsComponent} from './tweets/tweets.component';
const routes: Routes = [
  {
    path:'tweets/:id',
    component:TweetsComponent
  },
  {
    path:'',
    component:TweetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }

