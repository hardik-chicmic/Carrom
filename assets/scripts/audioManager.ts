import { _decorator, Component, Node, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('audioManager')
export class audioManager extends Component {
    // Instance is private
    private static instance: audioManager
    private static audioManager(){}
    private _audioSource: AudioSource = null;

    public static getInstance(){
        if(!audioManager.instance){
            audioManager.instance = new audioManager();
        }
        return audioManager.instance
    }

    passAudioSource(audioSource: AudioSource){
        this._audioSource = audioSource
    }

    
    playAudio(loop: boolean){
        this._audioSource.loop = loop;
        this._audioSource.play();
    }

    stopAudio(){
        this._audioSource.stop();
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

let audioInstance = audioManager.getInstance()
export default audioInstance

