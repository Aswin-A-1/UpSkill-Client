import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionDb, Sections, lessons } from '../../../../../core/models/course';
import { InstructorCourseService } from '../../../../../core/services/instructor/course/instructorcourse.service';
import { CustomToastService } from '../../../../../core/services/customtoast.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructor-coursevideoupload',
  templateUrl: './instructor-coursevideoupload.component.html',
  styleUrl: './instructor-coursevideoupload.component.css'
})
export class InstructorCoursevideouploadComponent {
  savedsections: SectionDb[] = []
  courseId!: string

  sections: Sections[] = [];
  // lessons: lessons[] = [];

  files: { [key: number]: File } = {};
  lessonEditFile!: File | null;
  lessonAddFile!: File | null;
  previewUrls: string[][] = [];
  lessonEditUrl: string | null = null;
  lessonAddUrl: string | null = null;
  isVideoFileValid: boolean = true

  showModal = false;
  sectionEditForm!: FormGroup;
  sectionEditId!: string | null;
  sectionEditIndex!: number | null;

  showLessonEditModal = false;
  lessonEditForm!: FormGroup;
  lessonEditSessionId!: string | null;
  lessonEditIndex!: number | null;
  lessonEditSectionIndex!: number | null;

  showAddLessonModal = false;
  lessonAddForm!: FormGroup;
  lessonAddSessionId!: string | null;
  lessonAddSectionIndex!: number | null;

  showDeleteSectionModal = false;
  deleteSessionId!: string | null;
  deleteSessionIndex!: number | null;

