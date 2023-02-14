import { _decorator, Component, Node, Prefab, instantiate, Vec3, SpriteFrame, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;
import puckColor from './puckColor';

import { puckManager } from './puckManager';

@ccclass('board')
export class board extends Component {
    @property({type: Prefab})
    puck: Prefab = null;

    rows = 5;

    onLoad(){
        let instances = 10;
        console.log("Onload Started");
        this.setPuck(instances, puckColor.black);
    }

    /**
     * 
     * @param count tells the no of pucks of particular type
     * @param index index in array of that puck
     */


    
    setPuck(instances, index){
        let puckHeight;
        let puckWidth;
        let puck;

      
        for(let j=0;j<this.rows;j++){
            let currentPos = this.node.getChildByName("Node").getPosition();
            let gap = this.node.getChildByName("Node").getComponent(UITransform).width - (3*puckWidth);
            currentPos.x+= gap/2;
            let noOfPucks = 3;
            // currentPos.x+= gap/2;
            for(let j=0;j<noOfPucks;j++){
                puck = instantiate(this.puck);
                puckWidth = puck.getComponent(UITransform).width;
                puckHeight = puck.getComponent(UITransform).height;

                let puckImage = puck.getComponent(puckManager).getPuck(index);
                puck.getComponent(Sprite).spriteFrame = puckImage;

                
                puck.setPosition(currentPos);
                currentPos.x += 20;
                this.node.addChild(puck)
            }
            noOfPucks++;
        }
    }

   

    start() {

    }

    update(deltaTime: number) {
        
    }
}

