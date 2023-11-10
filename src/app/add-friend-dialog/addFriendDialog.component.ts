import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {FriendsService} from "../service/friends.service";
import {Alert} from "../service/alert.service";

@Component({
  selector: 'app-add-friend-dialog',
  templateUrl: './addFriendDialog.component.html',
  styleUrls: ['./addFriendDialog.component.css']
})

export class AddFriendDialogComponent implements OnInit {
  users: any;
  constructor(
    private friendService: FriendsService,
    public dialogRef: MatDialogRef<AddFriendDialogComponent>,
    private alert: Alert
  ) { }

  ngOnInit(): void {
    this.loadAllUsers();
    this.friendService.getFriendsStream().subscribe({
      next: value => {
        this.loadAllUsers();
      },
      error: console.error
    })
  }

  loadAllUsers() {
    this.friendService.getAllUsers().subscribe(users => {this.users = users});
  }

  addFriend(friendId: any) {
    this.friendService.addFriend(friendId).subscribe(
      (res) => {
        this.alert.success(res.message);
      },
      (error) => {
        this.alert.error(error.error.message);
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
