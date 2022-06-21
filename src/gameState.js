const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  tick() {
    this.clock++, console.log("clock", this.clock);
    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    this.wakeTime = -1;
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
