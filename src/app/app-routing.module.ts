import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WelcomePageComponent } from './welcome-page/welcomePage.component';
import {RegisterPageComponent} from "./register-page/registerPage.component";
import {UserPageComponent} from "./user-page/userPage.component";
import {FriendsPageComponent} from "./friends-page/friendsPage.component";
import {FriendsNewsPageComponent} from "./friends-news-page/friendsNewsPage.component";
import {ChatsComponent} from "./chats/chats.component";
import {MessageComponent} from "./message/message.component";
import {AuthGuard} from "./guard/AuthGuard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: WelcomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard]},
  { path: 'friends', component: FriendsPageComponent, canActivate: [AuthGuard]},
  { path: 'news', component: FriendsNewsPageComponent, canActivate: [AuthGuard]},
  { path: 'chats', component: ChatsComponent, canActivate: [AuthGuard]},
  { path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), HttpClientModule],
  exports: [RouterModule],
  providers: [AuthGuard],
})


export class AppRoutingModule { }
