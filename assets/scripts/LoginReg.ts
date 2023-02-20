import { _decorator, Component, Node, EditBox, Input, UITransform, JsonAsset } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('LoginReg')
export class LoginReg extends Component {
    @property({type: EditBox})
    Name: EditBox = null;

    @property({type: EditBox})
    userName: EditBox = null;

    @property({type: EditBox})
    password: EditBox = null;

    @property({type: EditBox})
    confirmPassword: EditBox = null;

    @property({type: EditBox})
    mobile: EditBox = null;

    @property({type: Node})
    arrow: Node = null;

    @property({type: JsonAsset})
    countries: JsonAsset = null;

    onLoad(){
        this.node.getChildByName("ScrollView").active = false;
        this.arrow.on(Input.EventType.MOUSE_DOWN, this.increaseScrollWidth)
    }

    increaseScrollWidth = () => {
        this.node.getChildByName("ScrollView").getComponent(UITransform).height = 600;
        this.node.getChildByName("ScrollView").active = true;
    }

    start() {
        
    }

    update(deltaTime: number) {
        
    }
}

