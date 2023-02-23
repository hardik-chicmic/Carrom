import { _decorator, Component, Node, Button, EditBox, director } from 'cc';
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
        // director.preloadScene("board");
        this.loginButton.getComponent(Button).node.on("click", this.login)
    }

    login = () => {
        let emailReg = new RegExp("[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?")

        let passReg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

        const req = new XMLHttpRequest();
        req.open("POST", "http://3.18.231.59:4002/v1/user/login", true)

        let body = {
            email: this.email.getComponent(EditBox).string,
            password: this.password.getComponent(EditBox).string
        }
        let headers = {
            "apiKey": "HUMBLE_d59167bab8280dcvgs445g8a8af98cb428584676e_MINOR",
            "Content-Type": "application/json"
        }
        
        if(emailReg.test(body["email"]) && passReg.test(body["password"])){
            console.log(req.response);
        }else{
            if(!emailReg.test(body["email"])){
                console.log("Email dont match");
                
            }else if(!passReg.test(body["password"])){
                console.log("Password dont match");
                
            }
        }

        req.setRequestHeader("apiKey", headers["apiKey"])
        req.setRequestHeader("Content-Type", headers['Content-Type'])

        req.onreadystatechange = function(){
            console.log(req.response);
            
            director.loadScene("board")
        }
        
        // Stringify converts it to string
        req.send(JSON.stringify(body));
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

