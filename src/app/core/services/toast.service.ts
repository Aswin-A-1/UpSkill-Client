import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private msgService: MessageService) { }

  set(title : string, detail : string,summary : string = title) {
    this.msgService.add({
      severity: title,
      summary: summary,
      detail: detail,
    })
  }
}
