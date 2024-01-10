// orbitScript.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const sun = document.querySelector('.sun');
//const earth = document.querySelector('.earth');
//const moon = document.querySelector('.moon');

// Create sun mesh
const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xfdb813 });
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

// Create planet meshes (and moons)
// M V E M J S U N P

const mercuryGeometry = new THREE.SphereGeometry(0.05, 32, 32);
const mercuryMaterial = new THREE.MeshBasicMaterial({ color: 0x5A5A5A });
const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercuryMesh);
const mercuryTrailPoints = [];
const maxMercuryTrailLength = 300;

const venusGeometry = new THREE.SphereGeometry(0.18, 32, 32);
const venusMaterial = new THREE.MeshBasicMaterial({ color: 0xeed053 });
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venusMesh);
const venusTrailPoints = [];
const maxVenusTrailLength = 300;

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
sunMesh.position.set(0, 0, -20);
mercuryMesh.position.set(0.8, 0, -20);
venusMesh.position.set(0.14, 0, -20);
earthMesh.position.set(2, 0, -20);
moonMesh.position.set(2.005, 0, -20);
marsMesh.position.set(5, 0, -20);

// Set camera position
camera.position.z = 5;
// Create a function to update the celestial bodys' position
let mercuryAngle = 0;
let venusAngle = 0;
let earthAngle = 0;
let moonAngle = 0;
let marsAngle = 0;

// Set the desired orbital period in seconds (e.g., 356 days --> 36.5s seconds)
const mercuryOrbitalPeriodInSeconds = 8.8;
const venusOrbitalPeriodInSeconds = 22.5;
const earthOrbitalPeriodInSeconds = 36.5;
const moonOrbitalPeriodInSeconds = 2.8;
const marsOrbitalPeriodInSeconds = 68.7;

// Calculate the angular velocity (radians per second) for the given orbital period
const mercuryAngularVelocity = (Math.PI) / mercuryOrbitalPeriodInSeconds;
const venusAngularVelocity = (Math.PI) / venusOrbitalPeriodInSeconds;
const earthAngularVelocity = (Math.PI) / earthOrbitalPeriodInSeconds;
const moonAngularVelocity = (Math.PI) / moonOrbitalPeriodInSeconds;
const marsAngularVelocity = (Math.PI) / marsOrbitalPeriodInSeconds;

function animate() {
    requestAnimationFrame(animate);

    // Update Earth's position in a circular orbit
    // 0.016 is a frame time adjustment for smooth animation
    mercuryAngle += mercuryAngularVelocity * 0.016;
    venusAngle += venusAngularVelocity * 0.016;
    earthAngle += earthAngularVelocity * 0.016; 
    moonAngle += moonAngularVelocity * 0.016;
    marsAngle += marsAngularVelocity * 0.016;

    const mercuryRadius = 0.8;
    mercuryMesh.position.x = mercuryRadius * Math.cos(mercuryAngle);
    mercuryMesh.position.y = mercuryRadius * Math.sin(mercuryAngle);
    const venusRadius = 1.4;
    venusMesh.position.x = venusRadius * Math.cos(venusAngle);
    venusMesh.position.y = venusRadius * Math.sin(venusAngle);
    const earthRadius = 2;
    earthMesh.position.x = earthRadius * Math.cos(earthAngle);
    earthMesh.position.y = earthRadius * Math.sin(earthAngle);
    const moonRadius = 0.3;
    moonMesh.position.x = earthMesh.position.x + moonRadius * Math.cos(moonAngle);
    moonMesh.position.y = earthMesh.position.y + moonRadius * Math.sin(moonAngle);
    const marsRadius = 5;
    marsMesh.position.x = marsRadius * Math.cos(marsAngle);
    marsMesh.position.y = marsRadius * Math.sin(marsAngle);

    mercuryTrailPoints.push(new THREE.Vector3(mercuryMesh.position.x, mercuryMesh.position.y, mercuryMesh.position.z));
    venusTrailPoints.push(new THREE.Vector3(venusMesh.position.x, venusMesh.position.y, venusMesh.position.z));
    earthTrailPoints.push(new THREE.Vector3(earthMesh.position.x, earthMesh.position.y, earthMesh.position.z));
    moonTrailPoints.push(new THREE.Vector3(moonMesh.position.x, moonMesh.position.y, moonMesh.position.z));
    marsTrailPoints.push(new THREE.Vector3(marsMesh.position.x, marsMesh.position.y, marsMesh.position.z));

    // Remove the oldest trail point if the trail is too long
    if (mercuryTrailPoints.length > maxMercuryTrailLength) {
        mercuryTrailPoints.shift();
    }
    if (venusTrailPoints.length > maxVenusTrailLength) {
        venusTrailPoints.shift();
    }
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
    const mercuryTrailGeometry = new THREE.BufferGeometry().setFromPoints(mercuryTrailPoints);
    const mercuryTrailMaterial = new THREE.LineBasicMaterial({ color: 0x5a5a5a });
    const mercuryTrailLine = new THREE.Line(mercuryTrailGeometry, mercuryTrailMaterial);

    const venusTrailGeometry = new THREE.BufferGeometry().setFromPoints(venusTrailPoints);
    const venusTrailMaterial = new THREE.LineBasicMaterial({ color: 0xeed053 });
    const venusTrailLine = new THREE.Line(venusTrailGeometry, venusTrailMaterial);

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
    scene.remove(scene.getObjectByName('mercuryTrailLine'));
    mercuryTrailLine.name = 'mercuryTrailLine';
    scene.add(mercuryTrailLine);

    scene.remove(scene.getObjectByName('venusTrailLine'));
    venusTrailLine.name = 'venusTrailLine';
    scene.add(venusTrailLine);

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
