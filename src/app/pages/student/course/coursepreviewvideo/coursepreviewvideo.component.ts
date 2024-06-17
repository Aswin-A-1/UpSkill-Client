import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Course } from '../../../../core/models/student';
import { Courses, LessonDb, SectionDb } from '../../../../core/models/course';
import videojs from 'video.js';
import { ChatService } from '../../../../core/services/chat.service';
import { ChatMessage } from '../../../../core/models/message';

@Component({
  selector: 'app-coursepreviewvideo',
  templateUrl: './coursepreviewvideo.component.html',
  styleUrl: './coursepreviewvideo.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CoursepreviewvideoComponent {
  courseId!: string
  sectionId!: string
  studentId!: string
  instructorId!: string
  lessonIndex!: number
  course: Courses | null = null;
  currentSection: SectionDb | null = null;
  currentLesson: LessonDb | null = null;
  activeIndex: number | null = null;
  sections: SectionDb[] = [];
  isEnrolled: boolean = false;
  @ViewChild('videoPlayer', { static: true }) videoPlayer: any;
  player: any;
  chatmessages: ChatMessage[] = [];
  newMessage: string = '';
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _service: StudentHomeService,
    public customToastService: CustomToastService,
    private chatService: ChatService
  ) { }

  ngAfterViewInit(): void {
    this.initVideoPlayer();
  }

  initVideoPlayer(): void {
    if (this.currentLesson && this.videoPlayer) {
      this.player = videojs(this.videoPlayer.nativeElement, {
        controls: true,
        bigPlayButton: true,
        preload: 'auto',
        sources: [{
          src: this.currentLesson.video,
          type: 'video/mp4'
        }]
      }, () => { });
    }
  }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.sectionId = params['sectionId'];
      this.lessonIndex = parseInt(params['lessonIndex']);
      if (this.courseId) {
        this.checkEnrollment();
      }
    });

    this._service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.sections = res.sections
        this.currentSection = this.sections.find(section => section._id === this.sectionId) || null;
        this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
        if (this.currentLesson?.video) {
          this.initVideoPlayer();
        }
        this.joinRoom();
        this.loadMessages();
      }
    })

    this.studentId = JSON.parse(localStorage.getItem('user')!)._id


    this.chatService.receiveMessage().subscribe((message) => {
      this.chatmessages.push(message);
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    });


    // this.chatService.hello().subscribe({
    //   next:(res=>{
    //     if(res){
    //       console.log('chats servcie cllaed')
    //     }
    //   }),error:(err=>{
    //     if(err&&err.error){
    //       console.log(err.error)
    //     }
    //   })
    // })
  }
  
  ngAfterViewChecked() {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }

  joinRoom() {
    if (this.course) {
      const instructorId = this.course.instructorid
      const roomId = this.getRoomId(this.studentId, instructorId);
      this.chatService.joinRoom(roomId);
    }
  }

  loadMessages() {
    if (this.course) {
      this.chatService.getMessages(this.studentId, this.course.instructorid).subscribe({
        next: (res) => {
          this.chatmessages = [...this.chatmessages, ...res.messages]
          console.log('messages: ', this.chatmessages)
        }
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.course?.instructorid) {
      const newMessageObject: ChatMessage = {
        message: this.newMessage,
        senderId: this.studentId,
        receiverId: this.course.instructorid,
        timestamp: new Date(),
        _id: ''
      };
      this.chatService.sendMessage(this.studentId, this.course?.instructorid, this.newMessage);
      this.newMessage = '';
      this.chatmessages.push(newMessageObject);
      console.log('new messages: ', this.chatmessages)
      this.chatContainer.nativeElement.scrollHeight = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  checkEnrollment() {
    const studentId = JSON.parse(localStorage.getItem('user')!)._id

    this._service.isEnrolled(this.courseId, studentId).subscribe({
      next: (res) => {
        this.isEnrolled = res.isEnrolled
      }
    })
  }

  updateVideoSource(videoUrl: string): void {
    if (this.player) {
      this.player.src({ type: 'video/mp4', src: videoUrl });
      this.player.load();
    }
  }

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  getRoomId(userId1: string, userId2: string): string {
    console.log('roomId: ', [userId1, userId2].sort().join('_'))
    return [userId1, userId2].sort().join('_');
  }

  playVideo(sectionId: string, lessonIndex: number) {
    if (sectionId != this.sectionId) {
      if (lessonIndex != this.lessonIndex) {
        this.sectionId = sectionId;
        this.lessonIndex = lessonIndex;
        this.currentSection = this.sections.find(section => section._id === this.sectionId) || null;
        this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
        if (this.currentLesson?.video) {
          if (this.player && this.currentLesson) {
            this.player.src({
              src: this.currentLesson.video,
              type: 'video/mp4'
            });
            this.player.load();
            this.player.play();
          }
        }
      } else {
        this.sectionId = sectionId;
        this.currentSection = this.sections.find(section => section._id === this.sectionId) || null;
        this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
        if (this.currentLesson?.video) {
          if (this.player && this.currentLesson) {
            this.player.src({
              src: this.currentLesson.video,
              type: 'video/mp4'
            });
            this.player.load();
            this.player.play();
          }
        }
      }
    } else {
      if (lessonIndex != this.lessonIndex) {
        this.lessonIndex = lessonIndex;
        this.currentSection = this.sections.find(section => section._id === this.sectionId) || null;
        this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
        if (this.currentLesson?.video) {
          if (this.player && this.currentLesson) {
            this.player.src({
              src: this.currentLesson.video,
              type: 'video/mp4'
            });
            this.player.load();
            this.player.play();
          }
        }
      }
    }
  }

  playVideoInSection(lessonIndex: number) {
    if (lessonIndex != this.lessonIndex) {
      this.lessonIndex = lessonIndex;
      this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
      if (this.currentLesson?.video) {
        if (this.player && this.currentLesson) {
          this.player.src({
            src: this.currentLesson.video,
            type: 'video/mp4'
          });
          this.player.load();
          this.player.play();
        }
      }
    }
  }
}
