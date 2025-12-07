import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

const MODEL_URL = new URL('../bee/honey-bee/source/bee.glb', import.meta.url)
const BEE_SCALE = 0.7
const SECTION_TARGETS = [
  {
    id: 'hero',
    selector: '.pf-hero-section',
    position: { x: 1.7, y: 0.4, z: -1.0 },
    rotation: { x: 0.05, y: -1.5, z: 0 }
  },
  {
    id: 'about-me',
    selector: '#about-me',
    position: { x: -1.5, y: 0.10, z: 0.1 },
    rotation: { x: 0.12, y: -1.8, z: -0.05 }
  },
  {
    id: 'skills',
    selector: '#skills',
    position: { x: 2.2, y: -1.0, z: -2.5 },
    rotation: { x: 0.2, y: -3.1, z: 0.05 }
  },
  {
    id: 'projects',
    selector: '#projects',
    position: { x: -2.0, y: 0.2, z: 0 },
    rotation: { x: 0.05, y: -1.25, z: 0 }
  },
  {
    id: 'experience',
    selector: '#experience',
    position: { x: 1.8, y: -0.2, z: 0 },
    rotation: { x: 1.6, y: 2.5, z: 6 }
  },
  {
    id: 'contacts',
    selector: '#contacts',
    position: { x: 3.5, y: 1.5, z: 2.5 },
    rotation: { x: -0.5, y: 1.5, z: 0 }
  }
]

export default function BeeFloat({ accent = '#f3c653' }) {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const mixerRef = useRef(null)
  const beeGroupRef = useRef(null)
  const currentSectionRef = useRef('hero')
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 13)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const hemi = new THREE.HemisphereLight(0xffffff, 0x080820, 2.5)
    scene.add(hemi)
    const dir = new THREE.DirectionalLight(0xffffff, 8)
    dir.position.set(6, 8, 10)
    scene.add(dir)

    const beeGroup = new THREE.Group()
    scene.add(beeGroup)
    beeGroupRef.current = beeGroup

    const loader = new GLTFLoader()
    const accentColor = new THREE.Color(accent)
    // texture loader for external textures (Vite resolves these URLs)
    const texLoader = new THREE.TextureLoader()
    const textures = {
      base: texLoader.load(new URL('../bee/honey-bee/textures/gltf_embedded_0.png', import.meta.url).href),
      normal: texLoader.load(new URL('../bee/honey-bee/textures/gltf_embedded_2.png', import.meta.url).href),
      ao: texLoader.load(new URL('../bee/honey-bee/textures/gltf_embedded_1@channels=A.png', import.meta.url).href),
      metalRough: texLoader.load(new URL('../bee/honey-bee/textures/gltf_embedded_3@channels=R.png', import.meta.url).href)
    }
    // helpful debug info: resolved texture URLs (view in browser console)
    console.log('Bee textures resolved:', {
      base: new URL('../bee/honey-bee/textures/gltf_embedded_0.png', import.meta.url).href,
      normal: new URL('../bee/honey-bee/textures/gltf_embedded_2.png', import.meta.url).href,
      ao: new URL('../bee/honey-bee/textures/gltf_embedded_1@channels=A.png', import.meta.url).href,
      metalRough: new URL('../bee/honey-bee/textures/gltf_embedded_3@channels=R.png', import.meta.url).href
    })
    loader.load(
      MODEL_URL.href,
      (gltf) => {
        // log GLTF image refs to confirm whether textures are embedded or external
        try {
          console.log('Loaded GLTF:', gltf)
          console.log('GLTF images:', gltf.parser?.json?.images)
        } catch (e) {
          console.warn('Could not log gltf parser images', e)
        }
        const bee = gltf.scene
        bee.scale.set(BEE_SCALE, BEE_SCALE, BEE_SCALE)
        bee.rotation.set(0, Math.PI / 2, 0)
        bee.traverse((child) => {
          if (child.isMesh && child.material) {
            const applyTo = (mat) => {
              // assign base color map if model doesn't already provide one
              if (!mat.map && textures.base) {
                // assign base color map (leave encoding as loader default to avoid bundler warnings)
                mat.map = textures.base
              }
              // normal map
              if (!mat.normalMap && textures.normal) mat.normalMap = textures.normal
              // ao map
              if (!mat.aoMap && textures.ao) mat.aoMap = textures.ao
              // metalness/roughness packed texture (if applicable)
              if (!mat.metalnessMap && textures.metalRough) mat.metalnessMap = textures.metalRough

              mat.roughness = mat.roughness !== undefined ? mat.roughness : 0.35
              mat.metalness = mat.metalness !== undefined ? mat.metalness : 0.2
              if (mat.emissive) {
                mat.emissive.lerp(accentColor.clone().multiplyScalar(0.15), 0.35)
              } else {
                mat.emissive = accentColor.clone().multiplyScalar(0.15)
              }
              mat.needsUpdate = true
            }

            if (Array.isArray(child.material)) {
              child.material.forEach(applyTo)
            } else {
              applyTo(child.material)
            }
          }
        })
        beeGroup.add(bee)

        if (gltf.animations?.length) {
          const mixer = new THREE.AnimationMixer(bee)
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip)
            action.play()
          })
          mixerRef.current = mixer
        }

        moveBeeToSection('hero', true)
      },
      undefined,
      (err) => console.error('Failed to load bee model', err)
    )

    const clock = new THREE.Clock()
    const animate = () => {
      const delta = clock.getDelta()
      mixerRef.current?.update(delta)
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()

    const handleScroll = () => {
      const active = getActiveSection()
      if (active && active !== currentSectionRef.current) {
        currentSectionRef.current = active
        moveBeeToSection(active)
      }
    }
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      mixerRef.current?.stopAllAction()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [accent])

  const getActiveSection = () => {
    for (const target of SECTION_TARGETS) {
      const el = document.querySelector(target.selector)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.25) {
        return target.id
      }
    }
    return 'hero'
  }

  const moveBeeToSection = (sectionId, immediate = false) => {
    const beeGroup = beeGroupRef.current
    if (!beeGroup) return
    const target = SECTION_TARGETS.find((s) => s.id === sectionId)
    if (!target) return
    const duration = immediate ? 0.01 : 2
    gsap.to(beeGroup.position, {
      x: target.position.x,
      y: target.position.y,
      z: target.position.z,
      duration,
      ease: 'power2.out'
    })
    gsap.to(beeGroup.rotation, {
      x: target.rotation.x,
      y: target.rotation.y,
      z: target.rotation.z,
      duration,
      ease: 'power2.out'
    })
  }

  return <div className="pf-bee-root" ref={mountRef} aria-hidden="true" />
}