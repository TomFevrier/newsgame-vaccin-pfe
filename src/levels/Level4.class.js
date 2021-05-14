import Level from './Level.class.js';

import { Sprite } from '../classes';

import { sleep } from '../utils';

import data from '../data';


export default class Level4 extends Level {
	constructor() {
		super();
		this.index = 3;
		this.nbLives = HACK ? 1 : 3;

		this.randomFailed = false;
	}

	launch() {
		this.setupBackground();
		this.showTutorial();
	}

	get win() {
		return this.nbVialsFilled === (HACK ? 2 : 3);
	}

	get vialBbox() {
		const bounds = this.vial.getBounds();
		return {
			left: bounds.x,
			top: bounds.y,
			right: bounds.x + bounds.width,
			bottom: bounds.y + bounds.height
		};
	}

	get volumeIsCorrect() {
		return this.volume >= 0.9 && this.volume <= 0.95;
	}

	setupBackground() {
		this.conveyorBelt = new Sprite('conveyor-belt', {
			width: this.width * 2,
			anchorX: 1,
			x: this.width,
			anchorY: 1,
			y: this.height,
		});
		this.background.addChild(this.conveyorBelt);

		const machine = new PIXI.Container();
		machine.zIndex = 42;
		this.background.addChild(machine);

		machine.addChild(new Sprite('vaccine-machine', {
			width: 256,
			anchorY: 0,
			x: this.width * 0.5,
		}));
	}

	start() {
		this.nbVialsFilled = 0;
		this.nbErrors = 0;

		this.setupVial();
		this.setupButton();
	}

	async setupVial() {
		this.vial = new PIXI.Container();
		this.vial.name = 'vial';
		this.content.addChild(this.vial);

		const serum = new Sprite('vaccine-serum', {
			width: 256
		});
		serum.name = 'serum';
		this.vial.addChild(serum);

		const bottle = new Sprite('vaccine-vial', {
			width: 256
		});
		this.vial.addChild(bottle);

		this.cap = new Sprite('vaccine-cap', {
			width: 150,
			anchorY: 1,
			x: this.width * 0.5,
			y: 0,
		});
		this.cap.zIndex = 42;
		this.content.addChild(this.cap);

		const text = new PIXI.Text(localStorage.getItem('lab'), new PIXI.TextStyle({
			fontFamily: 'Gotham',
			fontWeight: 'bold',
			align: 'center',
			fontSize: 256 / 16,
			fill: 'black'
		}));
		text.anchor.set(0.5, 0.5);
		this.vial.addChild(text);

		this.vial.position.set(this.width * 0.5, this.height - this.vial.height * 0.4 - this.conveyorBelt.height * 0.5);

		this.mask = new PIXI.Graphics()
			.drawRect(0, 0, this.width, this.vial.height);
		this.mask.scale.y = 0;
		this.mask.position.y = this.vialBbox.bottom;
		this.content.addChild(this.mask);

		serum.mask = this.mask;


		// Animate vial entering

		this.vial.x = -this.width * 0.5;

		GSAP.to(this.conveyorBelt, {
			x: this.width * 2,
			duration: 1
		});

		await GSAP.to(this.vial, {
			x: this.width * 0.5,
			duration: 1
		});

		this.conveyorBelt.x = this.width;
	}

	setupButton() {
		this.button = new PIXI.Graphics()
			.beginFill(0)
			.drawCircle(this.width * 0.5, 63, 30)
			.endFill();
		this.button.alpha = 0;
		this.content.addChild(this.button);

		let clicking = false;
		let transitionning = false;

		const handleMouseDown = async () => {
			transitionning = false;

			this.flow.visible = true;

			await GSAP.to(this.flow.scale, {
				y: 1,
				duration: 0.25,
				ease: 'linear'
			});
			clicking = true;
		}

		const handleMouseUp = () => {
			if (transitionning) return;

			clicking = false;
			transitionning = true;

			this.flow.visible = false;

			this.volumeIsCorrect ? this.handleSuccess() : this.handleError();

			this.switchVial();
		}

		this.button.interactive = true;
		this.button.buttonMode = true;

		this.button.on('mousedown', handleMouseDown);
		window.TouchEvent && this.button.on('touchstart', handleMouseDown);

		this.button.on('mouseup', handleMouseUp);
		window.TouchEvent && this.button.on('touchend', handleMouseUp);

		this.flow = new PIXI.Graphics()
			.beginFill(0xFFD166, 0.75)
			.drawRect(this.width * 0.5 - 20, 0, 40, this.vialBbox.bottom)
			.endFill();
		this.flow.scale.y = 0;
		this.background.addChild(this.flow);

		this.volume = 0;

		this.tick = (delta) => {
			if (!clicking) return;

			this.mask.scale.y = this.volume;
			this.mask.position.y = this.vialBbox.bottom - this.volume * this.vial.height;

			this.flow.scale.y = 1 - (this.vial.height / this.vialBbox.bottom) * this.volume;

			if (this.volume >= 1) {
				handleMouseUp();
			}
			this.volume += delta * 0.005;
		}

		GAME.ticker.add(this.tick);
	}

	async switchVial() {
		this.button.interactive = false;

		if (this.volumeIsCorrect) {
			await GSAP.to(this.cap, {
				y: this.vialBbox.top + 45,
				duration: 0.5
			});
		}

		GSAP.to(this.conveyorBelt, {
			x: this.width * 2,
			duration: 1
		})
		.then(() => this.conveyorBelt.x = this.width);


		await Promise.all([this.cap, this.vial].map(object => GSAP.to(object, {
			x: this.width * 1.5,
			duration: 1
		})));

		if (!this.randomFailed && this.nbVialsFilled === (HACK ? 1 : 2)) {
			this.background.removeChild(this.flow);
			this.handleFail('randomFail');
			this.randomFailed = true;
			return;
		}

		if (this.win || this.fail) return;

		this.volume = 0;

		this.mask.scale.y = 0;
		this.mask.position.y = this.vialBbox.bottom;

		this.vial.x = -this.width * 0.5;

		this.cap.position.set(this.width * 0.5, 0);

		GSAP.to(this.conveyorBelt, {
			x: this.width * 2,
			duration: 1
		})
		.then(() => this.conveyorBelt.x = this.width);

		await GSAP.to(this.vial, {
			x: this.width * 0.5,
			duration: 1
		});

		this.button.interactive = true;
	}

	async handleSuccess() {
		this.nbVialsFilled++;

		GAME.sounds.success.play();

		await sleep(1);

		if (this.win) {
			GAME.ticker.remove(this.tick);
			this.button.interactive = false;
			this.handleWin();
		}
	}

	async handleError() {
		this.nbErrors++;

		GAME.sounds.error.play();

		this.updateLives();

		this.overlay.tint = 0xA00000;
		this.overlay.alpha = 0.5;
		await sleep(1);
		this.overlay.alpha = 0;

		if (this.fail) {
			GAME.ticker.remove(this.tick);
			this.button.interactive = false;
			this.background.removeChild(this.flow);
			this.handleFail();
		}
	}
}
