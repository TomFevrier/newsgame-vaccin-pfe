import Level from './Level.class.js';

import { Sprite } from '../classes';
import { Info } from '../ui';

import { distanceSimple, sleep } from '../utils';

import data from '../data';
import texts from '../texts';

export default class Level3 extends Level {
	constructor() {
		super();
		this.index = 2;
		this.hairCombinations = data.levels[this.index].hairCombinations;
		this.clothesColors = data.levels[this.index].clothesColors;

		this.randomFailed = false;

		this.setupInfo();
	}

	get win() {
		return this.nbControlRevealed / this.nbRevealed > 0.9;
	}

	get infectedPersons() {
		return this.persons && this.persons.filter(person => person.infected);
	}

	setupInfo() {
		this.info = new Info({
			target: GAME.view
		});
		this.info.$on('close', () => {
			this.info.visible = false;
			this.setupReveal();
		});
	}

	showInfo() {
		this.info.$set({
			text: texts.levels[this.index].info.text
		});
		this.info.visible = true;
	}

	launch() {
		this.showTutorial();
	}

	setupBackground() {
		// this.setupClock();
	}

	start() {
		this.setupClock();

		this.nbErrors = 0;
		this.nbRevealed = 0;
		this.nbControlRevealed = 0;

		const nbRows = 6;
		const nbCols = 7;
		this.padding = {
			top: 100,
			right: 20,
			bottom: 42,
			left: 20
		};

		this.persons = [];
		for (const category of ['young', 'midAged', 'old']) {
			for (const gender of ['m', 'f']) {
				for (let i = 0; i < (nbRows * nbCols) / 6; i++) {
					this.persons.push(this.getRandomPerson(gender, category, 0.2));
				}
			}
		}
		this.persons = this.persons.shuffle();

		this.group = new PIXI.Container();
		this.group.zIndex = 42;
		this.content.addChild(this.group);

		const colWidth = (this.width - this.padding.left - this.padding.right) / nbCols;
		const rowHeight = (this.height - this.padding.top - this.padding.bottom) / nbRows;
		const offset = (this.persons[0].height - rowHeight) / nbRows;

		for (let i = 0; i < nbRows; i++) {
			for (let j = 0; j < nbCols; j++) {
				const person = this.persons[nbCols * i + j];
				person.x = this.padding.left + (j + 0.5) * colWidth;
				person.y = this.padding.top + i * (rowHeight - offset);
				person.zIndex = nbCols * i + j;
				this.group.addChild(person);
			}
		}

		this.persons.shuffle().slice(0, this.persons.length * 0.5).forEach(person => person.control = true);

		setTimeout(() => this.getPeopleInfected(), 2000);
	}

	setupClock() {
		this.clock = new PIXI.Container();
		this.clock.zIndex = 101;
		this.clock.position.set(-this.width * 0.5, this.height * 0.5);
		this.content.addChild(this.clock);

		const background = new Sprite('clock', {
			scale: 0.75
		});
		this.clock.addChild(background);

		const hourHand = new Sprite('clock-hand-hour', {
			scale: 0.75,
			anchorY: 1
		});
		hourHand.name = 'hour-hand';
		this.clock.addChild(hourHand);

		const minHand = new Sprite('clock-hand-min', {
			scale: 0.75,
			anchorY: 1
		});
		minHand.name = 'min-hand';
		this.clock.addChild(minHand);
	}

	async getPeopleInfected() {
		const control = this.persons.filter(person => person.control);
		const vaccinated = this.persons.filter(person => !person.control);

		if (!this.randomFailed) {
			control.shuffle().slice(0, 6).forEach(person => person.infected = true);
			vaccinated.shuffle().slice(0, 6).forEach(person => person.infected = true);
		}
		else {
			control.shuffle().slice(0, 11).forEach(person => person.infected = true);
			vaccinated.shuffle()[0].infected = true;
		}

		this.persons.forEach(person => {
			if (person.infected) {
				const bubble = new Sprite('bubble-virus', {
					width: 32,
					x: 0,
					y: 10,
					anchorY: 1
				});
				bubble.zIndex = 99;
				bubble.alpha = 0;
				bubble.name = 'bubble';
				person.addChild(bubble);

				const filename = `medical-file-${person.control ? 'placebo' : 'vaccinated'}`;
				const medicalFile = new Sprite(filename, {
					width: 32,
					y: 180 * (person.width / 256) + 10,
					anchorY: 0
				});
				medicalFile.zIndex = 99;
				medicalFile.alpha = 0;
				medicalFile.name = 'medical-file';
				person.addChild(medicalFile);
			}
		});

		const duration = 6;
		this.infectedPersons.forEach(person => {
			GSAP.to(person.getChildByName('bubble'), {
				alpha: 1,
				y: -4,
				duration: 0.5,
				delay: 1 + Math.random() * (duration - 2)
			});
		});
		setTimeout(() => GAME.sounds.cough1.play(), duration / 3 * 1000);
		setTimeout(() => GAME.sounds.cough2.play(), duration / 3 * 2000);
		await this.showClock(duration);

		const nbCols = 4;
		const nbRows = this.infectedPersons.length / nbCols;

		const colWidth = (this.width - this.padding.left - this.padding.right) / nbCols;
		const offset = this.padding.top - this.padding.bottom - 15;

		const newPositions = Array.from({ length: this.infectedPersons.length }, (_, i) => ({
			x: this.padding.left + (i % nbCols + 0.5) * colWidth,
			y: this.height * 0.5 + (-1 + ~~(i / nbCols) - 0.5) * this.infectedPersons[0].height + offset,
			zIndex: i
		}));

		await Promise.all(this.persons.map(person => {
			if (person.infected) {
				const closest = newPositions
					.filter(position => !position.taken)
					.reduce((closest, position) => {
						if (!closest) return position;
						return distanceSimple(person, position) < distanceSimple(person, closest)
							? position
							: closest;
					}, null);
				closest.taken = true;

				person.zIndex = closest.zIndex;
				setTimeout(() => this.group.sortChildren(), 3000);

				return GSAP.to(person, {
					pixi: {
						x: closest.x,
						y: closest.y,
						scale: 1.2
					},
					delay: 3,
					duration: 0.5,
					ease: 'power2.Out'
				});
			}

			return GSAP.to(person, {
				pixi: {
					blur: 10,
					alpha: 0
				},
				delay: Math.random() * 2,
				duration: 0.5
			}).then(() => this.group.removeChild(person));
		}));

		await sleep(1);
		if (!this.randomFailed) {
			this.showInfo();
		}
		else {
			this.setupReveal();
		}
	}

