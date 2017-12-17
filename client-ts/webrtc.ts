/**
 * Created by v.litvak on 17.12.2017
 */

import { UserMedia } from './UserMedia/UserMedia';

let media = new UserMedia();
let startButton = media.GetStartButton("start");

if (startButton) {
  startButton.onclick = buttonCallback;
} else {
  throw `START button didn't find`;
}

function buttonCallback(): void {
  if (media.isStarted) {
    media.Stop();
  } else {
    media.Start({ video: true, audio: true });
  }
}
