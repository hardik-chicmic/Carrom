import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

import singletonInstance from './singleton';

import { resources } from 'cc';

@ccclass('resourceManager')
export class resourceManager extends Component {
    spriteArr:SpriteFrame[] = []

    /**
     * This function waits for the promise to resolve and if it is resolved then it is assigning the array to spriteArr
     */
    async fetchResource(){
        this.spriteArr = await singletonInstance.resourceLoad();
        this.fetchBackground();
    }

    /**
     * This function is setting the background image
     */

    fetchBackground(){
        let backgroundImage = this.spriteArr[singletonInstance.indexAsset("bg")];
        this.node.getComponent(Sprite).spriteFrame = backgroundImage;
        
        setTimeout(() => {
            this.node.getChildByName("loading icon").active = false;
            this.node.getChildByName("loader").active = false;
            this.fetchLogo();
        }, 2000)
        
    }

    fetchLogo(){
        let logo = this.spriteArr[singletonInstance.indexAsset("logo")];
        let oneVone = this.node.getChildByName("1v1");
        oneVone.getComponent(Sprite).spriteFrame = logo;
    }
    

    start() {
        this.fetchResource();
    }

    update(deltaTime: number) {
        
    }
}

