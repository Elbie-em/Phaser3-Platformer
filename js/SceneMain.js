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
		this.player = this.physics.add.sprite(100, 450, 'dude');

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

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

		this.physics.add.collider(this.player, platforms);

		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 }
		});

		this.stars.children.iterate((child) => {

			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});

		this.physics.add.collider(this.stars, platforms);
		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

		//Score set up
		this.score = 0;
		this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	}

	update() {
		const cursors = this.input.keyboard.createCursorKeys();
		if (cursors.left.isDown) {
			this.player.setVelocityX(-160);

			this.player.anims.play('left', true);
		}
		else if (cursors.right.isDown) {
			this.player.setVelocityX(160);

			this.player.anims.play('right', true);
		}
		else {
			this.player.setVelocityX(0);

			this.player.anims.play('turn');
		}

		if (cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330);
		}
	}

	collectStar(player, star) {
		star.disableBody(true, true);
		this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
	}

}
