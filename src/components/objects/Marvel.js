import * as THREE from "three";

export default class Marvel extends THREE.Group {
  constructor(name, marvelData) {
    super();

    this.name = name
    this.bodyHeight = 3.5
    this.marvelGeometry = new THREE.CylinderBufferGeometry(0.4, 0.1, this.bodyHeight, 15, 15)
    this.marvelMaterial = new THREE.MeshBasicMaterial({color: '#ff0000'})
    this.marvelMesh = new THREE.Mesh(this.marvelGeometry, this.marvelMaterial)
    this.marvelMesh.type = 'marvel'
    this.marvelMesh.rotation.x = Math.PI/2
    // this.marvelGeometry = new THREE.SphereBufferGeometry(0.4, 15, 15)
    // this.marvelMaterial = new THREE.MeshBasicMaterial({color: '#ff0000'})
    // this.marvelMesh = new THREE.Mesh(this.marvelGeometry, this.marvelMaterial)
    this.add(this.marvelMesh)
    this.label = this.makeLabel( marvelData.width, 32, this.name)
    this.add(this.label)

    this.setPosition({x: marvelData.x, y:-marvelData.y, z: this.bodyHeight/2 + 1})
    this.setScale({x: 0.5, y: 1, z: 1})

  }

  setPosition({x, y, z}) {
    this.position.set(x, y, z)
  }

  setScale({x, y, z}) {
    this.scale.set(x, y, z)
  }

  makeLabel(labelWidth, size, name) {
    this.labelTexture = this.makeLabelTexture(labelWidth, size, name)
    this.texture = new THREE.CanvasTexture(this.labelTexture)

    // because our canvas is likely not a power of 2
    // in both dimensions set the filtering appropriately.
    this.texture.minFilter = THREE.LinearFilter
    this.texture.wrapS = THREE.ClampToEdgeWrapping
    this.texture.wrapT = THREE.ClampToEdgeWrapping

    this.labelMaterial = new THREE.SpriteMaterial({
      map: this.texture,
      transparent: true,
      // opacity: 0.5
    })

    // if units are meters then 0.01 here makes size
    // of the label into centimeters.
    const labelBaseScale = 0.1
    const label = new THREE.Sprite(this.labelMaterial)

    // label.position.y = this.position.y + 1 + size * labelBaseScale
    label.position.z = 3
    label.scale.x = this.labelTexture.width  * labelBaseScale
    label.scale.y = this.labelTexture.height * labelBaseScale

    return label
  }

  makeLabelTexture(baseWidth, size, name) {
    const borderSize = 2;
    const ctx = document.createElement('canvas').getContext('2d')
    const font =  `${size}px bold sans-serif`
    ctx.font = font
    // measure how long the name will be
    const textWidth = ctx.measureText(name).width

    const doubleBorderSize = borderSize * 2
    const width = baseWidth + doubleBorderSize
    const height = size + doubleBorderSize
    ctx.canvas.width = width
    ctx.canvas.height = height

    // need to set font again after resizing canvas
    ctx.font = font
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    ctx.fillStyle = '#4dd6ff'
    ctx.fillRect(0, 0, width, height)

    // scale to fit but don't stretch
    const scaleFactor = Math.min(1, baseWidth / textWidth)
    ctx.translate(width / 2, height / 2)
    ctx.scale(scaleFactor, 1)
    ctx.fillStyle = 'white'
    ctx.fillText(name, 0, 0)

    return ctx.canvas
  }
}