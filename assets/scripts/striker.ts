import { _decorator, Component, Node, Input, EventTouch, UITransform, Vec2, RigidBody2D, Prefab, Vec3, Collider2D, AudioSource } from 'cc';
import audioInstance from './audioManager';
const { ccclass, property } = _decorator;

@ccclass('striker')
export class striker extends Component {
    initialScalex:number = 0;
    initialScaley:number = 0;

    cursorStartPos:Vec2;
    cursorEndPos:Vec2;

    startPos:Vec3;
    flag = false;

    
    
    
    onLoad(){
        
        // console.log(audioSource);
        this.node.name = "striker"
        this.startPos = this.node.getPosition();
        this.node.on(Input.EventType.TOUCH_START, this.getStartLocation)
        this.node.on(Input.EventType.TOUCH_MOVE, this.increaseCircleSize);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.getEndlocation)
    }

    /**
     * 
     * @param event Touch event
     */

    getStartLocation = (event: EventTouch) => {
        this.cursorStartPos = event.getLocation();
    }


    /**
     * 
     * @param event Touch Event
     */
    increaseCircleSize = (event: EventTouch) => {
        this.cursorEndPos = event.getLocation()
        let differenceX = this.cursorEndPos.x - this.cursorStartPos.x;
        let differenceY = this.cursorEndPos.y - this.cursorStartPos.y;

        // Euclidean distance of a point from pos
        let euclideanDistance = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));

        // Setting the angle as tanInverse(difference(y)/difference(x))
        this.node.getChildByName("blackCircle").angle = (Math.atan2(differenceY, differenceX) * 180/Math.PI) + 90;
        
        // Setting the scaling according to euclidean distance
        if(this.initialScalex <= 1.5 && this.initialScaley <= 1.5){
            this.initialScalex = 0.01*euclideanDistance;
            this.initialScaley = 0.01*euclideanDistance;
            this.node.getChildByName("blackCircle").setScale(this.initialScalex, this.initialScaley)
        }
        this.node.getChildByName("blackCircle").active = true;  
    }

    /**
     * 
     * @param event Touch event
     */
    getEndlocation = (event: EventTouch) => {
        let differenceX = this.cursorEndPos.x - this.cursorStartPos.x;
        let differenceY = this.cursorEndPos.y - this.cursorStartPos.y;
        this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(-1*differenceX, -1*differenceY)
    
        this.node.getChildByName("strikerHover").active = false;
        this.node.getChildByName("blackCircle").active = false;
        this.flag = true;
        // this.playStrikerAudio();
    }

    // playStrikerAudio = () => {
    //     let audioSource = this.node.getComponent(AudioSource)
    //     audioInstance.passAudioSource(audioSource)
    //     audioInstance.playAudio(false);
    // }

    
    start() {
        
    }

    update(deltaTime: number) {
        let velocity = this.node.getComponent(RigidBody2D).linearVelocity;
        
        if(velocity.x == 0 && velocity.y == 0 && this.flag){
            this.node.getComponent(RigidBody2D).enabled = true;
            this.node.getComponent(Collider2D).enabled = true;
            this.node.setPosition(this.startPos)
            this.node.getChildByName("strikerHover").active = true;
            this.node.angle = 0;
            this.flag = false;
            
        }
        
    }
}

