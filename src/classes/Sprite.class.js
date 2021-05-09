import * as PIXI from 'pixi.js';

export default class Sprite {
	constructor(name, options = {}) {
		const sprite = new PIXI.Sprite(GAME.resources['sprites/' + name].texture);
		if (options.scale) {
			sprite.width *= options.scale;
			sprite.height *= options.scale;
		}
		else {
			sprite.height = options.height || (options.width
				? (options.width / sprite.width) * sprite.height
				: sprite.height
			);
			sprite.width = options.width || sprite.width;
		}

		sprite.x = options.x || sprite.x;
		sprite.y = options.y || sprite.y;

		sprite.angle = options.rotation || 0;

		sprite.name = options.name;

		sprite.anchor.set(
			options.anchorX !== undefined ? options.anchorX : 0.5,
			options.anchorY !== undefined ? options.anchorY : 0.5
		);

		sprite.tint = options.tint || 0xFFFFFF;

		return sprite;
	}
}
