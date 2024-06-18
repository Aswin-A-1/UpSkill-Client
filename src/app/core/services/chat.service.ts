import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private _socket: Socket;
  private _url = environment.URL;
  private _baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) { 
    this._socket = io(this._url, {});

    this._socket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
    });

    this._socket.on('connect', () => {
      console.log('Successfully connected to socket server');
    });
  }

  hello() {
    return this.http.get(`${this._baseUrl}/student/sample`);
  }

  joinRoom(roomId: string) {
    this._socket.emit('joinRoom', roomId);
  }
  
  leaveRoom(roomId: string) {
    this._socket.emit('leaveRoom', roomId);
  }

  sendMessage(senderId: string, receiverId: string, message: string) {
    this._socket.emit('sendMessage', { senderId, receiverId, message });
  }

  receiveMessage(): Observable<any> {
    return new Observable(observer => {
      this._socket.on('receiveMessage', (data) => {
        observer.next(data);
      });
    });
  }
  
  getMessages(studentId: string, instructorId: string): Observable<any> {
    const requestBody = { studentId: studentId, instructorId: instructorId };
    return this.http.post(`${this._baseUrl}/student/getmessages`, requestBody);
  }
}
