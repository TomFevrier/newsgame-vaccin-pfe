import Level from './Level.class.js';

import { Sprite } from '../classes';

import { distance, map, sleep } from '../utils';

import data from '../data';


export default class Level2 extends Level {
	constructor() {
		super();
		this.index = 1;
		this.markerRadius = 14;
		this.spikeTemplates = data.levels[this.index].spikeTemplates;
		this.aminoAcidsColors = data.levels[this.index].aminoAcidsColors;

		this.nbLives = HACK ? 1 : 3;
	}

	launch() {
		this.setupBackground();
		this.showTutorial();
	}

	get win() {
		return this.nbProteins === (HACK ? 1 : 5);
	}

	setupBackground() {
		for (let i = 0; i < 50; i++) {
			const alea = Math.random();

			const filter = new PIXI.filters.BlurFilter();
			filter.blur = map(alea, 0, 1, 12, 4);

			const blob = new PIXI.Container();
			blob.x = Math.random() * this.width;
			blob.y = Math.random() * this.height;
			blob.filters = [filter];
			this.background.addChild(blob);

			const radius = map(alea, 0, 1, 5, 30);

			const outer = new PIXI.Graphics()
				.beginFill(0x00FFFF)
				.drawCircle(0, 0, radius)
				.endFill();
			outer.alpha = 0.2;
			blob.addChild(outer);

			const inner = new PIXI.Graphics()
				.beginFill(0x00A9A0)
				.drawCircle(0, 0, radius * 0.8)
				.endFill();
			inner.alpha = 0.3;
			blob.addChild(inner);
		}

		this.tickBackground = (delta) => {
			this.background.children.forEach(blob => {
				blob.x += (-1 + Math.random() * 2) * delta;
				blob.y += (-1 + Math.random() * 2) * delta;
				if (blob.x + blob.width * 0.5 < 0) {
					blob.x = this.width + blob.width * 0.5;
				}
				else if (blob.x - blob.width * 0.5 > this.width) {
					blob.x = -blob.width * 0.5;
				}
				else if (blob.y + blob.height * 0.5 < 0) {
					blob.y = this.height + blob.height * 0.5;
				}
				else if (blob.y - blob.height * 0.5 > this.height) {
					blob.y = -blob.height * 0.5;
				}
			});
		}

		GAME.ticker.add(this.tickBackground);
	}

	start() {
		this.spikeTemplateIndex = 0;
		this.nbProteins = 0;
		this.nbErrors = 0;

		this.setupDrawingBoard();
		this.switchBlueprint();
		this.generateMarkers();
	}

	setupDrawingBoard() {
		this.drawingBoard = new PIXI.Container();
		this.drawingBoard.name = 'drawingBoard';
		this.content.addChild(this.drawingBoard);

		this.drawingBoard.interactive = true;
		this.drawingBoard.hitArea = new PIXI.Rectangle(0, this.height * 0.5, this.width, this.height * 0.5);

		let lines = [];
		let dragging = false;
		let transitionning = false;

		const lineStyle = {
			width: 5,
			color: 0x00A9A0,
			cap: PIXI.LINE_CAP.ROUND,
			join: PIXI.LINE_JOIN.ROUND
		};

		const handleMouseDown = (e) => {
			if (transitionning) return;

			dragging = true;

			const { x: mouseX, y: mouseY } = e.data.global;
			lines.push({
				x: mouseX,
				y: mouseY
			});

			this.trace = new PIXI.Container();
			this.trace.zIndex = 42;
			this.trace.pivot.set(0.5);
			this.drawingBoard.addChild(this.trace);
		}

		const handleMouseMove = (e) => {
			if (!dragging || transitionning) return;

			const { x: mouseX, y: mouseY } = e.data.global;

			const line = new PIXI.Graphics();
			line.lineStyle(lineStyle);
			line.moveTo(lines.last().x, lines.last().y);
			line.lineTo(mouseX, mouseY);
			lines.push({
				x: mouseX,
				y: mouseY,
				line
			});
			this.trace.addChild(line);

			this.markers.children.forEach(async (marker, i) => {
				if (distance(marker, { x: mouseX, y: mouseY }) > this.markerRadius) return;
				if (i > 0) {
					handleMouseUp();
				}
				else {
					this.markers.removeChild(marker);
					GAME.sounds.pop.play();
				}
			});
		}

		const handleMouseUp = async () => {
			if (!dragging || transitionning) return;

			dragging = false;
			transitionning = true;
			setTimeout(() => transitionning = false, 2000);

			if (lines.length === 0) return;

			const success = this.markers.children.length === 0;
			if (!success) this.handleError();
			else {
				this.handleSuccess();
				const line = new PIXI.Graphics();
				line.lineStyle(lineStyle);
				line.moveTo(lines.last().x, lines.last().y);
				line.lineTo(lines[0].x, lines[0].y);
				this.trace.addChild(line);
			}

			lines = [];

			await sleep(1);

			this.spikeTemplateIndex = ~~(Math.random() * this.spikeTemplates.length);
			this.switchBlueprint();
			this.generateMarkers();

			if (success) {
				GSAP.to(this.trace, {
					pixi: {
						x: '+=' + this.width
					},
					duration: 0.5
				})
				.then(() => this.drawingBoard.removeChild(this.trace));
			}
			else {
				GSAP.to(this.trace, {
					pixi: {
						blur: 10,
						alpha: 0
					},
					duration: 1
				})
				.then(() => this.drawingBoard.removeChild(this.trace));
			}

		}

		this.drawingBoard.on('mousedown', handleMouseDown);
		window.TouchEvent && this.drawingBoard.on('touchstart', handleMouseDown);

		this.drawingBoard.on('mousemove', handleMouseMove);
		window.TouchEvent && this.drawingBoard.on('touchmove', handleMouseMove);

		this.drawingBoard.on('mouseup', handleMouseUp);
		window.TouchEvent && this.drawingBoard.on('touchend', handleMouseUp);
	}

