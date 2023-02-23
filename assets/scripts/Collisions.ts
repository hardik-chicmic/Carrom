import {
  _decorator,
  Component,
  Node,
  Contact2DType,
  Collider2D,
  Enum,
  IPhysics2DContact,
  RigidBody2D,
  sys,
  Label,
  Prefab,
  instantiate,
  Sprite,
  SpriteFrame
} from "cc";
const { ccclass, property } = _decorator;

import { puckManager } from "./puckManager";

import puckColor from './puckColor';

@ccclass("Collisions")
export class Collisions extends Component {
  @property({type: Node})
  striker: Node = null;

  @property({type: Node})
  blackHoleArr: Node[] = []

  @property({type: Node})
  Score: Node = null;

  @property({type:Prefab})
  puck:Prefab = null;

  blackCount = 0;
  whitecount = 0;
  redCount = 0;
  score = 0;

  onLoad() {
    this.blackHoleArr[0].name = "hole1";
    this.blackHoleArr[1].name = "hole2";
    this.blackHoleArr[2].name = "hole3";
    this.blackHoleArr[3].name = "hole4";
  }

  start() {
    let collider1 = this.blackHoleArr[0].getComponent(Collider2D);
    let collider2 = this.blackHoleArr[1].getComponent(Collider2D);
    let collider3 = this.blackHoleArr[2].getComponent(Collider2D);
    let collider4 = this.blackHoleArr[3].getComponent(Collider2D);

    if (collider1) {
      collider1.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    if (collider2) {
      collider2.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    if (collider3) {
      collider3.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
    if (collider4) {
      collider4.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    // will be called once when two colliders begin to contact
    if (
      selfCollider.node.name == "hole1" &&
      otherCollider.node.name == "striker"
    ) {
      
        console.log("Hole1 Detected");
        
    } else if (
      selfCollider.node.name == "hole2" &&
      otherCollider.node.name == "striker"
    ) {
      console.log("hole2 detected");
      
    } else if (
      selfCollider.node.name == "hole3" &&
      otherCollider.node.name == "striker"
    ) {
      console.log("hole3 detected");
      
    } else if (
      selfCollider.node.name == "hole4" &&
      otherCollider.node.name == "striker"
    ) {
      console.log("hole4 detected");
      
    } else if (
      selfCollider.node.name == "hole4" &&
      otherCollider.node.name == "striker"
    ) {
      console.log("hole4 detected");
      
    } else {
      let collidedPuck: Node = otherCollider.node;
      if (collidedPuck.name == "white") {
        this.whitecount++;
        sys.localStorage.setItem(collidedPuck.name, String(this.whitecount))
      } else if (collidedPuck.name == "black") {
        this.blackCount++;
        sys.localStorage.setItem(collidedPuck.name, String(this.blackCount))
      } else if (collidedPuck.name == "red") {
        this.redCount++;
        sys.localStorage.setItem(collidedPuck.name, String(this.redCount))
      }
      
      this.score = Number(this.blackCount*10) + Number(this.whitecount*20) + Number(this.redCount*50);
      sys.localStorage.setItem("Score", String(this.score))
      
      // Destroy should be kept in setTimeout
      setTimeout(() => {
        collidedPuck.destroy()
      })
      
    }
    
  }

  update(deltaTime: number) {}
}
