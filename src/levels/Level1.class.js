import { PixelateFilter } from '@pixi/filter-pixelate';

import Level from './Level.class.js';

import { Sprite } from '../classes';

import { isIntersecting, sleep } from '../utils';

import data from '../data';


export default class Level1 extends Level {
	constructor() {
		super();
		this.index = 0;
		this.nucleotides = data.levels[this.index].nucleotides;
		this.nbStrandsTotal = HACK ? 1 : 5;
		this.nbLives = HACK ? 1 : 5;
	}

	launch() {
		this.setupBackground();
		this.showTutorial();
	}

	get win() {
		return !this.fail && this.strands.children.length === 0;
	}

	setupBackground() {
		this.background.zIndex = 101;
		this.setupButtons();
	}

	setupButtons() {
		const padding = 20;

		const scale = (this.width - 2 * padding) / 1024;

		this.sequencer = new Sprite('rna-sequencer', {
			scale,
			x: this.width * 0.5,
			anchorY: 1,
			y: this.height
		});
		this.background.addChild(this.sequencer);

		this.nucleotides.forEach((nucleotide, i) => {
			const button = new PIXI.Container();
			button.x = padding + (276 + i * 157) * scale;
			button.y = this.height - this.sequencer.height * 0.5;
			this.background.addChild(button);

			const background = new PIXI.Graphics()
				.beginFill(nucleotide.hex, 0.5)
				.drawRect(-78.5 * scale, -78.5 * scale, 157 * scale, 157 * scale)
				.endFill();
			background.alpha = 0;
			button.addChild(background);

			button.interactive = true;
			button.buttonMode = true;

			button.on('click', e => this.handleClick(e, nucleotide.type));
			window.TouchEvent && button.on('touchstart', e => this.handleClick(e, nucleotide.type));
		});

		this.zone = new PIXI.Graphics()
			.beginFill(0x32CD32, 0.2)
			.drawRect(
				padding + 8, this.height - this.sequencer.height * 2,
				this.width - padding * 2 - 16, this.sequencer.height
			)
			.endFill();
		this.background.addChild(this.zone);

		// this.screen = new PIXI.Container();
		// this.screen.filters = [new PixelateFilter(2)];
		// this.background.addChild(this.screen);
	}

	start() {
		this.nbErrors = 0;

		this.strands = new PIXI.Container();
		this.strands.name = 'strands';
		this.content.addChild(this.strands);

		let nbStrands = 1;
		this.generateStrand();

		this.interval = setInterval(() => {
			if (nbStrands >= this.nbStrandsTotal) {
				return clearInterval(this.interval);
			}
			nbStrands++;
			this.generateStrand();
		}, 4000);

		this.tick = (delta) => {
			const nucleotides = this.strands.children[0].getChildByName('nucleotides').children;
			for (const nucleotide of nucleotides) {
				if (!nucleotide.sequenced && nucleotide.getBounds().y > this.height - this.sequencer.height * 0.5) {
					nucleotide.sequenced = true;
					// this.screen.removeChildren();
					return !this.fail && this.handleError();
				}
			}

			this.strands.children.forEach(strand => {
				strand.y += delta * 2;
				if (strand.getBounds().y > this.height - this.sequencer.height * 0.5) {
					// this.screen.removeChildren();
					this.strands.removeChild(strand);
				}
			});

			if (this.strands.children.length === 0) {
				GAME.ticker.remove(this.tick);
				return this.handleWin();
			}
		}

		GAME.ticker.add(this.tick);
	}

	generateStrand() {
		const strandLength = this.strands.children.length > 0
			? ~~(2 + Math.random() * 2)
			: 2;

		const strand = new PIXI.Container();
		strand.position.x = ~~(this.width * 0.3 + Math.random() * this.width * 0.4);
		strand.position.y = -100;
		this.strands.addChild(strand);

		const rnaContainer = new PIXI.Container();
		strand.addChild(rnaContainer);
		for (let i = 0; i < strandLength; i++) {
			const rna = new Sprite('rna', {
				width: 96
			});
			rna.y = -i * rna.height * 8/9;
			rnaContainer.addChild(rna);
		}

		const nucleotides = new PIXI.Container();
		nucleotides.name = 'nucleotides';
		strand.addChild(nucleotides);
		for (let i = 0; i < (strandLength - 1) * 2 + 1; i++) {
			const { type, color, hex } = this.nucleotides[~~(Math.random() * 4)];

			const nucleotide = new PIXI.Text(type, new PIXI.TextStyle({
				fontFamily: 'Gotham',
				fontWeight: 'bold',
				fontSize: 55,
				fill: color
			}));
			nucleotide.anchor.set((i + 1) % 2, 0.5);
			nucleotide.y = -i * rnaContainer.children[0].height * 0.5 * 8/9;
			nucleotide.type = type;
			nucleotide.hex = hex;
			nucleotide.sequenced = false;
			nucleotides.addChild(nucleotide);
		}
	}

	handleClick(e, type) {
		if (!this.strands || this.strands.children.length === 0) return;

		const nucleotides = this.strands.children[0].getChildByName('nucleotides').children;

		for (const nucleotide of nucleotides) {
			if (isIntersecting(nucleotide, this.zone) && type === nucleotide.type) {
				nucleotide.sequenced = true;
				this.handleSuccess();
				//
				// const text = new PIXI.Text(nucleotide.type, new PIXI.TextStyle({
				// 	fontFamily: 'Gotham',
				// 	fontWeight: 'bold',
				// 	fontSize: 20,
				// 	fill: nucleotide.hex
				// }));
				// text.x = this.screen.children.length > 0
				// 	? this.screen.children.last().x + 15
				// 	: this.sequencer.getBounds().x + 15;
				// text.y = this.height - this.sequencer.height * 0.5;
				// text.anchor.set(0, 0.5);
				// this.screen.addChild(text);

				return;
			}
		}
		// this.screen.removeChildren();
		this.handleError();
	}

	async handleSuccess() {
		GAME.sounds.success.play();

		await sleep(1);

		if (this.win) {
			GAME.ticker.remove(this.tick);
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

		if (this.fail && !this.win) {
			GAME.ticker.remove(this.tick);

			clearInterval(this.interval);

			this.handleFail();

			await Promise.all(this.strands.children.map(strand => {
				return GSAP.to(strand, {
					pixi: {
						blur: 20,
						alpha: 0
					},
					duration: 1
				})
			}));
			this.content.removeChild(this.strands);
		}
	}
}
