import { _decorator, Component, Node, EventHandler, Slider, UITransform, Input, tween, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('slider')
export class slider extends Component {
    @property({type:Node})
    striker: Node = null;

    sliderWidth = null;
    initialy = 0;
    initialx = 0;
    onLoad(){
        this.node.on('slide', this.moveStriker);
        this.initialy = this.striker.getPosition().y
        
        this.sliderWidth = this.node.getComponent(UITransform).width;
        this.initialx = (-1) * this.sliderWidth/2;
       

        this.node.getChildByName("Handle").on(Input.EventType.TOUCH_START, this.adjustStrikerScale);
        this.node.getChildByName("Handle").on(Input.EventType.TOUCH_END, this.adjustStrikerScale);
        this.strikerHoverRotate();
    }   
    
    adjustStrikerScale = (event: EventTouch) => {
        if(event.type == "touch-start"){
            this.striker.getChildByName("strikerHover").setScale(1.5, 1.5);
        }else if(event.type == "touch-end"){
            this.striker.getChildByName("strikerHover").setScale(1,1);
        }
    }
    
    /**
     * Helps in moving the striker in sync with the slider
     */
    moveStriker = () => {
        let progress = this.node.getComponent(Slider).progress
        progress = this.sliderWidth*progress;
        this.striker.setPosition(this.initialx+progress, this.initialy)
    }

    /**
     * Rotation of hover element over striker
     */
    strikerHoverRotate = () => {
        // by method in tween.The first parameter is duration and second parameter is angle. 
        tween(this.striker.getChildByName("strikerHover")).by(6, {angle: 360}).repeatForever().start();
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}

