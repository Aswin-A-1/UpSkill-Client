import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastService } from '../../../../core/services/customtoast.service';
import { StudentHomeService } from '../../../../core/services/student/home/studenthome.service';
import { Course } from '../../../../core/models/student';
import { LessonDb, SectionDb } from '../../../../core/models/course';
import videojs from 'video.js';

@Component({
  selector: 'app-coursepreviewvideo',
  templateUrl: './coursepreviewvideo.component.html',
  styleUrl: './coursepreviewvideo.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CoursepreviewvideoComponent {
  courseId!: string
  sectionId!: string
  lessonIndex!: number
  course: Course | null = null;
  currentSection: SectionDb | null = null;
  currentLesson: LessonDb | null = null;
  activeIndex: number | null = null;
  sections: SectionDb[] = [];
  isEnrolled: boolean = false;
  @ViewChild('videoPlayer', { static: true }) videoPlayer: any;
  player: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: StudentHomeService,
    public customToastService: CustomToastService,
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
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.sectionId = params['sectionId'];
      this.lessonIndex = parseInt(params['lessonIndex']);
      if (this.courseId) {
        this.checkEnrollment();
      }
    });

    this.service.getCourse(this.courseId).subscribe({
      next: (res) => {
        this.course = res.course
        this.sections = res.sections
        this.currentSection = this.sections.find(section => section._id === this.sectionId) || null;
        this.currentLesson = this.currentSection?.lessons[this.lessonIndex] || null;
        if (this.currentLesson?.video) {
          this.initVideoPlayer();
        }
      }
    })
  }

  checkEnrollment() {
    const studentId = JSON.parse(localStorage.getItem('user')!)._id

    this.service.isEnrolled(this.courseId, studentId).subscribe({
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
      if(lessonIndex != this.lessonIndex) {
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
