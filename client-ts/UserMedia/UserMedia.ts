/**
 * Created by v.litvak on 17.12.2017
 */

import { IUserMedia } from "./IUserMedia";

export class UserMedia implements IUserMedia {

    private _navigator: Navigator;
    // is started video or audio recording/streaming. after press start button
    isStarted: boolean;

    constructor() {
        this._navigator = this.GetNavigator();
        this.isStarted = false;
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

    }

    ErrorHandler(error: MediaStreamError): void {
        console.error(error);
        this.Stop();
    }

    GetStartButton(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    private GetNavigator(): Navigator {
        return window.navigator;
    }
}
