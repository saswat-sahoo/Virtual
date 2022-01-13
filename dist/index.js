
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,100000);
const renderer= new THREE.WebGLRenderer({antialias: true});
const textureLoader=new THREE.TextureLoader();
const controls=new THREE.PointerLockControls(camera,renderer.domElement);
const clock=new THREE.Clock();
let mesh;

let player = {
  height: 5,
  turnSpeed: .01,
  speed: 25,
  jumpHeight: .2,
  gravity: .01,
  velocity: 0,
  
  playerJumps: false
};
  
camera.position.set(100, player.height, -100);
camera.lookAt(new THREE.Vector3(0, player.height, 0));

let btn1=document.querySelector("#button1");
btn1.addEventListener('click',()=>{
controls.lock();
});
let keyboard=[];
addEventListener('keydown',(e)=>{
  keyboard[e.key]=true;
});
addEventListener('keyup',(e)=>{
  keyboard[e.key]=false;
});




function init(){
  
  scene.background=new THREE.Color('black');
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  window.addEventListener('resize', () => {
      let w = window.innerWidth,
          h = window.innerHeight;
      
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    setallTextures();
  
    
}

function setallTextures(){
  let materialArray = [];
  let texture_bk = new THREE.TextureLoader().load( './Textures/zeus_bk.jpg');
  let texture_ft = new THREE.TextureLoader().load( './Textures/zeus_ft.jpg');
  let texture_up = new THREE.TextureLoader().load( './Textures/zeus_up.jpg');
  let texture_dn = new THREE.TextureLoader().load( './Textures/zeus_dn.jpg');
  let texture_rt = new THREE.TextureLoader().load( './Textures/zeus_rt.jpg');
  let texture_lf = new THREE.TextureLoader().load( './Textures/zeus_lf.jpg');
    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
    
  for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.DoubleSide;
    
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );


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
  loader.load('./assets/enviornment.gltf',(gltf)=>{
      mesh=gltf.scene;
      mesh.scale.set(0.4,0.4,0.4);
      scene.add(mesh);
      mesh.position.x=0;
      mesh.position.y=-2;
      mesh.position.z=0;
  })
  
    
}

function processKeyboard(delta){
  if(keyboard['w']){
    controls.moveForward(player.speed*delta);
  }
  if(keyboard['s']){
    controls.moveForward(-player.speed*delta);
  }
  if(keyboard['d']){
    controls.moveRight(player.speed*delta);
  }
  if(keyboard['a']){
    controls.moveRight(-player.speed*delta);
  }

}

function animate(){
  let delta=clock.getDelta();
  processKeyboard(delta);
  requestAnimationFrame(animate);
  renderer.render(scene,camera); 
}


init();
setLight();;
animate();
loadGltf();
