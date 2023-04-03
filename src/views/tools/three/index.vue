<template>
  <div :id="id" />
</template>
<script>
import * as THREE from 'three'
export default {
  data() {
    return {
      id: `tr_${~~(Math.random() * 10000000)}`,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      )
      camera.position.z = 1

      const scene = new THREE.Scene()

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new THREE.MeshNormalMaterial()

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setAnimationLoop(animation)

      document.querySelector(`#${this.id}`).appendChild(renderer.domElement)

      // animation

      function animation(time) {
        mesh.rotation.x = time / 2000
        mesh.rotation.y = time / 1000

        renderer.render(scene, camera)
      }
    },
  },
}
</script>
