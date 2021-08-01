import * as THREE from "three";

export default class Scene extends THREE.Scene{
  constructor() {
    super();
  }

  init(
    {color} = {color: '#ebfcfb'}
    ) {
    this.background = new THREE.Color(color)
  }
}