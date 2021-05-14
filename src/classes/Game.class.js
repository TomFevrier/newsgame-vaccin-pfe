import * as PIXI from 'pixi.js';
import { gsap } from  'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import FontFaceObserver from 'fontfaceobserver';

import levels from '../levels';

import manifest from '../manifest';

const START_LEVEL = null;

window.HACK = false;
window.NODELAY = false;
window.SKIP_MENU = false;

export default class Game {
	constructor(width, view) {
		window.PIXI = PIXI;

		this.app = new PIXI.Application({
			view: view.querySelector('canvas'),
			width,
			height: width * 16/9,
			backgroundColor: 0xDCFFFD,
			antialias: true,
			autoDensity: true,
			resolution: 2,
			failIfMajorPerformanceCaveat: true
		});

		this.view = view;
		this.overlay = this.view.querySelector('.overlay');

		this.width = this.app.renderer.width / this.app.renderer.resolution;
		this.height = this.app.renderer.height / this.app.renderer.resolution;
		this.stage = this.app.stage;
		this.ticker = this.app.ticker;
		this.resources = this.app.loader.resources;

		this.stage.sortableChildren = true;
		this.ticker.maxFPS = 120;

		this.level = null;

		gsap.registerPlugin(PixiPlugin);
		PixiPlugin.registerPIXI(PIXI);
		window.GSAP = gsap;
	}

	get finished() {
		return +localStorage.getItem('level') === levels.length;
	}

	async preload() {
		return new Promise(async (resolve) => {
			const startTime = new Date().getTime();

			const response = await fetch('https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json');
			const data = await response.json();
			this.nbVaccinations = ~~(data.find(d => d.iso_code === 'OWID_WRL').data.last().people_vaccinated / 1e6);

			await new FontFaceObserver('Gotham', { weight: 'bold' }).load();

			Howler.volume(0.2);

			this.sounds = {};
			Object.entries(manifest).forEach(([category, list]) => {
				if (category !== 'sounds') {
					list.forEach(item => {
						const path = `${category}/${item}`;
						this.app.loader.add(path.replace('.png', ''), path);
					});
				}
				else {
					list.forEach(item => {
						const name = item.substring(0, item.indexOf('.'));
						this.sounds[name] = new Howl({
							src: [`sounds/${item}`]
						});
					})
				}
			});

			this.app.loader.load();

			this.app.loader.onComplete.add(() => {
				const endTime = new Date().getTime();
				const timeElapsed = endTime - startTime;
				const timeRemaining = Math.max(0, 3000 - timeElapsed);
				setTimeout(resolve, NODELAY ? 0 : timeRemaining);
			});
		});
	}

	start() {
		this.goToLevel(START_LEVEL ? START_LEVEL - 1 : 0);
	}

	goToLevel(index) {
		this.overlay.style.opacity = 1;

		setTimeout(() => {
			this.level && this.level.destroy();
			this.level = new (levels[index])();
		}, 500);

		setTimeout(() => {
			this.overlay.style.opacity = 0;
			this.level.launch();
		}, 1000);
	}

	goToState(state) {
		this.overlay.style.opacity = 1;

		setTimeout(() => {
			this.level && this.level.destroy();
		}, 500);

		setTimeout(() => {
			this.overlay.style.opacity = 0;
			this.setState(state);
		}, 1000);

	}

	pause() {
		this.ticker.stop();
	}

	unpause() {
		this.ticker.start();
	}
}
