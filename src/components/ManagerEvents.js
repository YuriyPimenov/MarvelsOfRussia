import * as THREE from "three";

export default class ManagerEvents {
  constructor(sizes, camera, renderer, mouse, managerObjects, managerDom) {

    this.sizes = sizes
    this.camera = camera
    this.renderer = renderer
    this.mouse = mouse
    this.managerObjects = managerObjects
    this.managerDom = managerDom

    this.handlerResize = this.handlerResize.bind(this)
    this.handlerMousemove = this.handlerMousemove.bind(this)
    this.handlerClick = this.handlerClick.bind(this)


    window.addEventListener('resize', this.handlerResize)
    window.addEventListener('mousemove', this.handlerMousemove)
    window.addEventListener('click', this.handlerClick)

  }

  handlerResize() {
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.init(this.sizes)
  }

  handlerMousemove(event) {
    this.mouse.x = event.clientX / this.sizes.width * 2 - 1
    this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
  }

  handlerClick(event) {
    if (this.managerObjects.getCurrentIntersect()) {
      this.managerObjects.getCurrentIntersect().object.isClicked = !this.managerObjects.getCurrentIntersect().object.isClicked
      this.managerObjects.getCurrentIntersect().object.material.color = this.managerObjects.getCurrentIntersect().object.isClicked ? new THREE.Color(this.managerObjects.getMap().paramsMap.colors.click) : new THREE.Color(this.managerObjects.getMap().paramsMap.colors.hover)

      if (this.managerObjects.getCurrentIntersect().object.isClicked) {
        if (this.managerObjects.getCurrentSelected() !== null && this.managerObjects.getCurrentSelected() !== this.managerObjects.getCurrentIntersect()) {
          this.managerObjects.getCurrentSelected().object.isClicked = false
          this.managerObjects.getCurrentSelected().object.material.color = new THREE.Color(this.managerObjects.getMap().paramsMap.colors.idle)
        }
        this.managerObjects.setCurrentSelected(this.managerObjects.getCurrentIntersect())
      }

      if (!this.managerObjects.getCurrentIntersect().object.isClicked) {
        this.managerObjects.setCurrentSelected(null)
      }

      if (!(this.managerDom.regionTitle instanceof HTMLElement)) {
        this.managerDom.regionTitle = document.getElementById('region-title')
      }
      if (this.managerObjects.getCurrentSelected()) {
        this.managerDom.regionTitle.innerHTML = this.managerObjects.getCurrentSelected().object.name
      }
    }
  }
}