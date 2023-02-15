import { _decorator, Component, Node, EventHandler, Slider, UITransform, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('slider')
export class slider extends Component {
    @property({type:Node})
    striker: Node = null;

    @property({type: Node})
    strikerHover = null;

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
        handle.on(Input.EventType.TOUCH_END, this.reduceStrikerScale)
    }   
    
    
    increaseStrikerScale = () => {
        this.strikerHover.setScale(1, 1);
    }

    reduceStrikerScale = () => {
        this.strikerHover.setScale(1.5, 1.5);
    }
    
    
    moveStriker = () => {
        let progress = this.node.getComponent(Slider).progress
        progress = this.sliderWidth*progress;
        this.striker.setPosition(this.initialx+progress, this.intitialy)
        this.strikerHover.setPosition(this.initialx+progress, this.intitialy)
    }


    start() {

    }

    update(deltaTime: number) {
        
    }
}

