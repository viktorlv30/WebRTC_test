/**
 * Created by v.litvak on 17.12.2017
 */

import { IUserMedia } from "./IUserMedia";

export class UserMedia implements IUserMedia {

    private _navigator: Navigator;

    constructor(){
        this._navigator = new Navigator();
    }

    Start(constraints: MediaStreamConstraints): void {
        console.log('Start media stream!!!');
        let mediaSettings = constraints;
        // let successCallback = this.SuccessHandler.bind(this); 
        // let errorCallback = this.ErrorHandler.bind(this); 
        this._navigator.getUserMedia(
            mediaSettings,
            (stream: MediaStream) => this.SuccessHandler(stream),
            (error: MediaStreamError) => this.ErrorHandler(error));
    }
    
    Stop(): void {
        console.log(`Stop streaming`);
    }

    Join(room: number): void {
        console.log(`Join to room: ${room}`);
    }

    Leave(room: number): void {
        console.log(`Leaving the room: ${room}`);
    }

    SuccessHandler(stream: MediaStream): void{
        console.log(stream);
    }

    ErrorHandler(error: MediaStreamError): void{
        console.error(error);
    }
}
