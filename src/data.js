export default {
	levels: [
		{
			nucleotides: [
				{
					type: 'A',
					color: 'seagreen',
					hex: 0x2E8B57
				},
				{
					type: 'U',
					color: 'firebrick',
					hex: 0xB22222
				},
				{
					type: 'C',
					color: 'royalblue',
					hex: 0x4169E1
				},
				{
					type: 'G',
					color: 'gold',
					hex: 0xFFD700
				}
			]
		},
		{
			spikeTemplates: [
				[
					{ x: 0.4, y: 1 },
					{ x: 0.4, y: 0.4 },
					{ x: 0.2, y: 0 },
					{ x: 0.8, y: 0 },
					{ x: 0.6, y: 0.4 },
					{ x: 0.6, y: 1 }
				],
				[
					{ x: 0.4, y: 1 },
					{ x: 0.4, y: 0.4 },
					{ x: 0.2, y: 0 },
					{ x: 0.4, y: 0 },
					{ x: 0.5, y: 0.15 },
					{ x: 0.6, y: 0 },
					{ x: 0.8, y: 0 },
					{ x: 0.6, y: 0.4 },
					{ x: 0.6, y: 1 }
				],
				[
					{ x: 0.4, y: 1 },
					{ x: 0.4, y: 0.3 },
					{ x: 0.2, y: 0.3 },
					{ x: 0.2, y: 0 },
					{ x: 0.4, y: 0 },
					{ x: 0.5, y: 0.15 },
					{ x: 0.6, y: 0 },
					{ x: 0.8, y: 0 },
					{ x: 0.8, y: 0.3 },
					{ x: 0.6, y: 0.3 },
					{ x: 0.6, y: 1 }
				],
				// [
				// 	{ x: 0.4, y: 1 },
				// 	{ x: 0.4, y: 0.4 },
				// 	{ x: 0.2, y: 0 },
				// 	{ x: 0.32, y: 0 },
				// 	{ x: 0.45, y: 0.2 },
				// 	{ x: 0.45, y: 0 },
				// 	{ x: 0.55, y: 0 },
				// 	{ x: 0.55, y: 0.2 },
				// 	{ x: 0.67, y: 0 },
				// 	{ x: 0.8, y: 0 },
				// 	{ x: 0.6, y: 0.4 },
				// 	{ x: 0.6, y: 1 }
				// ]
			],
			aminoAcidsColors: [
				0x4169E1,
				0xADD8E6,
				0x2E8B57,
				0xFFA500,
				0xB22222,
				0xFFD700,
				0xE9967A,
				0xDDA0DD
			]
		},
		{
			hairCombinations: {
				type: {
					m: {
						white: ['straight', 'straight', 'straight', 'curly'],
						asian: ['straight'],
						mixed: ['curly'],
						black: ['curly']
					},
					f: {
						white: ['straight', 'curly', 'curly'],
						asian: ['straight', 'straight', 'curly'],
						mixed: ['curly', 'afro', 'afro'],
						black: ['curly', 'afro', 'afro', 'afro']
					}
				},
				color: {
					white: [0x1B1B1B, 0x1B1B1B, 0x8B4513, 0x8B4513, 0xFFD700, 0xFFD700, 0xFFD700, 0xFF8C00],
					asian: [0x1B1B1B, 0x1B1B1B, 0x1B1B1B, 0x8B4513],
					mixed: [0x1B1B1B, 0x1B1B1B, 0x1B1B1B, 0x8B4513],
					black: [0x1B1B1B],
					midAged: 0x696969,
					old: 0xDCDCDC
				}
			},
			clothesColors: {
				shirt: [0xFFFFF0, 0xDEB887, 0x808000, 0xCD5C5C, 0x4169E1, 0x2E8B57, 0xFFA500, 0xB22222, 0x9932CC, 0x1B1B1B],
				pants: [0x778899, 0xCD853F, 0x4169E1, 0x000080, 0x800000, 0x1B1B1B],
				shoes: [0xFFFFF0, 0x1E90FF, 0x8B4513, 0xB22222, 0x1B1B1B]
			}
		}
	]
};
