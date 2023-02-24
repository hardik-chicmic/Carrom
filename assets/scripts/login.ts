import { _decorator, Component, Node, Button, EditBox, director, Input } from 'cc';
import { board } from './board';
const { ccclass, property } = _decorator;

@ccclass('login')
export class login extends Component {
    @property({type: Node})
    loginButton: Node = null;

    @property({type: EditBox})
    email: EditBox = null;

    @property({type: EditBox})
    password: EditBox = null;


    // onEnable gets called when nodes active property changes from true to false
    onLoad(){
        director.preloadScene("board")
        this.loginButton.on(Input.EventType.TOUCH_START, this.login)
    }

    login = () => {
        console.log("check1");
        
        // let emailReg = new RegExp("[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?")

        // let passReg = new RegExp("[0-9]")

        const req = new XMLHttpRequest();
        req.open("POST", "http://3.18.231.59:4002/v1/user/login", true)

        let body = {
            email: this.email.getComponent(EditBox).string,
            password: this.password.getComponent(EditBox).string
        }

       
        let apiKey =  "HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR"
        
        
        req.setRequestHeader("apiKey", apiKey)
        req.setRequestHeader("Content-Type", "application/json")

        req.onreadystatechange = function(){
            
            if(req.readyState == 4){
                console.log("check2  init");
                director.loadScene("board")
            }
        }
        
        // Stringify converts it to string
        // if(emailReg.test(body["email"]) && passReg.test(body["password"])){
            
        // }else{
        //     if(body["email"] == "" || body["password"] == ""){
        //         console.log("The field can't be empty");
        //     }else if(!emailReg.test(body["email"])){
        //         console.log("Email dont match");
        //     }
        // }

        req.send(JSON.stringify(body))
        console.log("Check3");
        
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

