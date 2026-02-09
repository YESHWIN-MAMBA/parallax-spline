import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export function startScene({ canvas, onPopulateReady } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05060a, 8, 28);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    140,
  );
  camera.position.set(0, 0.22, 11.2);

  // Softer lights (closer to screenshot)
  const key = new THREE.DirectionalLight(0xffffff, 0.95);
  key.position.set(5, 7, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x7a5cff, 0.45);
  fill.position.set(-7, 2.5, 8);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x00ffb8, 0.32);
  rim.position.set(0, -2, 10);
  scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, 0.24));

  const grid = new THREE.GridHelper(80, 80, 0x232a46, 0x151a2c);
  grid.position.y = -2.15;
  grid.material.transparent = true;
  grid.material.opacity = 0.4;
  scene.add(grid);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
      color: 0x070914,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.5,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -2.25;
  scene.add(ground);

  const rig = new THREE.Group();
  scene.add(rig);

  const palette = [0x7a5cff, 0x2c4dff, 0xff2bd6, 0x00ffb8, 0xffd400];

  // Less glossy
  const mkMat = (hex, opts = {}) =>
    new THREE.MeshPhysicalMaterial({
      color: hex,
      roughness: 0.62,
      metalness: 0.02,
      clearcoat: 0.2,
      clearcoatRoughness: 0.85,
      envMapIntensity: 0.25,
      ...opts,
    });

  function roundedBlock({ size = 1.5, radius = 0.35, color = 0x7a5cff }) {
    const geo = new RoundedBoxGeometry(size, size, size, 6, radius);
    const mesh = new THREE.Mesh(geo, mkMat(color));
    mesh.userData.seed = Math.random() * 1000;
    return mesh;
  }
  function sphere({ r = 1.05, color = 0x00ffb8 }) {
    const geo = new THREE.SphereGeometry(r, 48, 48);
    const mesh = new THREE.Mesh(
      geo,
      mkMat(color, { roughness: 0.55, clearcoat: 0.12 }),
    );
    mesh.userData.seed = Math.random() * 1000;
    return mesh;
  }

  const objects = [];
  function clearObjects() {
    for (const o of objects) rig.remove(o);
    objects.length = 0;
  }

  function populate() {
    clearObjects();

    const bigLeft = roundedBlock({ size: 3.05, radius: 0.62, color: 0x2c4dff });
    bigLeft.position.set(-4.2, -1.05, 0.35);

    const topPink = roundedBlock({ size: 1.75, radius: 0.55, color: 0xff2bd6 });
    topPink.position.set(-1.85, 1.75, 0.55);
    topPink.rotation.set(0.15, -0.35, 0.12);

    const topBlue = roundedBlock({ size: 2.35, radius: 0.62, color: 0x7a5cff });
    topBlue.position.set(2.7, 1.25, -1.3);
    topBlue.rotation.set(0.12, -0.55, 0.05);

    const rightGreen = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 48, 48),
      mkMat(0x00ffb8, { roughness: 0.52, clearcoat: 0.1 }),
    );
    rightGreen.position.set(3.9, -0.65, -0.55);
    rightGreen.userData.seed = Math.random() * 1000;

    const midYellow = roundedBlock({
      size: 1.25,
      radius: 0.42,
      color: 0xffd400,
    });
    midYellow.position.set(4.6, 1.05, 0.95);

    const midPink = roundedBlock({ size: 1.05, radius: 0.38, color: 0xff2bd6 });
    midPink.position.set(3.1, 0.05, 1.45);

    const centerGreenSmall = roundedBlock({
      size: 1.05,
      radius: 0.38,
      color: 0x00ffb8,
    });
    centerGreenSmall.position.set(-0.4, -0.55, 0.55);

    const extras = [];
    for (let i = 0; i < 12; i++) {
      const c = palette[(Math.random() * palette.length) | 0];
      const size = 0.55 + Math.random() * 0.85;
      const r = 0.18 + Math.random() * 0.25;

      const e =
        Math.random() < 0.35
          ? sphere({ r: size * 0.52, color: c })
          : roundedBlock({ size, radius: r, color: c });

      e.position.set(
        Math.random() * 14 - 7,
        Math.random() * 5.8 - 2.9,
        Math.random() * -8 + 1.2,
      );
      e.rotation.set(
        (Math.random() - 0.5) * 0.55,
        (Math.random() - 0.5) * 0.55,
        (Math.random() - 0.5) * 0.55,
      );

      // keep center clear for text
      if (Math.abs(e.position.x) < 1.6 && Math.abs(e.position.y) < 1.0) {
        e.position.x += e.position.x < 0 ? -2.2 : 2.2;
        e.position.y += e.position.y < 0 ? -1.4 : 1.4;
      }
      extras.push(e);
    }

    const all = [
      bigLeft,
      topPink,
      topBlue,
      rightGreen,
      midYellow,
      midPink,
      centerGreenSmall,
      ...extras,
    ];
    for (const o of all) {
      rig.add(o);
      objects.push(o);
    }
  }

  // Hover + click
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2(0, 0);
  let hovered = null;

  function setHovered(obj) {
    if (hovered === obj) return;
    if (hovered) {
      hovered.material.emissive?.set?.(0x000000);
      hovered.material.emissiveIntensity = 0;
    }
    hovered = obj;
    if (hovered) {
      hovered.material.emissive = new THREE.Color(0xffffff);
      hovered.material.emissiveIntensity = 0.06;
    }
    document.body.style.cursor = hovered ? "pointer" : "default";
  }

  const targetParallax = { x: 0, y: 0 };
  const parallax = { x: 0, y: 0 };

  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetParallax.x = e.clientX / window.innerWidth - 0.5;
      targetParallax.y = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );

  window.addEventListener("click", () => {
    if (!hovered) return;
    hovered.userData.impulse = 1.0;
    hovered.material.emissiveIntensity = 0.12;
  });

  function scrollT() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();
    const s = scrollT();

    parallax.x += (targetParallax.x - parallax.x) * 0.06;
    parallax.y += (targetParallax.y - parallax.y) * 0.06;

    // scroll depth
    const targetZ = THREE.MathUtils.lerp(11.2, 7.4, Math.min(1, s * 1.05));
    const targetY = THREE.MathUtils.lerp(0.22, -0.62, Math.min(1, s * 1.1));
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;

    rig.position.x += (-parallax.x * 0.95 - rig.position.x) * 0.05;
    rig.position.y += (parallax.y * 0.6 - rig.position.y) * 0.05;

    const rx = -parallax.y * 0.1 + THREE.MathUtils.lerp(0.02, -0.07, s);
    const ry = -parallax.x * 0.12 + THREE.MathUtils.lerp(-0.08, 0.1, s);
    rig.rotation.x += (rx - rig.rotation.x) * 0.04;
    rig.rotation.y += (ry - rig.rotation.y) * 0.04;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(objects, false);
    setHovered(hits.length ? hits[0].object : null);

    for (const o of objects) {
      const seed = o.userData.seed ?? 0;
      const floatY = Math.sin(t * 0.85 + seed) * 0.07;
      const floatX = Math.cos(t * 0.52 + seed * 0.7) * 0.05;

      if (o.userData._baseY === undefined) o.userData._baseY = o.position.y;
      if (o.userData._baseX === undefined) o.userData._baseX = o.position.x;

      o.position.y += (o.userData._baseY + floatY - o.position.y) * 0.06;
      o.position.x += (o.userData._baseX + floatX - o.position.x) * 0.05;

      o.rotation.y += dt * 0.045;
      o.rotation.x += dt * 0.025;

      if (o.userData.impulse) {
        o.userData.impulse *= 0.88;
        const k = o.userData.impulse;
        o.scale.setScalar(1 + k * 0.07);
        o.position.z += k * -0.06;
        if (k < 0.02) {
          o.userData.impulse = 0;
          o.scale.setScalar(1);
        }
      }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  populate();
  animate();

  if (typeof onPopulateReady === "function") onPopulateReady(populate);

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    },
    { passive: true },
  );

  return { populate };
}
