
import pen1 from '../sounds/Pen1.wav';
import pen2  from '../sounds/Pen2.wav';
import pageFlip from "../sounds/page-flip.wav"
import penCross from '../sounds/penCross1.wav';

const penWriting = [pen1, pen2]
let audio = new Audio()
audio.volume = 0.1

const playAudio = async (action) => {
    try {
        switch (action) {
            case "write":
                audio.src = penWriting[Math.floor(Math.random() * penWriting.length)]
                await audio.play();
                break;
            case "page":
                audio.src = pageFlip
                await audio.play()
                break;
            case "cross":
                audio.src = penCross
                audio.volume = 1
                await audio.play()
                break;
            default:
                break;
        }
    } catch (error) {}
}

export default playAudio