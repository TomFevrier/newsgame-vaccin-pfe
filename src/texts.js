export default {
	intro: [
		`La campagne de vaccination contre le Covid-19 bat son plein, et plus de *{{ NB_VACCINATIONS }} millions* de personnes ont déjà reçu une première dose de vaccin dans le monde. Jamais des vaccins n'avaient été développés aussi rapidement, grâce à l'émergence de technologies nouvelles et une très grande réactivité des laboratoires.`,
		`Dans ce jeu, vous incarnez un laboratoire pharmaceutique qui s'apprête à se lancer dans le développement d'un vaccin contre le coronavirus SARS-CoV-2. Chaque étape de ce développement, depuis le séquençage du génome du virus jusqu'à la production massive de vaccins, prendra la forme d'un mini-jeu.`,
		`Rassurez-vous : votre progression est sauvegardée, et vous avez la possibilité de quitter et de reprendre le jeu à n'importe quel moment.`,
		`Commencez par choisir le nom de votre laboratoire, ou bien appuyez sur le bouton pour en générer un au hasard.`
	],
	levels: [
		{
			title: `Le séquençage du génome du coronavirus`,
			tutorial: [
				`Le 11 janvier 2020, l'équipe chinoise du professeur Zhang Yongzhen publie pour la première fois le *génome* du virus SARS-CoV-2, ouvrant la voie au développement de vaccins.`,
				`Le génome, c'est la carte d'identité d'un organisme. Chez un virus comme celui du Covid-19, il est codé par *une longue séquence d'ARN*, l'équivalent de l'ADN chez l'humain, composée de 4 types de molécules appelées *nucléotides* : l'adénine (A), l'uracile (U), la cytosine (C) et la guanine (G).`,
				`Séquencer le génome du virus vise donc à reconstituer cette séquence, qui contient pour le virus du Covid-19 *près de 30.000 nucléotides* ! En général, l'ARN n'est pas séquencée en un seul morceau, mais plutôt par brins qui sont ensuite combinés par chevauchements pour obtenir le génome entier, comme une photo panoramique.`,
				`*Comment jouer ?* Au fur et à mesure que les brins d'ARN apparaissent, appuyez sur le bouton correspondant à chaque nucléotide au moment où il atteint la zone verte.`
			],
			alerts: {
				win: {
					title: `Covid-19 : {{ LAB }} se lance dans la course au vaccin`,
					text: `PARIS - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} qu'ils se lançaient dans le développement d'un vaccin contre le SARS-CoV-2.\n_"Grâce à la publication du génome du virus, nous avons bon espoir de pouvoir proposer un vaccin dans les prochains mois"_ a déclaré Alfred Zika, le directeur général de {{ LAB }}.`
				},
				fail: {
					title: `Covid-19 : le bilan s'alourdit, et toujours aucun vaccin en vue`,
					text: `PARIS - Le coronavirus SARS-CoV-2 a fait plus de 1.600 morts en Chine, tandis qu'un premier décès a été enregistré en France le 14 février.\n_"Nous sommes prêts à développer un vaccin, mais nous ne pouvons rien faire avant de connaître le génome du virus"_, a expliqué auprès de l'AIP Alfred Zika, le directeur général des laboratoires {{ LAB }}.`
				}
			},
			more: [
				`Séquencer le génome du SARS-CoV-2 permet donc de mieux le connaître en vue de développer un vaccin. Mais le séquençage permet également de *suivre la diversité du virus*, comme l'explique Florence Débarre, chercheuse en biologie évolutive au CNRS : _"Partout dans le monde, on continue à séquencer des virus pour identifier les mutations, c'est-à-dire les différences dans le code génétique par rapport à une séquence de référence._" Si la plupart de ces mutations sont "neutres", c'est-à-dire qu'elles n'apportent pas d'avantage évolutif, certaines peuvent entraîner l'émergence d'un *variant* plus contagieux ou plus dangereux, comme les fameux variants anglais, sud-africain, brésilien ou indien.`,
				`De plus, mesurer le nombre de mutations permet aussi d'estimer la vitesse de transmission du virus, et même de *retracer les chaînes de contamination*. _"En suivant &ldquo;l'arbre généalogique&rdquo; du virus, on peut détecter si deux malades font partie du même cluster ou bien de deux clusters différents_, détaille Florence Débarre. _Par exemple, dans le cas du cluster à bord du porte-avions Charles-de-Gaulle [où plus de 1000 marins avaient été infectés par le Covid-19], on s'est rendu compte qu'il y avait eu plusieurs introductions du virus à bord."_`,
				`Autre sujet : la *mise à disposition des séquences*. Si le premier génome du virus a été rendu public le 11 janvier 2020, le séquençage était pourtant terminé dès le 5 janvier. Mais le professeur Zhang Yongzhen a alors fait face à un embargo de la Commission nationale de la santé, qui interdisait à toute équipe de recherche chinoise de publier des informations sur l'épidémie qui sévissait à Wuhan. Face à la pression internationale, le génome est finalement publié une semaine plus tard sur un forum académique, grâce au chercheur australien Edward Holmes à qui Zhang avait envoyé la séquence.`,
				`Depuis, c'est au tour de la France d'être régulièrement épinglée pour *son manque de transparence et ses retards dans la communication des données génomiques*. En juillet 2020, Mediapart révèle que [seules 394 séquences avaient été partagées](https://www.mediapart.fr/journal/france/110720/donnees-epidemiologiques-la-penurie-cachee) sur la base de données internationale [Gisaid](https://www.gisaid.org/) - moins de 1 % de l'ensemble des contributions. Faute d'investissement de l'État dans le domaine, seuls 0,4 % des tests positifs ont fait l'objet d'un séquençage, d'après [les données de Gisaid](https://covidcg.org/?tab=global_sequencing) (contre plus de 8 % pour le Royaume-Uni par exemple). Mais les choses tendent à s'améliorer : le délai moyen entre le séquençage et sa publication sur la plateforme, qui était de 128 jours pour la France en décembre, n'est désormais plus que de 23 jours.`
			]
		},
		{
			title: `Comment fonctionnent les vaccins ?`,
			tutorial: [
				`Contrairement aux vaccins classiques, qui consistent en l'injection d'une version atténuée ou désactivée d'un virus, la plupart des vaccins contre le SARS-CoV-2 utilisent *l'ADN ou l'ARN messager (ARNm)*.`,
				`Concrètement, on injecte le "plan" permettant à nos cellules de répliquer la *protéine "Spike"*, présente à la surface du coronavirus, afin que notre système immunitaire apprenne à la reconnaître et fabrique des *anticorps* contre le véritable virus.`,
				`Les vaccins AstraZeneca et Johnson&Johnson sont dits *"à vecteur viral"*, puisqu'ils utilisent un autre virus, rendu inoffensif, pour transporter le matériel génétique du SARS-CoV-2. À l'inverse, les vaccins des laboratoires Pfizer-BioNTech et Moderna sont dits *"à ARNm"*, c'est-à-dire que le "plan" codant pour la protéine Spike est injecté directement, sans intermédiaire.`,
				`*Comment jouer ?* En suivant le plan de l'ARNm, reliez les *acides aminés* afin de fabriquer la protéine Spike. Attention à bien respecter le bon ordre !`
			],
			alerts: {
				win: {
					title: `Covid-19 : {{ LAB }} va pouvoir débuter les essais cliniques pour son vaccin`,
					text: `PARIS - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} que les autorités avaient donné leur accord pour démarrer un essai clinique de phase I pour leur candidat vaccin contre le SARS-CoV-2.\n_"Nous avons fait le choix d'une technologie nouvelle, utilisant l'ARNm, qui s'est montrée très efficace lors des essais pré-cliniques"_, a indiqué Alfred Zika, le directeur général du laboratoire.`
				},
				fail: {
					title: `Covid-19 : {{ LAB }} renonce à son projet de vaccin, faute de résultats satisfaisants`,
					text: `PARIS - Les laboratoires {{ LAB }} ont pris la décision d'abandonner le candidat vaccin contre le SARS-CoV-2 sur lequel ils travaillaient depuis plusieurs mois, a annoncé {{ JOUR }} l'entreprise dans un communiqué.\n_"Nous avions fait le choix d'une technologie nouvelle, utilisant l'ARNm, mais qui ne s'est pas révélée aussi efficace que nous le pensions pour développer une immunité durable"_, a déclaré Alfred Zika, le directeur général du laboratoire.`
				}
			}
		},
		{
			title: `Les essais cliniques`,
			tutorial: [
				`Les *phases I et II* des essais cliniques (parfois confondues pour accélérer le processus) ont lieu sur un petit groupe de volontaires. Elles ont pour objectif de s'assurer à la fois *l'innocuité* (absence de danger et d'effets secondaires indésirables) et *l'immunogénicité* (capacité à susciter une réponse immunitaire) du vaccin.`,
				`La *phase III*, réalisée à plus grande échelle (plusieurs dizaines de milliers de volontaires), permet d'évaluer *l'efficacité* du vaccin. Il s'agit d'une étude "randomisée", c'est-à-dire que seule la moitié des participants sont vaccinés. Les autres recoivent un placebo : c'est le *groupe contrôle*.`,
				`Au bout de quelques semaines, parmi les volontaires infectés par le Covid-19, on étudie la proportion d'entre eux qui avaient reçu un placebo. Si aucun des vaccinés n'est tombé malade, le vaccin a une efficacité de 100 %. S'il y a autant de malades faisant partie du groupe contrôle que de malades ayant été vaccinés, alors le vaccin n'a aucune efficacité.`,
				`*Comment jouer ?* Consignes par encore finalisées`
			],
			info: {
				text: `*Comment jouer ?* Moins il y a de volontaires vaccinés parmi ceux ayant été infectés, plus votre vaccin est efficace ! Appuyez sur chaque personne ayant attrapé le Covid-19 pour révéler son dossier médical et savoir si elle fait partie du groupe contrôle ou bien si elle a été vaccinée.`
			},
			alerts: {
				win: {
					title: `Covid-19 : l'EMA donne son feu vert au vaccin {{ LAB }}`,
					text: `LA HAYE - L'Agence européenne des médicaments (EMA) a approuvé {{ JOUR }} le vaccin développé par le laboratoire {{ LAB }}, qui n'attend plus que l'autorisation de mise sur le marché (AMM) de la Commission européenne pour être distribué sur le continent.\n_"Il s'agit vraiment d'une réussite scientifique historique : ce vaccin est sûr et efficace à près de 92 %"_, a souligné la directrice de l'EMA, Aine Taylor.`
				},
				fail: {
					title: `Covid-19 : {{ LAB }} abandonne son candidat vaccin, pas assez efficace`,
					text: `PARIS - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} l'arrêt de leur programme de développement d'un vaccin contre le SARS-CoV-2.\n_"Les résultats intermédiaires des essais cliniques montrent que le vaccin a bien été toléré, mais les réponses immunitaires induites se sont avérées inférieures à celles observées chez les personnes guéries d'une infection naturelle"_, précise l'entreprise dans son communiqué de presse.`
				},
				failTransparency: {
					title: `Covid-19 : l'OMS dénonce "un manque de transparence" sur les essais cliniques {{ LAB }}`,
					text: `GENÈVE - Le directeur général de l'OMS, Taye Abreham Elshaday`
				}
			}
		},
		{
			title: `Production & pharmacovigilance`,
			tutorial: [
				`Félicitations, votre vaccin a été approuvé par les autorités et *plusieurs centaines de millions de doses* ont déjà été commandées par les pays développés, l'Europe et les États-Unis en tête.`,
				`Pour produire autant de vaccins dans un temps aussi réduit et avec cette technologie nouvelle de l'ARNm, vous allez devoir *sous-traiter une partie de la production et du conditionnement* à d'autres laboratoires, en leur octroyant des licences.`,
				`En parallèle, la campagne de vaccination constitue la phase IV des essais cliniques. La *pharmacovigilance*, c'est-à-dire l'identification des effets secondaires indésirables que les essais cliniques n'avaient pas révélés, peut entraîner une *suspension* de la distribution d'un vaccin si certains risques sont avérés.`,
				`*Comment jouer ?* Appuyez sur le bouton pour remplir les fioles de sérum. Attention à remplir jusqu'en haut, mais sans déborder !`
			],
			alerts: {
				win: {
					title: `Vaccins : six millions de doses {{ LAB }} en plus au deuxième trimestre`,
					text: `PARIS - La France devrait bénéficier _"d'au moins six millions de doses de vaccins supplémentaires au deuxième trimestre"_, a indiqué {{ JOUR }} la ministre déléguée à l'Industrie, Anaïs Vannier-Rousseau.\nCette annonce fait suite à une forte accélération des livraisons de {{ LAB }} à l'Union européenne, qui a annoncé qu'elle allait commander près de 2 milliards de doses supplémentaires au laboratoire d'ici 2023.`
				},
				fail: {
					title: `Vaccins : l'UE poursuit {{ LAB }} pour ses retards de livraisons`,
					text: `BRUXELLES - La Commission européenne a annoncé {{ JOUR }} son intention d'attaquer en justice le laboratoire {{ LAB }}, accusé de ne pas avoir tenu ses engagements sur les livraisons de son vaccin anti-Covid.\nLe laboratoire s'était engagé à livrer quelque 300 millions de doses au premier trimestre 2021, mais seules 80 millions ont finalement été reçues, la faute à _"des problèmes d'approvisionnement indépendants de notre volonté"_, a précisé Alfred Zika, le directeur général de {{ LAB }}.`
				},
				randomFail: {
					title: `La France suspend la vaccination avec {{ LAB }}`,
					text: `PARIS - Emboîtant le pas de ses voisins européens, la France a suspendu {{ JOUR }} l'utilisation du vaccin des laboratoires {{ LAB }}, en raison de cas exceptionnels de caillots sanguins graves chez plusieurs personnes vaccinées.\n_\"J'ai saisi la Haute Autorité de Santé, qui sur la base des recommandations de l'Agence Nationale de Sécurité du Médicament (ANSM), se prononcera sur la poursuite ou non de la vaccination avec {{ LAB }}"_, a déclaré le ministre de la Santé Arnaud Virey.\nL'Agence européenne des médicaments (EMA) a ouvert une enquête, et prévoit de s'exprimer la semaine prochaine sur _"un éventuel lien entre les cas de thromboses recensés et le vaccin"_, a indiqué sa directrice Aine Taylor.`
				}
			}
		}
	],
	outro: [
		`Félicitations ! Vous êtes parvenu en à peine un an à développer *un vaccin sûr et efficace* contre le Covid-19, et à produire *plus d'un milliard de doses* qui sauveront la vie de plusieurs centaines de milliers de personnes.`,
		`Évidemment, une partie du mérite revient aux efforts de vos équipes. Mais n'oubliez pas que rien n'aurait été possible sans plusieurs centaines de millions d'euros de *financements publics* et des décennies de *recherche fondamentale en virologie et immunologie*.`,
		`Retour à la réalité. À l'heure actuelle, *l'épidémie fait rage en Inde et au Brésil*, avec l'émergence de variants plus contagieux. Les services de santé sont débordés et les doses de vaccins, accaparées par les pays riches, tardent à arriver.`,
		`Le 5 mai 2021, le président des États-Unis Joe Biden s'est montré favorable à *une levée des brevets*, qui pourrait permettre aux pays en voie de développement de fabriquer des vaccins sur leur sol - si tant est qu'ils disposent des technologies et des compétences nécessaires pour ces vaccins d'un nouveau genre. Une décision saluée par l'OMS et plusieurs associations humanitaires.`,
		`Et vous ? Seriez-vous prêt·e à renoncer à votre brevet sur votre vaccin {{ LAB }} pour en faire _"un bien public mondial"_, comme l'avait formulé Emmanuel Macron en mai 2020 ?`
	],
	makingOf: [
		{
			title: `Pourquoi un newsgame ?`,
			text: `À l'image de l'article Wikipédia en français qui y est dédié, [long d'à peine une ligne](https://fr.wikipedia.org/wiki/Newsgame), le newsgame ou "jeu d'informations" est encore très peu répandu dans les médias, en particulier français.\nEn ayant l'idée de ce format, j'avais notamment en tête la web-série interactive *Uchroniques*, réalisée par Thierry Tripod et Patrick Mallet et publiée en 2015 par France TV Nouvelles écritures. Ce format hybride - malheureusement tombé dans les limbes d'Internet et dont il ne reste aujourd'hui que [quelques "let's play"](https://www.youtube.com/watch?v=2DH497MHRRo) - proposait à l'internaute de revisiter dix événements historiques, de l'assassinat de Kennedy à la mission Apollo 13, en passant par la présentation du premier Macintosh.\nChaque événement incluait un mini-jeu, qui permettait selon la prestation du joueur de débloquer une fin alternative parmi trois ou quatre possibilités, le tout illustré par des images d'archives, réelles ou fabriquées de toutes pièces pour donner vie à ces uchronies plus ou moins farfelues. Pour ce projet de fin d'études, j'ai repensé en particulier au niveau consacré à Louis Pasteur, qui présentait un mini-jeu expliquant le fonctionnement d'un vaccin.\nPlus récemment, j'ai également été marqué par [ce format interactif de Reuters](https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/), qui vulgarise en animations le principe des différents vaccins anti-Covid alors en cours de développement. Convaincu du potentiel de ce type de format pour vulgariser un sujet aussi complexe et qui nous touche toutes et tous, je me suis lancé dans le développement de mon propre newsgame.`
		},
		{
			title: `Plusieurs défis`,
			text: `Quand j'ai eu l'idée de ce newsgame, en janvier dernier, la campagne vaccinale venait tout juste de débuter en France et en Europe. Quatre mois plus tard, la situation est bien différente : alors qu'[à peine plus d'un Français sur quatre](https://twitter.com/BotDuVaccin) a déjà reçu une première injection, l'Institut Pasteur a abandonné son projet de vaccin, les vaccins AstraZeneca et Johnson&Johnson sont suspendus aux États-Unis et dans d'autres pays à la suite de rares cas de thromboses, et les retards de livraisons s'accumulent pour plusieurs fabricants - autant d'événements qui m'ont inspiré pour différents aspects du jeu.\nLa difficulté dans ce genre de projet est également de trouver le juste équilibre entre l'information et le jeu : trop d'info et l'internaute ne retiendrait rien, pas assez et le jeu serait superficiel. Finalement, la solution a été de laisser le choix au joueur d'approfondir tel ou tel aspect du sujet s'il le souhaite, mais d'apporter l'essentiel à travers le gameplay.`
			// Parler de la difficulté à trouver le bon niveau d'abstraction et de vulgarisation dans le gameplay, pour ne pas que le jeu ne soit qu'un prétexte
		},
		{
			title: `Le gameplay`,
			text: `Et là j'explique les niveaux, les dépêches AFP, le choix du mobile et le fait de mettre en scène l'échec + éléments indépendants de notre volonté`
		},
		{
			title: `Un peu de technique`,
			text: `X lignes de code, Y heures de développement (rajouter 6 heures)... Le jeu a été codé par mes soins de A à Z, en JavaScript et HTML/CSS. J'ai utilisé le moteur de rendu [PIXI.js](https://www.pixijs.com/), [GSAP](https://greensock.com/gsap/) pour les animations et le framework [Svelte](https://svelte.dev/) pour l'interface utilisateur. Tous les graphismes _("sprites")_ ont été réalisés sur Inkscape.`
		}
	]
};
