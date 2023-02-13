import { _decorator, Component, Node, SpriteFrame } from 'cc';
import { resources } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('singleton')
export class singleton extends Component {
    arr:any = []
    spriteIndex:number;

    /**
     * We are creating a static instance of the singleton class
     */
    static instance: singleton;

    // Constructor is private so that we can't create objects from outside
    private static singleton(){}


    /**
     * 
     * @returns an instance to be used globally for accessing resources
     */
    public static getInstance(): singleton{
        if(singleton.instance == null){
            singleton.instance = new singleton();
        }
        return singleton.instance
    }


    /**
     * 
     * @returns a promise which returns assets array if resolved
     */
    public resourceLoad(){
        resources.preloadDir("Carrom", SpriteFrame)

        // loadDir takes time to load resources therefore we are returning a promise that when this callback is resolved perform operations
        return new Promise<SpriteFrame[]>((resolve, reject) => {
            resources.loadDir("Carrom", SpriteFrame, (err, assets) => {
                this.arr = assets;
                if(!err){
                    resolve(assets);
                }else{
                    reject(err);
                }
            })
        })
    }
    /**
     * 
     * @param name spriteName
     * @returns the index of sprite from sprite array
     */
    public indexAsset(name: string): number{
        this.spriteIndex = this.arr.findIndex(spriteFrameObj=>spriteFrameObj.name === name)
        return this.spriteIndex;
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}
let singletonInstance = singleton.getInstance();

export default singletonInstance
