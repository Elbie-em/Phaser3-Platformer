const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	autoCenter: true,
	backgroundColor: "#4488AA",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 300 }
		}
	},
	scene: [SceneMain]
};

const game = new Phaser.Game(config);
