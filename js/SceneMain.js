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
		// Add the sky
		this.add.image(400, 300, 'sky');

		//Add the static bodies i.e the ground
		const platforms = this.physics.add.staticGroup();

		platforms.create(400, 568, 'ground').setScale(2).refreshBody();// double size

		platforms.create(600, 400, 'ground');
		platforms.create(50, 250, 'ground');
		platforms.create(750, 220, 'ground');

		//Adding the player
		const player = this.physics.add.sprite(100, 450, 'dude');

		player.setBounce(0.2);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		});
	}

	update() {

	}
}