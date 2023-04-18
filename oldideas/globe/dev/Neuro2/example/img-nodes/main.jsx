const imgs = ['cat.jpg', 'dog.jpg', 'eagle.jpg', 'elephant.jpg', 'grasshopper.jpg', 'octopus.jpg', 'owl.jpg', 'panda.jpg', 'squirrel.jpg', 'tiger.jpg', 'whale.jpg'];

// Random connected graph
const gData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id-1))
      }))
};

ReactDOM.render(
  <ForceGraph3D
    graphData={gData}
    nodeThreeObject={({ img }) => {
      const imgTexture = new THREE.TextureLoader().load(`./imgs/${img}`);
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12, 12);

      return sprite;
    }}
  />,
  document.getElementById('graph'))