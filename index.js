
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer= new THREE.WebGLRenderer({antialias: true});
const textureLoader=new THREE.TextureLoader();
let mesh;

let controls = {};
let player = {
    height: 5,
    turnSpeed: .01,
    speed: 0.5,
    jumpHeight: .2,
    gravity: .01,
    velocity: 0,
    
    playerJumps: false
  };
  

function init(){
    scene.background=new THREE.Color('black');
    camera.position.set(100, player.height, -100);
    camera.lookAt(new THREE.Vector3(0, player.height, 0));
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', () => {
        let w = window.innerWidth,
            h = window.innerHeight;
        
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
    
}
function setLight(){
    light1=new THREE.AmbientLight(new THREE.Color('white'),0.7);
    light1.castShadow=true;
    var light = new THREE.DirectionalLight( 0xffffff, 1.0,5000 );
		scene.add( light );
		light.position.set(10,10,10);
		light.castShadow=true;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 5;
		light.shadow.camera.right = 1;
		light.shadow.camera.left = - 1;
		light.shadow.camera.top	= 1;
		light.shadow.camera.bottom = -0;
		light.shadow.mapSize.width = 500;
		light.shadow.mapSize.height = 509;
   // light=new THREE.DirectionalLight(THREE.Color('white'),1,);
   scene.add(light1);
    scene.add(light);
}

function loadGltf(){
    let loader=new THREE.GLTFLoader();
    loader.load('./assets/new.gltf',(gltf)=>{
        mesh=gltf.scene;
        mesh.scale.set(0.4,0.4,0.4);
        scene.add(mesh);
        mesh.position.x=0;
        mesh.position.y=-2;
        mesh.position.z=0;
    })
    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    var groundTexture = new THREE.TextureLoader().load( './Textures/grass.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 1000, 1000 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );
    var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
    plane.position.y = 0;
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
    scene.add( plane );
    
}
document.addEventListener("keydown", onDocumentKeyDown, true); 
document.addEventListener("keyup", onDocumentKeyUp, true);
function onDocumentKeyDown(event){ 
    var keyCode = event.keyCode;
    controls[keyCode] = true;
    console.log(controls[keyCode]);
}
function onDocumentKeyUp(event){
    var keyCode = event.keyCode;
    controls[keyCode] = false;
}

function control() {
    // Controls:Engine 
    if(controls[87]){ // w
        console.log("ok");
      camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
      camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if(controls[83]){ // s
      camera.position.x += Math.sin(camera.rotation.y) * player.speed;
      camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if(controls[65]){ // a
      camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
      camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
    }
    if(controls[68]){ // d
      camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
      camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }
    if(controls[37]){ // la
      camera.rotation.y -= player.turnSpeed;
    }
    if(controls[39]){ // ra
      camera.rotation.y += player.turnSpeed;
    }
    if(controls[32]) { // space
      camera.position.y += player.jumpHeight;
    }
    if(controls[17]) { // space
        camera.position.y -= player.jumpHeight;
      }
  }
  
  function ixMovementUpdate() {
    player.velocity += player.gravity;
    camera.position.y -= player.velocity;
    
    if(camera.position.y < player.height) {
      camera.position.y = player.height;
      player.jumps = false;
    }
  }
  

function animate(){
    
    requestAnimationFrame(animate);
    // if(mesh && mesh.rotation){
    //     mesh.rotation.y-=0.005;
    // }
    renderer.render(scene,camera)
    control();
    //mouseMove();
}
function update() {
    
    ixMovementUpdate();
  }

init();
setLight();;
animate();
loadGltf();
update();