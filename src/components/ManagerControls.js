import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class ManagerControls {
  constructor({camera, canvas}) {
    this.camera = camera
    this.canvas = canvas
    this.controls = {}
    this.setCurrentControl('orbit')
  }

  setCurrentControl(currentControl) {
    this.currentControl = currentControl
  }

  getControl() {
    return this.controls[this.currentControl]
  }

  setOrbitControl({enableDamping, minDistance, maxDistance, maxPolarAngle}) {
    const control = new OrbitControls(this.camera, this.canvas)
    control.enableDamping = enableDamping
    control.minDistance = minDistance
    control.maxDistance = maxDistance
    control.maxPolarAngle = maxPolarAngle

    this.controls['orbit'] = control
  }

}