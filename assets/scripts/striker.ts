import { _decorator, Component, Node, Input, EventTouch, UITransform, Vec2, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('striker')
export class striker extends Component {
    @property({type: Node})
    blackCircle: Node = null;

    initialScalex = 0;
    initialScaley = 0;

    cursorStartPos:Vec2;
    cursorEndPos:Vec2;

    count: number = 0;

    onLoad(){
        
        this.node.on(Input.EventType.TOUCH_START, this.getStartLocation)
        this.node.on(Input.EventType.TOUCH_MOVE, this.increaseCircleSize);
        this.node.on(Input.EventType.TOUCH_CANCEL, this.getEndlocation)
    }

    /**
     * 
     * @param event Touch event
     */

    getStartLocation = (event: EventTouch) => {
        this.cursorStartPos = event.getUILocation();

        
        
    }


    /**
     * 
     * @param event Touch Event
     */
    increaseCircleSize = (event: EventTouch) => {
        
        this.cursorEndPos = event.getUILocation()
        let differenceX = this.cursorEndPos.x - this.cursorStartPos.x;
        let differenceY = this.cursorEndPos.y - this.cursorStartPos.y;

        // Euclidean distance of a point from pos
        let euclideanDistance = Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));

        // Setting the angle as tanInverse(difference(y)/difference(x))
        this.blackCircle.angle = Math.atan2(differenceY, differenceX) * 180/Math.PI + 90;
        
        // Setting the scaling according to euclidean distance
        if(this.initialScalex <= 1 && this.initialScaley <= 1){
            this.initialScalex = 0.02*euclideanDistance;
            this.initialScaley = 0.02*euclideanDistance;
            this.blackCircle.setScale(this.initialScalex, this.initialScaley)
        }
        this.blackCircle.active = true;

        
    }

    /**
     * 
     * @param event Touch event
     */
    getEndlocation = (event: EventTouch) => {
        let differenceX = this.cursorEndPos.x - this.cursorStartPos.x;
        let differenceY = this.cursorEndPos.y - this.cursorStartPos.y;
       
        
        this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(-1*differenceX, -1*differenceY)
        // setTimeout(()=>{
        //     this.node.getComponent(RigidBody2D).linearDamping = 10;
        // }, 3000)
        
        this.blackCircle.active = false;
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}

