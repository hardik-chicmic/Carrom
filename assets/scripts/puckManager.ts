import { _decorator, Component, Node, SpriteFrame, Sprite, instantiate, RigidBody2D} from 'cc';
const { ccclass, property } = _decorator;
import { resources } from 'cc';
import puckColor from './puckColor';

@ccclass('puckManager')
export class puckManager extends Component {
    @property({type: SpriteFrame})
    puckArray: SpriteFrame[] = [];


    onLoad(){
        
    }

    /**
     * 
     * @param index it is the index of puck in enum
     * @returns sprite corresponding to the puck
     */
    getPuck(index){
        return this.puckArray[index]
    }

    
    start(){
        
    }

    update(deltaTime: number) {
        
    }
}

