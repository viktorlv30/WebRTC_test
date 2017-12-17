/**
 * Created by v.litvak on 17.12.2017
 */

import { UserMedia } from './UserMedia/UserMedia';

export function pageReady(){
    let media = new UserMedia();
    media.Start({video: true, audio: true});
};
