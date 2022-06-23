import { modFox, modScene } from "./ui";
import {
  DAY_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  NIGHT_LENGTH,
  RAIN_CHANCE,
  SCENES,
} from "./constants";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,

  tick() {
    this.clock++, console.log("clock", this.clock);
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
      console.log("inside else if");
    } else if (this.clock === this.dieTime) {
      this.die();
    }
    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    this.wakeTime = -1;
    modFox("idling");
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    console.log("here", this.clock);
    this.hungryTime = getNextHungerTime(this.clock);
  },
  getHungry() {
    console.log("hungry called");
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  die() {
    console.log("die");
    this.current = "DYING";
  },
  sleep() {
    this.current = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  handleUserActions(icon) {
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      console.log("doing nothing");
      // do nothing
      return;
    }
    if (this.current == "INIT" || (this.current == this.current) == "DEAD") {
      this.startGame();
      return;
    }

    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "feed":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("chnage weather");
  },
  cleanUpPoop() {
    console.log("clean up poop");
  },
  feed() {
    console.log("feed");
  },
};
export const handleUserActions = gameState.handleUserActions.bind(gameState);
export default gameState;