	async showClock(duration) {
		GSAP.to(this.clock, {
			x: this.width * 0.5,
			duration: 1,
		});

		GSAP.to(this.clock.getChildByName('hour-hand'), {
			rotation: Math.PI * duration * 2/3,
			duration,
			ease: 'power2.inOut'
		});

		GSAP.to(this.clock.getChildByName('min-hand'), {
			rotation: Math.PI * duration * 2,
			duration,
			ease: 'power2.inOut'
		});

		await GSAP.to(this.clock, {
			x: this.width * 1.5,
			duration: 1,
			delay: duration,
		});
	}

	setupReveal() {
		const revealStatus = (person) => {
			GAME.sounds.pop.play();
			GSAP.to(person.getChildByName('medical-file'), {
				alpha: 1,
				y: '-=10',
				duration: 0.5
			});
			this.nbRevealed++;
			if (person.control) {
				this.nbControlRevealed++;
			}

			if (this.nbRevealed === this.infectedPersons.length) {
				setTimeout(() => {
					if (this.win) {
						this.handleWin();
					}
					else {
						this.handleFail();
						this.randomFailed = true;
					}
				}, 1000);
			}
		}

		this.infectedPersons.forEach(person => {
			person.interactive = true;
			person.buttonMode = true;
			person.on('mousedown', () => revealStatus(person));
			window.TouchEvent && person.on('touchstart', () => revealStatus(person));
		});
	}

	async switchRandomPersons() {
		for (let i = 0; i < 12; i++) {
			const personA = this.persons.random();
			const personB = this.persons.filter(e => e.zIndex !== personA.zIndex).random();

			// console.log(personA.zIndex, personB.zIndex)
			personA.zIndex += personB.zIndex;
			personB.zIndex = personA.zIndex - personB.zIndex;
			personA.zIndex -= personB.zIndex;
			// console.log(personA.zIndex, personB.zIndex)
			this.group.sortChildren();

			GSAP.to(personA, {
				x: personB.x,
				y: personB.y,
				duration: 0.5
			});
			GSAP.to(personB, {
				x: personA.x,
				y: personA.y,
				duration: 0.5
			});

			await sleep(0.5);
		}
	}

	getRandomPerson(gender, category, scale) {
		let age;
		switch(category) {
			case 'young':
				age = ~~(18 + Math.random() * 22);
				break;
			case 'midAged':
				age = ~~(40 + Math.random() * 25);
			case 'old':
				age = ~~(65 + Math.random() * 20);
		}

		const race = ['white', 'white', 'white', 'asian', 'asian', 'mixed', 'black', 'black'].random();

		const hairType = this.hairCombinations.type[gender][race].random();
		const hairColor = category === 'young'
			? this.hairCombinations.color[race].random()
			: this.hairCombinations.color[category];
		const bald = gender === 'm' && category !== 'young' && Math.random() < 0.25;

		// console.log(hairColor.toString(16))

		const shirtColor = this.clothesColors.shirt.random();
		const pantsColor = this.clothesColors.pants.filter(e => e !== shirtColor).random();
		const shoesColor = this.clothesColors.shoes.filter(e => e !== pantsColor).random();

		const person = new PIXI.Container();

		const arms = new Sprite(`arms-${gender}-${race}`, {
			scale: scale,
			anchorY: 0,
			y: scale * 246
		});
		person.addChild(arms);

		const pants = new Sprite(`pants-${gender}`, {
			scale: scale,
			anchorY: 0,
			y: scale * 420,
			tint: pantsColor
		});
		person.addChild(pants);

		const shoes = new Sprite('shoes', {
			scale: scale,
			anchorY: 0,
			y: scale * 706,
			tint: shoesColor
		});
		person.addChild(shoes);

		const shirt = new Sprite(`shirt-${gender}`, {
			scale: scale,
			anchorY: 0,
			y: scale * 165,
			tint: shirtColor
		});
		person.addChild(shirt);

		const face = new Sprite(`face-${gender}-${race}`, {
			scale: scale,
			anchorY: 0,
			y: scale * 4
		});
		person.addChild(face);

		const mask = new Sprite('mask', {
			scale: scale,
			anchorY: 0,
			y: scale * 92
		});
		person.addChild(mask);

		if (!bald) {
			const hair = new Sprite(`hair-${gender}-${hairType}`, {
				scale: scale,
				anchorY: 0,
				y: hairType === 'afro' ? -scale * 38 : 0,
				tint: hairColor
			});
			person.addChild(hair);
		}
		return person;
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

		if (this.fail) {
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
