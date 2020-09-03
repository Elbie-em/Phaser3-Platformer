class SceneMain extends Phaser.Scene {
	constructor() {
		super({ key: "SceneMain" });
	}

	preload() {
		this.load.image('sky', 'res/sky.png');
    this.load.image('ground', 'res/platform.png');
    this.load.image('star', 'res/star.png');
    this.load.image('bomb', 'res/bomb.png');
    this.load.spritesheet('dude', 
        'res/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
	}

	create() {
		this.add.image(400, 300, 'sky');
	}

	update() {

	}
}