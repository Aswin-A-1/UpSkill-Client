import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../../../../core/services/chat.service';
import { ChatMessage } from '../../../../../core/models/message';
import { Student } from '../../../../../core/models/student';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructorstudentmessages',
  templateUrl: './instructorstudentmessages.component.html',
  styleUrl: './instructorstudentmessages.component.css'
})
export class InstructorstudentmessagesComponent {
  newMessage: string = '';
  instructorId!: string;
  selectedStudentId!: string;
  students: Student[] = [];
  chatmessages: ChatMessage[] = [];
  currentRoomId!: string;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private _router: Router,
    private chatService: ChatService,
    private courseService: InstructorCourseService,
  ) { }

  ngOnInit() {
    this.instructorId = JSON.parse(localStorage.getItem('instructor')!)._id

    this.courseService.getStudents(this.instructorId).subscribe({
      next: (res) => {
        if (res) {
          this.students = res.students
          this.selectedStudentId = res.students[0]._id
          this.joinRoom(this.selectedStudentId);
          this.loadMessages();
        }
      }
    })

    // const roomId = this.getRoomId(this.selectedStudentId, this.instructorId);
    // this.chatService.joinRoom(roomId);


    this.chatService.receiveMessage().subscribe((message) => {
      this.chatmessages.push(message);
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    });
  }
  
  ngAfterViewChecked() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  getRoomId(userId1: string, userId2: string): string {
    console.log('roomId: ', [userId1, userId2].sort().join('_'))
    return [userId1, userId2].sort().join('_');
  }

  joinRoom(studentId: string) {
    const newRoomId = this.getRoomId(studentId, this.instructorId);
    if (this.currentRoomId) {
      this.chatService.leaveRoom(this.currentRoomId);
    }
    this.currentRoomId = newRoomId;
    this.chatService.joinRoom(this.currentRoomId);
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getMessages(this.selectedStudentId, this.instructorId).subscribe({
      next: (res) => {
        this.chatmessages = [...res.messages]
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.instructorId) {
      const newMessageObject: ChatMessage = {
        message: this.newMessage,
        senderId: this.instructorId,
        receiverId: this.selectedStudentId,
        timestamp: new Date(),
        _id: ''
      };
      this.chatService.sendMessage(this.instructorId, this.selectedStudentId, this.newMessage);
      this.chatmessages.push(newMessageObject);
      this.newMessage = '';
      this.chatContainer.nativeElement.scrollHeight = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  selectStudent(studentId: string) {
    this.selectedStudentId = studentId
    const roomId = this.getRoomId(this.selectedStudentId, this.instructorId);
    // this.chatService.joinRoom(roomId);
    this.joinRoom(this.selectedStudentId);
    this.loadMessages();
  }

  navigateToStudents() {
    this._router.navigate(['instructor/student']);
  }
}