	async switchBlueprint() {
		const oldBlueprint = this.content.getChildByName('blueprint');

		if (oldBlueprint) {
			await GSAP.to(oldBlueprint, {
				pixi: {
					x: this.width * 1.5,
					rotation: 45
				},
				duration: 0.75
			})
			this.content.removeChild(oldBlueprint);
		}

		if (this.win || this.fail) return;

		const blueprint = new PIXI.Container();
		blueprint.name = 'blueprint';
		blueprint.position.set(-this.width * 0.5, this.width * 0.4);
		blueprint.rotation = -Math.PI / 4;
		this.content.addChild(blueprint);

		blueprint.addChild(new Sprite('blueprint-background', {
			width: this.width * 0.7
		}));

		blueprint.addChild(new Sprite(`spike-${this.spikeTemplateIndex}`, {
			width: this.width * 0.7
		}));

		GSAP.to(blueprint, {
			pixi: {
				x: this.width * 0.5,
				rotation: 0
			},
			duration: 0.75
		});
	}

	async generateMarkers() {
		if (this.markers) {
			await Promise.all(this.markers.children.map(marker => {
				marker.animation.kill();
				return GSAP.to(marker, {
					pixi: {
						y: this.height + this.markerRadius * 2
					},
					duration: 0.5,
					delay: Math.random() * 0.5
				});
			}));
			this.content.removeChild(this.markers);
		}
		else {
			await sleep(1);
		}

		if (this.win || this.fail) return;

		this.markers = new PIXI.Container();
		this.markers.name = 'markers';
		this.content.addChild(this.markers);

		const drawingBoardBbox = this.drawingBoard.getBounds();

		const padding = {
			top: 20,
			right: 0,
			bottom: 50,
			left: 0
		};

		this.spikeTemplates[this.spikeTemplateIndex].forEach((vertex, i) => {
			const marker = new PIXI.Container();
			marker.position.set(
				drawingBoardBbox.x + padding.left + vertex.x * (drawingBoardBbox.width - padding.left - padding.right),
				this.height + this.markerRadius * 2
			);
			marker.name = `marker-${i}`;
			this.markers.addChild(marker);

			GSAP.to(marker, {
				pixi: {
					y: drawingBoardBbox.y + padding.top + vertex.y * (drawingBoardBbox.height - padding.top - padding.bottom)
				},
				duration: 0.5,
				delay: Math.random() * 0.5
			});

			// Pulse
			marker.animation = GSAP.to(marker, {
				pixi: {
					scale: 1.2
				},
				duration: 1,
				repeat: -1,
				yoyo: true,
				delay: Math.random()
			});

			const aminoAcid = new PIXI.Graphics()
				.beginFill(this.aminoAcidsColors.random())
				.drawCircle(0, 0, this.markerRadius)
				.endFill();
			marker.addChild(aminoAcid);

			const highlight = new Sprite('amino-acid-highlight', {
				width: this.markerRadius * 2,
				height: this.markerRadius * 2
			});
			marker.addChild(highlight);
		});
	}

	async handleSuccess() {
		this.nbProteins++;

		GAME.sounds.success.play();

		await sleep(1.5);

		if (this.win) {
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

		await sleep(0.5);

		if (this.fail) {
			this.handleFail();
		}
	}
}
