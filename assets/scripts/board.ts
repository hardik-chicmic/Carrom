import { _decorator, Component, Node, Prefab, instantiate, Vec3, SpriteFrame, Sprite, UITransform, JsonAsset, PhysicsSystem2D, EPhysics2DDrawFlags, AudioSource } from 'cc';
import audioInstance from './audioManager';
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
        // this.playBackgroundAudio();
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
    setPuck(gapCount, count, row, rightIndex){
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<count;j++){
                let refWidth = 400;

                let puck = instantiate(this.puck);
                let puckHeight = puck.getComponent(UITransform).height;
                let puckWidth = puck.getComponent(UITransform).width;
                let puckPos = puck.getPosition();

                let puckReq = this.jsonFile.json[rightIndex].color;
                
                // Setting the name of particular puck
                puck.name = puckReq
                
                // Fetching the sprite corresponding to index given by puckColor[puckReq]
                let image = puck.getComponent(puckManager).getPuck(puckColor[puckReq])
                
                puck.getComponent(Sprite).spriteFrame = image;

                // gap increasing according to row number
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

    // playBackgroundAudio = () => {
    //     let audioSource = this.node.getComponent(AudioSource);
    //     audioInstance.passAudioSource(audioSource)
    //     audioInstance.playAudio(true);
    // }

   
    start() {
        this.setPuck(2,3,0,0);
    }

    update(deltaTime: number) {
        
    }
}

