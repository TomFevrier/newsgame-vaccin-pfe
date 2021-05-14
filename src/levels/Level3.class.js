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
	}

	get win() {
		return this.nbControlRevealed / this.nbRevealed > 0.9;
	}

	get infectedPersons() {
		return this.persons && this.persons.filter(person => person.infected);
	}

	showInfo(index, callback) {
		this.info = new Info({
			target: GAME.view,
			props: {
				text: texts.levels[this.index].infos[index]
			}
		});

		this.info.$on('close', () => {
			this.info.visible = false;
			setTimeout(() => this.info.$destroy(), 1000);
			callback();
		});

		this.info.visible = true;
	}

	launch() {
		this.showTutorial();
	}

	start() {
		this.nbRevealed = 0;
		this.nbControlRevealed = 0;

		this.padding = {
			top: 100,
			right: 20,
			bottom: 20,
			left: 20
		};

		this.setupClock();
		!this.randomFailed && this.setupMedicalFile();
		this.setupGroup();
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

	setupMedicalFile() {
		this.medicalFile = new PIXI.Container();
		this.medicalFile.zIndex = 101;
		this.medicalFile.position.set(-this.width * 0.5, this.height * 0.5);
		this.medicalFile.angle = -45;
		this.content.addChild(this.medicalFile);

		const scale = 0.75;

		this.medicalFile.addChild(new Sprite('medical-file-choice', {
			scale
		}));

		const buttonVax = new PIXI.Graphics()
			.beginFill(0xFF0000)
			.drawRect(48 * scale, 114 * scale, 48 * scale, 48 * scale)
			.endFill();
		buttonVax.pivot.set(
			this.medicalFile.width * 0.5,
			this.medicalFile.height * 0.5
		);
		buttonVax.alpha = 0;
		buttonVax.interactive = true;
		buttonVax.buttonMode = true;
		this.medicalFile.addChild(buttonVax);

		const tick = new Sprite('tick', {
			scale,
			x: 52 * scale
		});
		tick.pivot.set(
			this.medicalFile.width * 0.5,
			this.medicalFile.height * 0.5
		);
		tick.alpha = 0;
		this.medicalFile.addChild(tick);

		const buttonPlacebo = new PIXI.Graphics()
			.beginFill(0xFF0000)
			.drawRect(48 * scale, 242 * scale, 48 * scale, 48 * scale)
			.endFill();
		buttonPlacebo.pivot.set(
			this.medicalFile.width * 0.5,
			this.medicalFile.height * 0.5
		);
		buttonPlacebo.alpha = 0;
		buttonPlacebo.interactive = true;
		buttonPlacebo.buttonMode = true;
		this.medicalFile.addChild(buttonPlacebo);

		let nbChecked = 0;
		let nbControl = 0;
		const select = async (control) => {
			nbChecked++;
			if (control) nbControl++;

			this.chosenPerson.placebo = control;

			tick.y = control ? 202 * scale : 74 * scale;
			tick.alpha = 1;

			await sleep(0.5);

			await GSAP.to(this.medicalFile, {
				pixi: {
					x: this.width * 1.5,
					rotation: 45
				},
				duration: 0.5
			});

			this.medicalFile.x = -this.width * 0.5;
			this.medicalFile.angle = -45;
			tick.alpha = 0;

			if (nbChecked < (HACK ? 2 : 6)) return;

			this.content.removeChild(this.medicalFile);


			if (nbControl === nbChecked / 2) {
				GAME.sounds.success.play();
				await sleep(1);
				this.vaccinate();
			}
			else {
				GAME.sounds.error.play();
				await sleep(1);
				this.handleFail('failTransparency');
			}
		}

		buttonVax.on('mousedown', () => select(false));
		window.TouchEvent && buttonVax.on('touchstart', () => select(false));
		buttonPlacebo.on('mousedown', () => select(true));
		window.TouchEvent && buttonPlacebo.on('touchstart', () => select(true));
	}

	setupGroup() {
		const nbRows = 6;
		const nbCols = 7;

		this.scale = this.width * 0.0005;

		this.persons = [];
		for (let i = 0; i < nbRows * nbCols; i++) {
			const gender = ['m', 'f'].random();
			const category = ['young', 'young', 'young', 'midAged', 'midAged', 'old'].random();
			this.persons.push(this.getRandomPerson(gender, category));
		}

		const personHeight = this.persons[0].height;

		this.group = new PIXI.Container();
		this.group.position.set(this.width * 0.5, this.height * 0.5);
		this.group.pivot.x = this.width * 0.5;
		this.group.pivot.y = (this.padding.top + this.height - this.padding.bottom) * 0.5;
		this.group.scale.set(this.randomFailed ? 1 : 1.8);
		this.group.zIndex = 42;
		this.content.addChild(this.group);

		const colWidth = (this.width - this.padding.left - this.padding.right) / nbCols;
		const rowHeight = (this.height - this.padding.top - this.padding.bottom - personHeight) / (nbRows - 1);
		const offset = (this.padding.top - this.padding.bottom) * 0.5;

		for (let i = 0; i < nbRows; i++) {
			for (let j = 0; j < nbCols; j++) {
				const person = this.persons[nbCols * i + j];
				person.x = this.padding.left + (j + 0.5) * colWidth;
				person.y = this.padding.top + i * rowHeight + offset;
				person.zIndex = nbCols * i + j;

				this.group.addChild(person);

				if (this.randomFailed) continue;

				person.isInMiddle = i >= 2 && i <= nbRows - 3 && j >= 2 && j <= nbCols - 3;

				if (person.isInMiddle) {
					person.interactive = true;
					person.buttonMode = true;

					const syringe = new Sprite('syringe-rotated', {
						width: 32,
						anchorX: 1,
						x: -person.width * 0.5 + this.scale * 20 - 10,
						anchorY: 1,
						y: this.scale * 280 - 10
					});
					syringe.alpha = 0;
					syringe.name = 'syringe';
					person.addChild(syringe);

					const handleMouseDown = async () => {

						person.removeAllListeners();

						this.chosenPerson = person;

						GSAP.to(this.medicalFile, {
							pixi: {
								x: this.width * 0.5,
								rotation: 0
							},
							duration: 0.5
						});
					}

					person.on('mousedown', handleMouseDown);
					window.TouchEvent && person.on('touchstart', handleMouseDown);
				}
				else {
					person.y += 10;
					person.alpha = 0;
				}
			}
		}

		if (!this.randomFailed) {
			this.group.pivot.y += (this.padding.top - this.padding.bottom) * 0.5;
			return;
		}

		setTimeout(() => {
			this.assignControl();
			this.getPersonsInfected();
		}, 1000);
	}

	async vaccinate() {
		const subset = this.persons.filter(person => person.isInMiddle);

		for (const person of subset) {
			const syringe = person.getChildByName('syringe');
			await GSAP.to(syringe, {
				alpha: 1,
				x: '+=10',
				y: '+=10',
				duration: 0.25
			});
			await sleep(0.5);
			GSAP.to(syringe, {
				alpha: 0,
				x: '-=10',
				y: '-=10',
				duration: 0.25
			}).then(() => person.removeChild(syringe));
		}

		await sleep(1);

		this.assignControl();
		this.zoomOut();
	}

	assignControl() {
		this.persons
			.filter(person => person.placebo === undefined)
			.shuffle()
			.forEach((person, i, array) => person.placebo = i < array.length * 0.5);
	}

	async zoomOut() {
		await GSAP.to(this.group, {
			pixi: {
				scale: 1,
				pivotY: `-=${(this.padding.top - this.padding.bottom) * 0.5}`
			},
			duration: 1
		});

		await Promise.all(this.persons
			.filter(person => person.alpha === 0)
			.map(person => {
				return GSAP.to(person, {
					alpha: 1,
					y: '-=10',
					delay: Math.random() * 2,
					duration: 0.5,
					ease: 'power2.InOut'
				});
			})
		);

		await sleep(1);

		if (!this.randomFailed) {
			this.showInfo(0, () => this.getPersonsInfected());
		}
		else {
			this.getPersonsInfected();
		}
	}

	async getPersonsInfected() {
		const control = this.persons.filter(person => person.placebo);
		const vaccinated = this.persons.filter(person => !person.placebo);

		if (!this.randomFailed) {
			for (let i = 0; i < 6; i++) {
				let randomControl = control.random();
				while (randomControl.infected) {
					randomControl = control.random();
				}
				randomControl.infected = true;

				let randomVaccinated = vaccinated.random();
				while (randomVaccinated.infected) {
					randomVaccinated = vaccinated.random();
				}
				randomVaccinated.infected = true;
			}
		}
		else {
			for (let i = 0; i < 11; i++) {
				let randomControl = control.random();
				while (randomControl.infected) {
					randomControl = control.random();
				}
				randomControl.infected = true;
			}
			vaccinated.random().infected = true;
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

				const filename = `medical-file-${person.placebo ? 'placebo' : 'vax'}`;
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

		this.rearrangeInfectedPersons();
	}

	async rearrangeInfectedPersons() {
		const nbCols = 4;
		const nbRows = this.infectedPersons.length / nbCols;

		const personHeight = this.infectedPersons[0].height * 1.25;

		const colWidth = (this.width - this.padding.left - this.padding.right) / nbCols;
		const rowHeight = (this.height - this.padding.top - this.padding.bottom - personHeight) / (nbRows - 1);
		const offset = this.padding.top - this.padding.bottom - 34;

		const newPositions = Array.from({ length: this.infectedPersons.length }, (_, i) => ({
			x: this.padding.left + (i % nbCols + 0.5) * colWidth,
			y: this.padding.top + ~~(i / nbCols) * rowHeight + offset,
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
						scale: 1.25
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
			this.showInfo(1, () => this.setupReveal());
		}
		else {
			this.setupReveal();
		}
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
			if (person.placebo) {
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

	getRandomPerson(gender, category) {
		const race = ['white', 'white', 'white', 'asian', 'asian', 'mixed', 'black', 'black'].random();

		const hairType = this.hairCombinations.type[gender][race].random();
		const hairColor = category === 'young'
			? this.hairCombinations.color[race].random()
			: this.hairCombinations.color[category];
		const bald = gender === 'm' && category !== 'young' && Math.random() < 0.25;

		const shirtColor = this.clothesColors.shirt.random();
		const pantsColor = this.clothesColors.pants.filter(e => e !== shirtColor).random();
		const shoesColor = this.clothesColors.shoes.filter(e => e !== pantsColor).random();

		const person = new PIXI.Container();

		const arms = new Sprite(`arms-${gender}-${race}`, {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 246
		});
		person.addChild(arms);

		const pants = new Sprite(`pants-${gender}`, {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 420,
			tint: pantsColor
		});
		person.addChild(pants);

		const shoes = new Sprite('shoes', {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 706,
			tint: shoesColor
		});
		person.addChild(shoes);

		const shirt = new Sprite(`shirt-${gender}`, {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 165,
			tint: shirtColor
		});
		person.addChild(shirt);

		const face = new Sprite(`face-${gender}-${race}`, {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 4
		});
		person.addChild(face);

		const mask = new Sprite('mask', {
			scale: this.scale,
			anchorY: 0,
			y: this.scale * 92
		});
		person.addChild(mask);

		if (!bald) {
			const hair = new Sprite(`hair-${gender}-${hairType}`, {
				scale: this.scale,
				anchorY: 0,
				y: hairType === 'afro' ? -this.scale * 38 : 0,
				tint: hairColor
			});
			person.addChild(hair);
		}
		return person;
	}
}
