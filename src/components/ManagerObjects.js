import * as THREE from "three"
import Map from './objects/Map'
import Marvel from './objects/Marvel'

export default class ManagerObjects {
  constructor(scene) {
    this.scene = scene
    this.currentIntersect = null
    this.currentSelected = null
    this.checkedObjects = []
  }

  init() {
    const grid = this.getGridHelper()
    this.scene.add(grid)

    this.map = new Map(this)
    this.map.generate()
    this.map.transform()
    this.scene.add(this.map)
  }

  getMap() {
    return this.map
  }

  getCurrentIntersect() {
    return this.currentIntersect
  }

  setCurrentIntersect(currentIntersect) {
    this.currentIntersect = currentIntersect
  }

  getCurrentSelected() {
    return this.currentSelected
  }

  setCurrentSelected(currentSelected) {
    this.currentSelected = currentSelected
  }

  getGridHelper() {
    const grid = new THREE.GridHelper(100, 100)
    return grid
  }

  getCheckedObjects() {
    return this.checkedObjects || []
  }

  update(intersects) {
    // Если есть пересеченные объекты
    if(intersects.length)
    {

      if (
        intersects[0].object.parent instanceof Marvel
      ) {
        console.log(intersects[0].object.parent.name)
        return
      }



      // Если нет текущего объекта, значит мы в первый раз навели мышку на объект
      if(!this.getCurrentIntersect())
      {
        // console.log('mouse enter')
      }

      if (this.getCurrentIntersect() !== null && this.getCurrentIntersect() !== intersects[0]) {
        if (this.getCurrentIntersect().object.isClicked) {
          this.getCurrentIntersect().object.material.color = new THREE.Color(this.getMap().paramsMap.colors.click)
        }

        if (!this.getCurrentIntersect().object.isClicked) {
          this.getCurrentIntersect().object.material.color = new THREE.Color(this.getMap().paramsMap.colors.idle)
        }

      }

      this.setCurrentIntersect(intersects[0])
      if (!this.getCurrentIntersect().object.isClicked) {
        this.getCurrentIntersect().object.material.color = new THREE.Color(this.getMap().paramsMap.colors.hover)
      }

      if (this.getCurrentIntersect().object.isClicked) {
        this.getCurrentIntersect().object.material.color = new THREE.Color(this.getMap().paramsMap.colors.click)
      }
    }
    // Если нету объектов
    else
    {
      // Если есть текущий объект, значит мы отвели мышку и надо стирать текущий объект
      if(this.getCurrentIntersect())
      {
        // console.log('mouse leave')
        if (!this.getCurrentIntersect().object.isClicked)
          this.getCurrentIntersect().object.material.color = new THREE.Color(this.getMap().paramsMap.colors.idle)

      }

      this.setCurrentIntersect(null)
    }
  }

}