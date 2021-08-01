import * as THREE from "three";

export default class Renderer extends THREE.WebGLRenderer {
  constructor({canvas}) {
    super({canvas})
  }

  init({width, height} = {width: window.innerWidth, height: window.innerHeight}) {
    this.setSizeRenderer({width, height})
    this.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  setSizeRenderer({width, height}) {
    this.setSize(width, height)

  }
}