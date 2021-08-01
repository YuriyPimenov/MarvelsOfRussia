import * as THREE from "three"

import regionsData from '../../data/regions'
import marvelsData from '../../data/marvels'

import Marvel from './Marvel'
// import Region from './Region'

export default class Map extends THREE.Group{
  constructor(managerObjects) {
    super();

    this.regionsData = regionsData
    this.marvelsData = marvelsData
    this.marvels = []
    this.regions = []
    this.paramsMap = {
      colors: {
        'idle': '#229622',
        'hover': '#73d673',
        'click': '#206920',
        'border': '#3c3cc5'
      },
      extrudeSettings: {
        steps: 1,
        depth: 1,
        bevelEnabled: false
      }
    }
    this.managerObjects = managerObjects
    this.borderMaterial = new THREE.LineBasicMaterial( { color: this.paramsMap.colors.border } )
  }

  generate() {
    for (let key in this.regionsData) {
      const regionData = this.regionsData[key]

      for (let key2 in regionData) {
        const area = regionData[key2]
        // Площадь региона
        const shapePoints = area.map(p => {return new THREE.Vector2(p[0], (p[1] > 0 ? -p[1] : Math.abs(p[1]) - 360) )})
        const shape = new THREE.Shape(shapePoints)

        const extrudeGeom = new THREE.ExtrudeBufferGeometry( shape, this.paramsMap.extrudeSettings )
        const mat = new THREE.MeshBasicMaterial( { color: this.paramsMap.colors.idle } )
        const mesh = new THREE.Mesh(extrudeGeom, mat)

        mesh.name = `${key}`
        mesh.pts = area
        mesh.isClicked = false
        mesh.type = 'region'
        this.add(mesh)
        this.managerObjects.checkedObjects.push(mesh)
        // Граница региона
        const borderPoints = area.map(p => {return new THREE.Vector3(p[0], (p[1] > 0 ? -p[1] : Math.abs(p[1]) - 360) , 0)})
        const borderGeometry = new THREE.BufferGeometry().setFromPoints( borderPoints )

        const line = new THREE.Line( borderGeometry, this.borderMaterial )
        line.translateZ(this.paramsMap.extrudeSettings.depth + 0.01)
        this.add(line)
      }
    }

    for (let key in this.marvelsData) {
      const marvelData = this.marvelsData[key]
      const marvel = new Marvel(key, marvelData)

      this.managerObjects.checkedObjects.push(marvel)
      this.marvels.push(marvel)
      this.add(marvel)
    }
  }

  transform() {
    this.position.set(-20, 1, 23)
    this.rotation.set(-Math.PI/2, 0, Math.PI/2)
    this.scale.set(0.4, 0.2, 0.2)
  }
}
