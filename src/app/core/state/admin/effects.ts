import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, of, exhaustMap, map, tap } from 'rxjs';
import * as StudentActions from "../admin/actions";
import { CustomToastService } from "../../services/customtoast.service";
import { AdminStudentService } from "../../services/admin/student/adminstudent.services";


@Injectable()
export class AdminEffects {
    constructor(
        private actions$: Actions,
        private service: AdminStudentService,
        private customToastService: CustomToastService
    ) { }

    getStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentActions.getStudent),
            exhaustMap((action) =>
                this.service.getStudents().pipe(
                    map((successResponse) => {
                        if (successResponse.message) {
                            const students = successResponse.students;
                            console.log(students)
                            // this.customToastService.setToast('success', successResponse.message);
                        }
                        return StudentActions.fetchSuccess({ successResponse })
                    }),
                    catchError((error) => {
                        // this.toastService.set('error', error.error.error)
                        this.customToastService.setToast('error', error.error.error);
                        return of(StudentActions.fetchFail({ error: error.error.error || 'An error occurred' }));
                    })
                )
            )
        )
    )
}