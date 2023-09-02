// orbitScript.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const sun = document.querySelector('.sun');
//const earth = document.querySelector('.earth');
//const moon = document.querySelector('.moon');

// Create sun and earth meshes
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

const earthGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x287ab8 });
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);
const earthTrailPoints = [];
const maxEarthTrailLength = 1000;

const moonGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xe5e5e5 });
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);
const moonTrailPoints = [];
const maxMoonTrailLength = 100;

const marsGeometry = new THREE.SphereGeometry(0.18, 32, 32);
const marsMaterial = new THREE.MeshBasicMaterial({ color: 0xad6242 });
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(marsMesh);
const marsTrailPoints = [];
const maxMarsTrailLength = 1000;

// Set initial positions
sunMesh.position.set(0, 0, -50);
earthMesh.position.set(2, 0, -50);
moonMesh.position.set(2.005, 0, -50);
marsMesh.position.set(5, 0, -50);

// Set camera position
camera.position.z = 5;
// Create a function to update the celestial bodys' position
let earthAngle = 0;
let moonAngle = 0;
let marsAngle = 0;
// Set the desired orbital period in seconds (e.g., 10 seconds for a slower orbit)
const earthOrbitalPeriodInSeconds = 36.5;
const moonOrbitalPeriodInSeconds = 2.8;
const marsOrbitalPeriodInSeconds = 68.7;

// Calculate the angular velocity (radians per second) for the given orbital period
const earthAngularVelocity = (Math.PI) / earthOrbitalPeriodInSeconds;
const moonAngularVelocity = (Math.PI) / moonOrbitalPeriodInSeconds;
const marsAngularVelocity = (Math.PI) / marsOrbitalPeriodInSeconds;

function animate() {
    requestAnimationFrame(animate);

    // Update Earth's position in a circular orbit
    earthAngle += earthAngularVelocity * 0.016; // 0.016 is a frame time adjustment for smooth animation
    moonAngle += moonAngularVelocity * 0.016;
    marsAngle += marsAngularVelocity * 0.016;

    const earthRadius = 2;
    earthMesh.position.x = earthRadius * Math.cos(earthAngle);
    earthMesh.position.y = earthRadius * Math.sin(earthAngle);
    const moonRadius = 0.3;
    moonMesh.position.x = earthMesh.position.x + moonRadius * Math.cos(moonAngle);
    moonMesh.position.y = earthMesh.position.y + moonRadius * Math.sin(moonAngle);
    const marsRadius = 5;
    marsMesh.position.x = marsRadius * Math.cos(marsAngle);
    marsMesh.position.y = marsRadius * Math.sin(marsAngle);

    earthTrailPoints.push(new THREE.Vector3(earthMesh.position.x, earthMesh.position.y, earthMesh.position.z));
    moonTrailPoints.push(new THREE.Vector3(moonMesh.position.x, moonMesh.position.y, moonMesh.position.z));
    marsTrailPoints.push(new THREE.Vector3(marsMesh.position.x, marsMesh.position.y, marsMesh.position.z));

    // Remove the oldest trail point if the trail is too long
    if (earthTrailPoints.length > maxEarthTrailLength) {
        earthTrailPoints.shift();
    }
    if (moonTrailPoints.length > maxMoonTrailLength) {
        moonTrailPoints.shift();
    }
    if (marsTrailPoints.length > maxMarsTrailLength) {
        marsTrailPoints.shift();
    }

    //// Create a trail line using the trailPoints
    const earthTrailGeometry = new THREE.BufferGeometry().setFromPoints(earthTrailPoints);
    const earthTrailMaterial = new THREE.LineBasicMaterial({ color: 0x287ab8 });
    const earthTrailLine = new THREE.Line(earthTrailGeometry, earthTrailMaterial);

    const moonTrailGeometry = new THREE.BufferGeometry().setFromPoints(moonTrailPoints);
    const moonTrailMaterial = new THREE.LineBasicMaterial({ color: 0xe5e5e5 });
    const moonTrailLine = new THREE.Line(moonTrailGeometry, moonTrailMaterial);

    const marsTrailGeometry = new THREE.BufferGeometry().setFromPoints(marsTrailPoints);
    const marsTrailMaterial = new THREE.LineBasicMaterial({ color: 0xad6242 })
    const marsTrailLine = new THREE.Line(marsTrailGeometry, marsTrailMaterial);

    // Remove the previous trail (if any) and add the new trail line to the scene
    scene.remove(scene.getObjectByName('earthTrailLine'));
    earthTrailLine.name = 'earthTrailLine';
    scene.add(earthTrailLine);

    scene.remove(scene.getObjectByName('moonTrailLine'));
    moonTrailLine.name = 'moonTrailLine';
    scene.add(moonTrailLine);

    scene.remove(scene.getObjectByName('marsTrailLine'));
    marsTrailLine.name = 'marsTrailLine';
    scene.add(marsTrailLine);

    renderer.render(scene, camera);
}

animate();
