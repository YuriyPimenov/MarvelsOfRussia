// import * as THREE from "three"
//
// export default class Region extends THREE.Group{
//   constructor(name, regionData) {
//     super();
//
//     this.name = name
//     this.regionMesh = null
//     for (let key2 in regionData) {
//       const area = regionData[key2]
//       // Площадь региона
//       const shapePoints = area.map(p => {return new THREE.Vector2(p[0], (p[1] > 0 ? -p[1] : Math.abs(p[1]) - 360) )})
//       const shape = new THREE.Shape(shapePoints)
//
//       const extrudeGeom = new THREE.ExtrudeBufferGeometry( shape, this.paramsMap.extrudeSettings )
//       const mat = new THREE.MeshBasicMaterial( { color: this.paramsMap.colors.idle } )
//       const mesh = new THREE.Mesh(extrudeGeom, mat)
//
//       mesh.name = `${key}`
//       mesh.pts = area
//       mesh.isClicked = false
//       this.add(mesh)
//       this.managerObjects.checkedObjects.push(mesh)
//       // Граница региона
//       const borderPoints = area.map(p => {return new THREE.Vector3(p[0], (p[1] > 0 ? -p[1] : Math.abs(p[1]) - 360) , 0)})
//       const borderGeometry = new THREE.BufferGeometry().setFromPoints( borderPoints )
//
//       const line = new THREE.Line( borderGeometry, this.borderMaterial )
//       line.translateZ(this.paramsMap.extrudeSettings.depth + 0.01)
//       this.add(line)
//     }
//   }
// }