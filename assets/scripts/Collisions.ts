import {
  _decorator,
  Component,
  Node,
  Contact2DType,
  Collider2D,
  Enum,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;

import { puckManager } from "./puckManager";

@ccclass("Collisions")
export class Collisions extends Component {
  @property({type: Node})
  blackHoleArr: Node[] = []

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
    if (!selfCollider && !otherCollider) {
      return;
    }
    if (
      selfCollider.node.name == "hole1" &&
      otherCollider.node.name == "striker"
    ) {
      console.log("hole1 detected");
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
        this.score += 20;
      } else if (collidedPuck.name == "black") {
        this.score += 10;
      } else if (collidedPuck.name == "red") {
        this.score += 50;
      }
      

      // Destroy should be kept in setTimeout
      setTimeout(() => {
        collidedPuck.destroy()
      })
    }
  }

  update(deltaTime: number) {}
}
