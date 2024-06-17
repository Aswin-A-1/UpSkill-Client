import { Component } from '@angular/core';
import { ChatService } from '../../../../../core/services/chat.service';
import { ChatMessage } from '../../../../../core/models/message';

@Component({
  selector: 'app-instructorstudentmessages',
  templateUrl: './instructorstudentmessages.component.html',
  styleUrl: './instructorstudentmessages.component.css'
})
export class InstructorstudentmessagesComponent {
  newMessage: string = '';
  instructorId!: string;
  chatmessages: ChatMessage[] = [];

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.instructorId = JSON.parse(localStorage.getItem('instructor')!)._id
    const roomId = this.getRoomId('66487faf0637aff8ca701944', this.instructorId);
    this.chatService.joinRoom(roomId);
    this.loadMessages();

    this.chatService.receiveMessage().subscribe((message) => {
      this.chatmessages.push(message);
    });
  }

  getRoomId(userId1: string, userId2: string): string {
    console.log('roomId: ', [userId1, userId2].sort().join('_'))
    return [userId1, userId2].sort().join('_');
  }

  loadMessages() {
    this.chatService.getMessages('66487faf0637aff8ca701944', this.instructorId).subscribe({
      next: (res) => {
        this.chatmessages = [...this.chatmessages, ...res.messages]
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.instructorId) {
      const newMessageObject: ChatMessage = {
        message: this.newMessage,
        senderId: this.instructorId,
        receiverId: '66487faf0637aff8ca701944',
        timestamp: new Date(),
        _id: ''
      };
      this.chatService.sendMessage(this.instructorId, '66487faf0637aff8ca701944', this.newMessage);
      this.chatmessages.push(newMessageObject);
      this.newMessage = '';
    }
  }
}
