import Raycaster from './Raycaster'
import Scene from "./Scene"
import PerspectiveCamera from "./PerspectiveCamera"
import ManagerControls from "./ManagerControls"
import ManagerEvents from "./ManagerEvents"
import Renderer from "./Renderer"
import Mouse from "./Mouse";
import ManagerObjects from "./ManagerObjects";
import ManagerDom from "./ManagerDom";

export default class WebGLApp {
  constructor({selectors: {canvasSelector, regionTitleSelector}}) {
    this.canvas = document.querySelector(canvasSelector) ||  null

    this.managerDom = new ManagerDom({regionTitleSelector})
    if (!this.canvas) {
      throw new Error('Canvas is wrong')
    }

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.mouse = new Mouse()

    this.raycaster = new Raycaster()

    this.scene = new Scene()
    this.scene.init()

    this.perspectiveCamera = new PerspectiveCamera()
    this.perspectiveCamera.init()

    this.scene.add(this.perspectiveCamera)

    this.renderer = new Renderer({canvas: this.canvas})
    this.renderer.init(this.sizes)

    this.managerObjects = new ManagerObjects(this.scene)
    this.managerObjects.init()

    this.managerControls = new ManagerControls({camera: this.perspectiveCamera, canvas: this.canvas})
    this.managerControls.setOrbitControl({enableDamping: true, minDistance: 1,maxDistance: 10000, maxPolarAngle: Math.PI/2})

    this.managerEvents = new ManagerEvents(this.sizes, this.perspectiveCamera, this.renderer, this.mouse, this.managerObjects, this.managerDom)

    this.tick = this.tick.bind(this)
  }

  render() {

    this.tick()
  }

  tick() {

    // Raycaster
    this.raycaster.setFromCamera(this.mouse, this.perspectiveCamera)
    const intersects = this.raycaster.intersectObjects(this.managerObjects.getCheckedObjects(), true)
    this.managerObjects.update(intersects)

    // Update controls
    this.managerControls.getControl().update()

    // Render
    this.renderer.render(this.scene, this.perspectiveCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick)
  }

}