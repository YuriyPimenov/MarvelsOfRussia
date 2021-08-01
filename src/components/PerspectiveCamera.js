import * as THREE from "three";

export default class PerspectiveCamera extends THREE.PerspectiveCamera{
  constructor({fov, aspect, near, far} = {
                fov : 75,
                aspect : window.innerWidth/window.innerHeight,
                near : 0.1,
                far : 10000
  }) {
    super(fov, aspect, near, far)
  }

  init() {
    this.setPosition({x: 0, y: 17, z: 0})
    this.setLookAt({x: 0, y: 0, z: 0})
  }

  setPosition({x, y, z}) {
    this.position.set(x, y, z)
  }

  setLookAt({x, y, z}) {
    this.lookAt(x, y, z)
  }
}