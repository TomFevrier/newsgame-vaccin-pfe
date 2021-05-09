const distance = (a, b) => {
	const { x: x1, y: y1 } = a instanceof PIXI.DisplayObject
		? {
			x: a.getBounds().x + a.getBounds().width / 2,
			y: a.getBounds().y + a.getBounds().height / 2
		}
		: a;

	const { x: x2, y: y2 } = b instanceof PIXI.DisplayObject
		? {
			x: b.getBounds().x + a.getBounds().width / 2,
			y: b.getBounds().y + b.getBounds().height / 2
		}
		: b;

	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

const distanceSimple = (a, b) => {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

const isIntersecting = (a, b) => {
	const aBbox = a.getBounds();
	const bBbox = b.getBounds();
	return (
		bBbox.y < aBbox.y + aBbox.height * 0.5 &&
		aBbox.y + aBbox.height * 0.5 < bBbox.y + bBbox.height
	);
}

const map = (value, start1, end1, start2, end2) => {
	return start2 + (end2 - start2) * (value - start1) / (end1 - start1);
}

const sleep = async (time) => {
	return new Promise(resolve => {
		setTimeout(resolve, time * 1000);
	});
}

const typografix = (html) => {
	let output = html;

	// Guillemets français et espaces non sécables
	const matchesGuillemets = output.match(/"[^\"]*"/g);
	matchesGuillemets && matchesGuillemets.forEach(match => {
		output = output.replace(match, `&laquo;&nbsp;${match.slice(1, -1)}&nbsp;&raquo;`);
	});

	// Gras
	const matchesBold = output.match(/\*[^\*]*\*/g);
	matchesBold && matchesBold.forEach(match => {
		output = output.replace(match, `<b>${match.slice(1, -1)}</b>`);
	});

	// Italique
	const matchesItalic = output.match(/_[^_]*_/g);
	matchesItalic && matchesItalic.forEach(match => {
		output = output.replace(match, `<i>${match.slice(1, -1)}</i>`);
	});

	// Liens
	const matchesLinks = output.match(/\[[^\[\]]*\]\(\S+\)/g);
	matchesLinks && matchesLinks.forEach(match => {
		const url = match.match(/\(\S+\)/)[0].slice(1, -1);
		const text = match.match(/\[.+\]/)[0].slice(1, -1);
		output = output.replace(match, `<a href=${url} target=_blank>${text}</a>`);
	})

	output = output
		.replace(/  /g, " ")						// Doubles espaces
		.replace(/'/g, "&rsquo;")					// Apostrophes
		.replace(/ :/g, "&nbsp;:")					// Espaces non sécables
		.replace(/ ;/g, "&nbsp;;")
		.replace(/ !/g, "&nbsp;!")
		.replace(/ \?/g, "&nbsp;?")
		.replace(/ - /g, " &mdash;&nbsp;")			// Tirets cadratins
		.replace(/ \%/g, "&nbsp;%");				// Pourcentages

	return output;
}

const generateRandomName = () => {
	const firstWords = ['Astra', 'Vax', 'Covi', 'Bio', 'Johnson&', 'Cure', 'Comir', 'Convi', 'Sino', 'Corona', 'Nova', 'Sputnik'];
	const lastWords = ['Zeneca', 'Vax', 'Vac', 'Zevria', 'Shield', '&Johnson', 'NTech', 'Naty', 'decia', 'pharm'];

	const randomFirst = firstWords.random();
	const randomLast = lastWords.filter(e => e.replace('&', '') !== randomFirst.replace('&', '')).random();

	return randomFirst + randomLast;
}

const getRandomColor = () => ~~((200 + Math.random() * 0x100) + (200 + Math.random() * 0x100) * 0x100 + (200 + Math.random() * 0x100) * 0x10000);

export {
	distance,
	distanceSimple,
	isIntersecting,
	map,
	sleep,
	typografix,
	generateRandomName
};
