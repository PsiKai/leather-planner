
import pen1 from '../sounds/Pen1.wav';
import pen2  from '../sounds/Pen2.wav';

const penWriting = [pen1, pen2]

const playAudio = (action) => {
    switch (action) {
        case "write":
            var audio = new Audio(
                penWriting[Math.floor(Math.random() * penWriting.length)]
            );
            audio.volume = 0.1;
            audio.play();
            break;
    
        default:
            break;
    }
}

export default playAudio