import { _decorator, Component, Node, EventHandler, Slider, UITransform, Input, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('slider')
export class slider extends Component {
    @property({type:Node})
    striker: Node = null;

    @property({type: Node})
    strikerHover: Node = null;

    @property({type: Node})
    blackCircle: Node = null;

    sliderWidth = null;
    intitialy = 0;
    initialx = 0;
    onLoad(){
        this.node.on('slide', this.moveStriker);
        this.intitialy = this.striker.getPosition().y
        
        this.sliderWidth = this.node.getComponent(UITransform).width;
        this.initialx = (-1) * this.sliderWidth/2;

        let handle = this.node.getChildByName("Handle")
        handle.on(Input.EventType.TOUCH_START, this.increaseStrikerScale);
        handle.on(Input.EventType.TOUCH_END, this.decreaseStrikerScale);
        this.strikerHoverRotate();
    }   
    
    
    decreaseStrikerScale = () => {
        this.strikerHover.setScale(1, 1);
    }

    increaseStrikerScale = () => {
        this.strikerHover.setScale(1.5, 1.5);
    }
    
    /**
     * Helps in moving the striker in sync with the slider
     */
    moveStriker = () => {
        let progress = this.node.getComponent(Slider).progress
        progress = this.sliderWidth*progress;
        this.striker.setPosition(this.initialx+progress, this.intitialy)
        this.strikerHover.setPosition(this.initialx+progress, this.intitialy)
        this.blackCircle.setPosition(this.initialx+progress, this.intitialy)
    }

    /**
     * Rotation of hover element over striker
     */
    strikerHoverRotate = () => {
        // by method in tween.The first parameter is duration and second parameter is angle. 
        tween(this.strikerHover).by(6, {angle: 360}).repeatForever().start();
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}

