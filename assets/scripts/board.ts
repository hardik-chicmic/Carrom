import { _decorator, Component, Node, Prefab, instantiate, Vec3, SpriteFrame, Sprite, UITransform, JsonAsset, PhysicsSystem2D, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;
import puckColor from './puckColor';

import { puckManager } from './puckManager';

@ccclass('board')
export class board extends Component {
    @property({type: Prefab})
    puck: Prefab = null;

    @property({type: JsonAsset})
    jsonFile: JsonAsset = null;

    rows = 5;   

    
    onLoad(){
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    }

    /**
     * 
     * @param count tells the no of pucks of particular type
     * @param index index in array of that puck
     */


    /**
     * Setting the pucks on board in a particular pattern
     */
    setPuck(){
        let gapCount = 2;
        let count = 3;
        let row = 0;
        let rightIndex = 0;
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<count;j++){
                let refNode = this.node.getChildByName("Ref");
                
                let refHeight = refNode.getComponent(UITransform).height;
                let refWidth = refNode.getComponent(UITransform).width;

                let puck = instantiate(this.puck);
                let puckHeight = puck.getComponent(UITransform).height - 20;
                let puckWidth = puck.getComponent(UITransform).width - 20;
                let puckPos = puck.getPosition();

                let puckReq = this.jsonFile.json[rightIndex].color;
                
                
                let image = puck.getComponent(puckManager).getPuck(puckColor[puckReq])
                
                puck.getComponent(Sprite).spriteFrame = image;

                let gap = refWidth - (gapCount*puckWidth);

                if(i >= 1){
                    puckPos.y-= (i*puckHeight)
                }
                if(j == 0){
                    puckPos.x+= gap/2;
                }else{
                    puckPos.x+= gap/2 + (j*puckWidth)
                }
                puck.setPosition(puckPos);
                this.node.addChild(puck);
                rightIndex++;
            }
            row++;
            if(row >= this.rows/2){
                count--;
                gapCount--;
            }else{
                count++;
                gapCount++;
            }
            
        }
    }

   
    start() {
        this.setPuck();
    }

    update(deltaTime: number) {
        
    }
}

