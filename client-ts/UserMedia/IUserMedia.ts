/**
 * Created by v.litvak on 17.12.2017
 */

export interface IUserMedia{
    Start(constraints: MediaStreamConstraints): void;
    Stop(): void;
    Join(room: number):void;
    Leave(room: number): void;
    SuccessHandler(stream: MediaStream): void;
    ErrorHandler(error: MediaStreamError): void
}
