import { MenuButton, Tutorial, Alert } from '../ui';
import { Sprite } from '../classes';

import texts from '../texts';

export default class Level {
	constructor() {
		this.width = GAME.width;
		this.height = GAME.height;

		this.background = new PIXI.Container();
		this.background.sortableChildren = true;
		GAME.stage.addChild(this.background);

		this.content = new PIXI.Container();
		this.content.sortableChildren = true;
		this.content.zIndex = 42;
		GAME.stage.addChild(this.content);

		this.setupMenuButton();
		this.setupOverlay();
		this.setupTutorial();
		this.setupAlert();
	}

	get fail() {
		return this.nbErrors === this.nbLives;
	}

	setupLives() {
		this.lives = new PIXI.Container();
		this.lives.position.set(this.width - 30, 30);
		this.lives.zIndex = 24;
		this.content.addChild(this.lives);

		for (let i = 0; i < this.nbLives; i++) {
			const life = new PIXI.Container();
			life.y = i * 42;
			this.lives.addChild(life);

			const syringe = new Sprite('syringe', {
				width: 42,
			});
			life.addChild(syringe);

			const crossed = new Sprite('crossed', {
				width: 36
			});
			crossed.alpha = 0;
			life.addChild(crossed);
		}
	}

	updateLives() {
		this.lives.children
			.filter((_, i, array) => array.length - i <= this.nbErrors)
			.forEach(life => {
				life.getChildAt(0).alpha = 0.5;
				life.getChildAt(1).alpha = 1;
			});
	}

	setupMenuButton() {
		this.menuButton = new MenuButton({
			target: GAME.view,
		});
		this.menuButton.$on('click', () => GAME.goToState('menu'));
	}

	setupOverlay() {
		this.overlay = new PIXI.Graphics()
			.beginFill(0xFFFFFF)
			.drawRect(0, 0, this.width, this.height)
			.endFill();
		GAME.stage.addChild(this.overlay);
		this.overlay.alpha = 0;
		this.overlay.zIndex = 101;
	}

	setupTutorial() {
		this.tutorial = new Tutorial({
			target: GAME.view
		});
		this.tutorial.$on('close', () => {
			this.tutorial.visible = false;
			this.setupLives();
			this.start();
		});
	}

	showTutorial() {
		const info = texts.levels[this.index];

		this.tutorial.$set({
			title: info.title,
			slides: info.tutorial,
			more: info.more
		});

		this.tutorial.visible = true;
	}

	setupAlert() {
		this.alert = new Alert({
			target: GAME.view
		});
		this.alert.$on('close', () => {
			if (this.win) {
				if (this.index + 1 === 4) {
					GAME.goToState('outro');
				}
				else {
					GAME.goToLevel(this.index + 1);
				}
				setTimeout(() => this.alert.$destroy(), 500);
			}
			else {
				this.clear();
				this.setupLives();
				this.start();
				this.alert.visible = false;
			}
		});
	}

	showAlert(key) {
		const info = texts.levels[this.index];

		this.alert.$set({
			key: key || (this.win ? 'win' : 'fail'),
			...info
		});

		this.alert.visible = true;
	}

	handleWin() {
		if (GAME.sounds.fanfare.playing()) return;
		GAME.sounds.fanfare.play();
		this.showAlert();
		this.launchConfettis();
		if (!GAME.finished) localStorage.setItem('level', this.index + 1);
	}

	handleFail(key) {
		if (GAME.sounds.fail.playing()) return;
		GAME.sounds.fail.play();
		this.showAlert(key);
	}

	launchConfettis() {
		const COLORS = [0x4169E1, 0xADD8E6, 0x2E8B57, 0xFFA500, 0xB22222, 0xFFD700, 0xE9967A, 0xDDA0DD];
		// const COLORS = [0xDCFFFD, 0xADD8E6, 0x00A9A0, 0x4682B4, 0x4169E1, 0x000080];

		const confettis = new PIXI.Container();
		confettis.name = 'confettis';
		confettis.zIndex = 1000;
		GAME.stage.addChild(confettis);

		for (let i = 0; i < 256; i++) {
			const color = COLORS[i % COLORS.length];
			const x = ~~(20 + Math.random() * (this.width - 40));
			const y = ~~(20 - Math.random() * this.height);
			const scale = ~~(8 + Math.random() * 4) / 10;

			const confetti = new PIXI.Graphics()
				.beginFill(color)
				.drawRect(0, 0, 10, 10)
				.endFill();
			confetti.position.set(x, y);
			confetti.scale.set(scale);
			confetti.skew.y = (i % 10) * 0.1;
			confetti.rotation = (i % 5 + 1) * 0.1;
			confettis.addChild(confetti);
		}

		const tick = delta => {
			confettis.children.forEach((confetti, i) => {
				confetti.y += delta * 5;
				confetti.skew.y += (i % 5 + 1) * 0.02 * (i % 2 === 0 ? 1 : -1) * delta;
				confetti.rotation += (i % 5 + 1) * 0.01 * (i % 2 === 0 ? 1 : -1) * delta;
				if (confetti.y > this.height) {
					confettis.removeChild(confetti);
				}
			});
		}

		GAME.ticker.add(tick);
		setTimeout(() => GAME.ticker.remove(tick), 8000);
	}

	clear() {
		this.content.removeChildren();
	}

	destroy() {
		this.menuButton.$destroy();
		this.tutorial.$destroy();
		this.alert.$destroy();

		this.tickBackground && GAME.ticker.remove(this.tickBackground);
		this.tick && GAME.ticker.remove(this.tick);

		GAME.stage.removeChildren();
	}
}
