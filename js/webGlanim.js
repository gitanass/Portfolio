
/**
 * Scene
 */
const scene = new THREE.Scene()


/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight


    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
scene.add(camera)

/**
 * Renderer
 */


const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
renderer.setClearColor( 0x303030 );
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffcccc, 0.2)
scene.add(ambientLight)

const sunLight = new THREE.PointLight(0xffcccc, 1)
sunLight.position.x = 0
sunLight.position.y = 0
sunLight.position.z = 0
scene.add(sunLight)


// load a texture, set wrap mode to repeat


//Asteroids

const asteroidsGeometry = new THREE.Geometry()
const texture = new THREE.TextureLoader().load( "../images/3.png" );

for(let i = 0; i < 1500; i++)
{
    const angle = Math.random() * Math.PI *2

    // Vertice
    const radius = 15 + Math.random() * 300
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    const z = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : - 1) * 100

    const vertice = new THREE.Vector3(x, y, z)
    asteroidsGeometry.vertices.push(vertice)

    // Color
    const color = new THREE.Color(0xffffff)
    asteroidsGeometry.colors.push(color)
    
}

const loader = new THREE.TextureLoader();
const asteroidsMaterial = new THREE.PointsMaterial({
    size: 0.9,
    transparent: true,
    vertexColors: true,
    map: loader.load('../images/3.png')
    
})

const asteroids = new THREE.Points(asteroidsGeometry, asteroidsMaterial)
scene.add(asteroids)

/**
 * Loop
 */
const loop = () =>
{
    
    window.requestAnimationFrame(loop)

    // Render
    renderer.render(scene, camera)

    if (keyboard.z == false) asteroids.position.y += -0.010
    if (keyboard.z == false) asteroids.position.x += -0.010
}

/**
 * keyevents
 */

const keyboard = {}
keyboard.z = false
document.addEventListener('keydown', (_event) =>
{
    switch(_event.code) {
        case 'KeyW':
            keyboard.z = true
            break;
    }
})
document.addEventListener('keyup', (_event) =>
{
    switch(_event.code)
    {
        case 'KeyW':
        keyboard.z = false
        break;
    }
})


loop()