  showDeleteLessonModal = false;
  deleteLessonSessionId!: string | null;
  deleteLessonIndex!: number | null;
  deleteLessonSessionIndex!: number | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: InstructorCourseService,
    public customToastService: CustomToastService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['id'];
    });

    this.service.getSection(this.courseId).subscribe({
      next: (res) => {
        if (res) {
          this.savedsections = res.sections

          if (this.savedsections.length == 0) {
            this.sections.push({
              title: '',
              description: '',
              lessons: [{
                title: '',
                description: '',
                vedio: null
              }]
            })
          }
        }
      }
    })

    this.sectionEditForm = new FormGroup({
      sectionEditTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      sectionEditDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ])
    });

    this.lessonEditForm = new FormGroup({
      lessonEditTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      lessonEditDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ]),
      lessonEditVideo: new FormControl('', [])
    });

    this.lessonAddForm = new FormGroup({
      lessonAddTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      lessonAddDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(1000),
      ]),
      lessonAddVideo: new FormControl('', [
        Validators.required,
      ])
    });
  }

  addSection(): void {
    this.sections.push({
      title: '',
      description: '',
      lessons: [{
        title: '',
        description: '',
        vedio: null
      }]
    });
  }

  addLesson(index: number): void {
    this.sections[index].lessons.push({
      title: '',
      description: '',
      vedio: null
    });
  }

  saveSection(index: number): void {
    if (this.sections[0].title == '' || this.sections[0].description == '' || this.sections[0].lessons.some(lesson => lesson.title.trim() === '' || lesson.description.trim() === '' || !lesson.vedio)) {
      this.customToastService.setToast('error', 'All fields are required');
      return;
    } else {
      this.service.saveSection(this.sections[0], this.files, this.courseId).subscribe({
        next: (successResponse: any) => {
          if (successResponse.message) {
            this.savedsections.push(successResponse.newSection)
            this.sections.pop()
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }

    // this.service.saveSection(this.sections[0], this.file,  this.courseId).subscribe({
    //   next: (successResponse: any) => {
    //     if (successResponse.message) {
    //       this.savedsections.push(successResponse.newSection)
    //       this.sections.pop()
    //       this.customToastService.setToast('success', successResponse.message);
    //     }
    //   },
    //   error: (error: any) => {
    //     this.customToastService.setToast('error', error.error.error);
    //   }
    // });
  }

  spaceValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value.trim == '') {
      return { 'spaceInvalid': true };
    }
    return null;
  }

  validateVideoFile(event: any, sectionIndex: number, lessonIndex: number): void {
    const file = event.target.files[0];
    if (file && !file.type.startsWith('video/')) {
      // this.isVideoFileValid = false
      this.customToastService.setToast('error', 'Input a video file.')
      event.target.value = '';
      this.sections[sectionIndex].lessons[lessonIndex].vedio = ''
    } else {
      // if(!this.isVideoFileValid) this.isVideoFileValid = true
      this.onFileSelected(event, sectionIndex, lessonIndex);
    }
  }

  onFileSelected(event: any, i: number, j: number) {
    const file = event.target.files[0];
    if (file) {
      this.previewUrls[i] = this.previewUrls[i] || [];
      this.files[j] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls[i][j] = reader.result as string;
        // console.log(i, j);
        // console.log('files: ', this.files)
      };
      reader.readAsDataURL(file);
    }
    // this.file = event.target.files[0];
    // if (this.file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.previewUrl = reader.result as string;
    //     console.log(this.previewUrl, i, j)
    //   };
    //   reader.readAsDataURL(this.file);
    // }
  }

  removeVideo(i: number, j: number) {
    this.previewUrls[i][j] = null as unknown as string;
    delete this.files[j];
    this.sections[i].lessons[j].vedio = ''
    // this.files[i][j] = null as unknown as File;
    // this.courseForm.get('courseImage')?.reset();
  }

  removeLessonEditVideo() {
    this.lessonEditFile = null
    this.lessonEditUrl = null
    this.lessonEditForm.get('lessonEditVideo')?.reset();
  }

  removeLessonAddVideo() {
    this.lessonAddFile = null
    this.lessonAddUrl = null
    this.lessonAddForm.get('lessonAddVideo')?.reset();
  }

  sectionEditSubmit() {
    Object.keys(this.sectionEditForm.controls).forEach(control => {
      this.sectionEditForm.get(control)?.markAsTouched();
    });
    if (this.sectionEditForm.valid && this.sectionEditId != null && this.sectionEditIndex != null) {
      console.log('id: ', this.sectionEditId)
      this.service.editSection(this.sectionEditForm.value.sectionEditTitle, this.sectionEditForm.value.sectionEditDescription, this.sectionEditId).subscribe({
        next: (successResponse: any) => {
          if (this.sectionEditIndex != null) {
            this.savedsections[this.sectionEditIndex].sectionname = successResponse.section.sectionname;
            this.savedsections[this.sectionEditIndex].description = successResponse.section.description;
            this.sectionEditId = null
            this.sectionEditIndex = null
            this.showModal = false;
            this.sectionEditForm.reset();
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  lessonEditSubmit() {
    Object.keys(this.lessonEditForm.controls).forEach(control => {
      this.lessonEditForm.get(control)?.markAsTouched();
    });
    if(this.lessonEditFile != null && this.lessonEditUrl) {
      this.service.editLessonWithVideo(this.lessonEditForm.get('lessonEditTitle')?.value, this.lessonEditForm.get('lessonEditDescription')?.value, this.lessonEditFile, this.lessonEditSessionId as string, this.lessonEditIndex as number).subscribe({
        next: (successResponse: any) => {
          if (this.lessonEditSectionIndex != null && this.lessonEditIndex != null) {
            this.savedsections[this.lessonEditSectionIndex].lessons[this.lessonEditIndex].title = successResponse.newlesson.title;
            this.savedsections[this.lessonEditSectionIndex].lessons[this.lessonEditIndex].description = successResponse.newlesson.description;
            this.savedsections[this.lessonEditSectionIndex].lessons[this.lessonEditIndex].video = successResponse.newlesson.video;
            this.lessonEditSessionId = null
            this.lessonEditIndex = null
            this.lessonEditSectionIndex = null
            this.lessonEditFile = null
            this.showLessonEditModal = false;
            this.lessonEditForm.reset();
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    } else {
      this.service.editLesson(this.lessonEditForm.get('lessonEditTitle')?.value, this.lessonEditForm.get('lessonEditDescription')?.value, this.lessonEditSessionId as string, this.lessonEditIndex as number).subscribe({
        next: (successResponse: any) => {
          if (this.lessonEditSectionIndex != null && this.lessonEditIndex != null) {
            this.savedsections[this.lessonEditSectionIndex].lessons[this.lessonEditIndex].title = successResponse.newlesson.title;
            this.savedsections[this.lessonEditSectionIndex].lessons[this.lessonEditIndex].description = successResponse.newlesson.description;
            this.lessonEditSessionId = null
            this.lessonEditIndex = null
            this.lessonEditSectionIndex = null
            this.showLessonEditModal = false;
            this.lessonEditForm.reset();
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  lessonAddSubmit() {
    Object.keys(this.lessonAddForm.controls).forEach(control => {
      this.lessonAddForm.get(control)?.markAsTouched();
    });
    if(this.lessonAddFile != null && this.lessonAddUrl) {
      this.service.addLessonWithVideo(this.lessonAddForm.get('lessonAddTitle')?.value, this.lessonAddForm.get('lessonAddDescription')?.value, this.lessonAddFile, this.lessonAddSessionId as string).subscribe({
        next: (successResponse: any) => {
          if (this.lessonAddSectionIndex != null) {
            this.savedsections[this.lessonAddSectionIndex].lessons.push(successResponse.newLesson);
            this.lessonAddSessionId = null
            this.lessonAddSectionIndex = null
            this.showAddLessonModal = false;
            this.lessonAddForm.reset();
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  deleteSectionSubmit() {
    if( this.deleteSessionId != null && this.deleteSessionIndex != null ) {
      this.service.deleteSection( this.deleteSessionId as string ).subscribe({
        next: (successResponse: any) => {
          if (this.deleteSessionIndex != null) {
            this.savedsections.splice(this.deleteSessionIndex, 1)
            this.deleteSessionId = null
            this.deleteSessionIndex = null
            this.showDeleteSectionModal = false;
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  deleteLessonSubmit() {
    if( this.deleteLessonSessionId != null && this.deleteLessonIndex != null, this.deleteLessonSessionIndex != null ) {
      this.service.deleteLesson( this.deleteLessonSessionId as string, this.deleteLessonIndex as number ).subscribe({
        next: (successResponse: any) => {
          if (this.deleteLessonIndex != null) {
            this.savedsections[this.deleteLessonSessionIndex as number].lessons.splice(this.deleteLessonIndex, 1)
            this.deleteLessonSessionId = null
            this.deleteLessonIndex = null
            this.deleteLessonSessionIndex = null
            this.showDeleteLessonModal = false;
            this.customToastService.setToast('success', successResponse.message);
          }
        },
        error: (error: any) => {
          this.customToastService.setToast('error', error.error.error);
        }
      });
    }
  }

  openModal(sectionId: string, index: number) {
    this.sectionEditId = sectionId
    this.sectionEditIndex = index
    this.sectionEditForm.setValue({
      sectionEditTitle: this.savedsections[index].sectionname || '',
      sectionEditDescription: this.savedsections[index].description || ''
    });
    this.showModal = true;
  }

  closeModal() {
    this.sectionEditId = null
    this.sectionEditIndex = null
    this.showModal = false;
  }

  openLessonModal(sectionId: string, index: number, sectionIndex: number) {
    this.lessonEditSessionId = sectionId
    this.lessonEditIndex = index
    this.lessonEditSectionIndex = sectionIndex
    this.lessonEditForm.setValue({
      lessonEditTitle: this.savedsections[sectionIndex].lessons[index].title || '',
      lessonEditDescription: this.savedsections[sectionIndex].lessons[index].description || '',
      lessonEditVideo: null
    });
    this.showLessonEditModal = true;
  }

  closeLessonModal() {
    this.lessonEditSessionId = null
    this.lessonEditIndex = null
    this.lessonEditSectionIndex = null
    this.showLessonEditModal = false;
  }

  openAddNewLessonModal(sectionId: string, sectionIndex: number) {
    this.showAddLessonModal = true
    this.lessonAddSessionId = sectionId
    this.lessonAddSectionIndex = sectionIndex
  }

  closeAddLessonModal() {
    this.lessonAddForm.reset();
    this.showAddLessonModal = false
    this.lessonAddSessionId = null
    this.lessonAddSectionIndex = null
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lessonEditFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.lessonEditUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onLessonAddFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.lessonAddFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.lessonAddUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openDeleteSectionModal(sectionId: string, index: number) {
    this.deleteSessionId = sectionId
    this.deleteSessionIndex = index
    this.showDeleteSectionModal = true
  }

  closeDeleteSectionModal() {
    this.showDeleteSectionModal = false
    this.deleteSessionId = null
    this.deleteSessionIndex = null
  }

  openDeleteLessonModal(sectionId: string, index: number, sectionIndex: number) {
    this.deleteLessonSessionId = sectionId
    this.deleteLessonIndex = index
    this.deleteLessonSessionIndex = sectionIndex
    this.showDeleteLessonModal = true
  }

  closeDeleteLessonModal() {
    this.showDeleteLessonModal = false
    this.deleteLessonSessionId = null
    this.deleteLessonIndex = null
    this.deleteLessonSessionIndex = null
  }

}
