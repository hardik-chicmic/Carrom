import {
  _decorator,
  Component,
  Node,
  EditBox,
  Input,
  UITransform,
  JsonAsset,
  Prefab,
  instantiate,
  Label,
  Button,
  tween,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("LoginReg")
export class LoginReg extends Component {
  @property({ type: EditBox })
  Name: EditBox = null;

  @property({ type: EditBox })
  userName: EditBox = null;

  @property({ type: EditBox })
  password: EditBox = null;

  @property({ type: EditBox })
  confirmPassword: EditBox = null;

  @property({ type: EditBox })
  mobile: EditBox = null;

  @property({ type: EditBox })
  SelectCountry: EditBox = null;

  @property({ type: Node })
  arrow: Node = null;

  @property({ type: JsonAsset })
  countries: JsonAsset = null;

  @property({ type: Prefab })
  country: Prefab = null;

  @property({ type: Node })
  content: Node = null;

  cnt = 0;
  onLoad() {
    this.node.getChildByName("ScrollView").active = false;
    this.arrow.on(Input.EventType.MOUSE_DOWN, this.increaseScrollWidth);
  }

  increaseScrollWidth = () => {
    // Animation on scroll view
    tween(this.node.getChildByName("ScrollView"))
      .to(0.0462, { scale: new Vec3(1, 0.5, 1) })
      .to(0.046, { scale: new Vec3(1, 1.2, 1) })
      .to(0.046, { scale: new Vec3(1, 1.5, 1) })
      .to(0.066, { scale: new Vec3(1, 1, 1) })
      .to(0.089, { scale: new Vec3(1, 1.15, 1) })
      .start();

    if (this.cnt % 2 == 0) {
      this.node
        .getChildByName("ScrollView")
        .getComponent(UITransform).height = 600;
      this.arrow.angle = -90;
      this.node.getChildByName("ScrollView").active = true;

      for (let i = 0; i < this.countries.json.length; i++) {
        const country = instantiate(this.country);
        country.getComponent(Button).node.on("click", this.buttonClick);
        country.getChildByName("Label").getComponent(Label).string =
          this.countries.json[i].name;
        this.content.addChild(country);
      }
    } else {
      this.arrow.angle = -0;
      this.node.getChildByName("ScrollView").active = false;
    }
    this.cnt++;
  };

  buttonClick = (country) => {
    // Gives the particular button clicked
    this.node.getChildByName("ScrollView").active = false;
    this.arrow.angle = 0;
    this.SelectCountry.getComponent(EditBox).string =
      country.target._children[0].getComponent(Label).string;
  };

  start() {}

  update(deltaTime: number) {}
}
