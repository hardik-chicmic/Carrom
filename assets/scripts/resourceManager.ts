import { _decorator, Component, Node, SpriteFrame, Sprite, tween, director, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import singletonInstance from './singleton';

import { resources } from 'cc';

@ccclass('resourceManager')
export class resourceManager extends Component {
    spriteArr:SpriteFrame[] = []

    @property({type: Node})
    loader: Node = null;

    @property({type:Node})
    background: Node = null;

    onLoad(){
        director.preloadScene("Login")
    }

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
        this.background.getComponent(Sprite).spriteFrame = backgroundImage;
        

        tween(this.loader).by(4, {angle: -360}).repeatForever().start();
        
        setTimeout(() => {
            this.node.getChildByName("loading icon").active = false;
            this.node.getChildByName("loader").active = false;
            this.fetchLogo();
        }, 2000)
        
    }

    fetchLogo(){
        director.loadScene("Login")
    }
    

    start() {
        this.fetchResource();
    }

    update(deltaTime: number) {
        
    }
}

