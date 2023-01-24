import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ZoomEndMeetingService {
    constructor(private _httpClient: HttpClient) {}

    endMeeting(meetingNumber: any, id_classroom) {
        return this._httpClient.post(
            `${environment.apiWorker}/job/zoom-job/takedown-zoom/${meetingNumber}?timeDelay=0.05`,
            {
                id_classroom: id_classroom,
            }
        );
    }
}
