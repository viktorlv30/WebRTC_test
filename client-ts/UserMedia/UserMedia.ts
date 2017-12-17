/**
 * Created by v.litvak on 17.12.2017
 */

import { IUserMedia } from "./IUserMedia";

export class UserMedia implements IUserMedia {
    private _navigator: Navigator;
    private _startButton: HTMLButtonElement | null;
    private _localVideoElemId: string;
    private _localVideoArea: HTMLVideoElement | null;
    private _remoteVideoElemId: string;
    private _remoteVideoArea: HTMLVideoElement | null;

    // is started video or audio recording/streaming. after press start button
    isStarted: boolean;

    constructor() {
        this._navigator = this.GetNavigator();
        this.isStarted = false;
        this._localVideoElemId = 'localVideo';
        this._remoteVideoElemId = 'remoteVideo';
    }

    Start(constraints: MediaStreamConstraints): void {
        console.log('Start media stream!!!');
        try {
            this._navigator.getUserMedia(
                constraints,
                (stream: MediaStream) => this.SuccessHandler(stream),
                (error: MediaStreamError) => this.ErrorHandler(error));
        } catch (error) {
            this.Stop();
            throw `Error during start getUserMedia()`;
        }
    }

    Stop(): void {
        console.log(`Stop streaming`);
        if (this.isStarted) {
            this.isStarted = false;
            window.location.reload();
        } else {
            console.log(`Doubling to stop streaming`);
            this.isStarted = false;
        }
    }

    Join(room: number): void {
        console.log(`Join to room: ${room}`);
    }

    Leave(room: number): void {
        console.log(`Leaving the room: ${room}`);
    }

    SuccessHandler(stream: MediaStream): void {
        console.log(`Start stream handler!`);
        this.isStarted = true;
        console.log(stream);
        let videoTracks = stream.getVideoTracks();
        console.log(`Using media device:`, videoTracks[0].label);
        let videoTag: HTMLVideoElement | null = this.GetVideoArea(this._localVideoElemId);
        if (videoTag) {
            videoTag.srcObject = stream;
        } else {
            throw `Tag with id '${this._localVideoElemId}' doesn't exist!`;
        }
    }

    ErrorHandler(error: MediaStreamError): void {
        console.error(error);
        this.Stop();
    }

    GetStartButton(id: string): HTMLButtonElement | null {
        this._startButton = <HTMLButtonElement>document.getElementById(id);
        return this._startButton;
    }

    /**
     * GetVideoArea - 'local' or 'remote'
     * @param areaType  - for show local or remote stream
     * @returns HTMLVideoElement video
     */
    GetVideoArea(areaType: string): HTMLVideoElement | null {
        let element: HTMLVideoElement | null;
        if (areaType === this._localVideoElemId) {
            this._localVideoArea = <HTMLVideoElement>document.getElementById(areaType);
            element = this._localVideoArea;
        } else if (areaType === this._remoteVideoElemId) {
            this._remoteVideoArea = <HTMLVideoElement>document.getElementById(areaType);
            element = this._remoteVideoArea;
        } else {
            throw `Incorrect identifier for local or remote video html tag. It must be either ${this._localVideoElemId} or ${this._remoteVideoElemId}`;
        }
        return element;
    }

    private GetNavigator(): Navigator {
        return window.navigator;
    }
}
