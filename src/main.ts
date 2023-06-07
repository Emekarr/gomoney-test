import infrastructure from "./infrastructure";
import "reflect-metadata";

class App {
  constructor() {
    infrastructure();
  }
}

new App();
