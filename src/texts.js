export default {
	intro: [
		`La campagne de vaccination contre le Covid-19 bat son plein, et plus de *{{ NB_VACCINATIONS }} millions* de personnes ont déjà reçu une première dose de vaccin dans le monde. Jamais des vaccins n'avaient été développés aussi rapidement, grâce à l'émergence de technologies nouvelles et une très grande réactivité des laboratoires.`,
		`Dans ce jeu, *vous incarnez un laboratoire pharmaceutique* qui s'apprête à se lancer dans le développement d'un vaccin contre le coronavirus SARS-CoV-2. Chaque étape de ce développement, depuis le séquençage du génome du virus jusqu'à la production massive de vaccins, prendra la forme d'un mini-jeu.`,
		`Rassurez-vous : votre progression est sauvegardée, et vous avez la possibilité de quitter et de reprendre le jeu à n'importe quel moment.`,
		`Commencez par choisir le nom de votre laboratoire, ou bien appuyez sur le bouton pour en générer un au hasard.`
	],
	levels: [
		{
			title: `Le séquençage du génome du coronavirus`,
			tutorial: [
				`Le 11 janvier 2020, l'équipe chinoise du professeur Zhang Yongzhen publie pour la première fois le *génome* du virus SARS-CoV-2, ouvrant la voie au développement de vaccins.`,
				`Le génome, c'est la carte d'identité d'un organisme. Chez un virus comme celui du Covid-19, il est codé par *une longue séquence d'ARN*, l'équivalent de l'ADN chez l'humain, composée de 4 types de molécules appelées *nucléotides* : l'adénine (A), l'uracile (U), la cytosine (C) et la guanine (G).`,
				`Séquencer le génome du virus vise donc à reconstituer cette séquence, qui contient pour le virus du Covid-19 *près de 30.000 nucléotides* ! En général, l'ARN n'est pas séquencé en un seul morceau, mais plutôt par brins qui sont ensuite combinés par chevauchements pour obtenir le génome entier, comme une photo panoramique.`,
				`*Comment jouer ?* Au fur et à mesure que les brins d'ARN apparaissent, appuyez sur le bouton correspondant à chaque nucléotide au moment où il atteint la zone verte.`
			],
			alerts: {
				win: {
					title: `Covid-19 : {{ LAB }} se lance dans la course au vaccin`,
					text: `PARIS - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} qu'ils se lançaient dans le développement d'un vaccin contre le SARS-CoV-2.\n_"Grâce à la publication du génome du virus, nous avons bon espoir de pouvoir proposer un vaccin dans les prochains mois"_ a déclaré Alfred Zika, le directeur général de {{ LAB }}.`
				},
				fail: {
					title: `Covid-19 : le bilan s'alourdit, et toujours aucun vaccin en vue`,
					text: `PARIS - Le coronavirus SARS-CoV-2 a fait plus de 1.600 morts en Chine, tandis qu'un premier décès a été enregistré en France le 14 février.\n_"Nous sommes prêts à développer un vaccin, mais sans le génome du virus nous sommes impuissants"_, a expliqué auprès de l'AIP Alfred Zika, le directeur général des laboratoires {{ LAB }}.`
				}
			},
			more: [
				`Séquencer le génome du SARS-CoV-2 permet donc de mieux le connaître en vue de développer un vaccin. Mais le séquençage permet également de *suivre la diversité du virus*, comme l'explique Florence Débarre, chercheuse en biologie évolutive au CNRS : _"Partout dans le monde, on continue à séquencer des virus pour identifier les mutations, c'est-à-dire les différences dans le code génétique par rapport à une séquence de référence."_ Si la plupart de ces mutations sont "neutres", c'est-à-dire qu'elles n'apportent pas d'avantage évolutif, certaines peuvent entraîner l'émergence d'un *variant plus contagieux ou plus dangereux*, comme les fameux variants anglais, sud-africain, brésilien et indien.`,
				`De plus, mesurer le nombre de mutations permet d'estimer la vitesse de transmission du virus, et même de *retracer les chaînes de contamination*. _"En suivant &ldquo;l'arbre généalogique&rdquo; du virus, on peut détecter si deux malades font partie du même cluster ou bien de deux clusters différents_, détaille Florence Débarre. _Par exemple, dans le cas du cluster à bord du porte-avions Charles-de-Gaulle [où plus de mille marins avaient été infectés par le Covid-19], on s'est rendu compte qu'il y avait eu plusieurs introductions du virus à bord."_`,
				`Autre sujet : la *mise à disposition des séquences*. Si le premier génome du virus a été rendu public le 11 janvier 2020, le séquençage était pourtant terminé dès le 5 janvier. Mais le professeur Zhang Yongzhen a alors fait face à un embargo de la Commission nationale de la santé, qui interdisait à toute équipe de recherche chinoise de publier des informations sur l'épidémie qui sévissait à Wuhan. Face à la pression internationale, le génome est finalement publié une semaine plus tard sur un forum académique, grâce au chercheur australien Edward Holmes à qui Zhang avait envoyé la séquence.`,
				`Depuis, c'est au tour de la France d'être régulièrement épinglée pour *son manque de transparence et ses retards dans la communication des données génomiques*. En juillet 2020, Mediapart révèle que [seules 394 séquences avaient été partagées](https://www.mediapart.fr/journal/france/110720/donnees-epidemiologiques-la-penurie-cachee) sur la base de données internationale [Gisaid](https://www.gisaid.org/) - moins de 1 % de l'ensemble des contributions. Faute d'investissement de l'État dans le domaine, seuls 0,4 % des tests positifs ont fait l'objet d'un séquençage, d'après [les données de Gisaid](https://covidcg.org/?tab=global_sequencing) (contre plus de 8 % pour le Royaume-Uni par exemple). Malgré tout, [les choses tendent à s'améliorer](https://spark.adobe.com/page/hTYRzo0oKSdGU/) : le délai moyen entre le séquençage et sa publication sur la plateforme, qui était de 128 jours pour la France en décembre, n'est désormais plus que de 22 jours.`
			]
		},
		{
			title: `Les vaccins à ARNm messager`,
			tutorial: [
				`Contrairement aux vaccins classiques, qui consistent en l'injection d'une version atténuée ou désactivée d'un virus, la plupart des vaccins contre le SARS-CoV-2 utilisent *l'ADN ou l'ARN messager (ARNm)*.`,
				`Concrètement, on injecte le "plan" permettant à nos cellules de répliquer la *protéine "Spike"*, présente à la surface du coronavirus, afin que notre système immunitaire apprenne à la reconnaître et fabrique des *anticorps* contre le véritable virus.`,
				`Les vaccins AstraZeneca et Johnson&Johnson sont dits *"à vecteur viral"*, puisqu'ils utilisent un autre virus, rendu inoffensif, pour transporter le matériel génétique du SARS-CoV-2. À l'inverse, les vaccins des laboratoires Pfizer-BioNTech et Moderna sont dits *"à ARNm"*, c'est-à-dire que le "plan" codant pour la protéine Spike est injecté directement, sans intermédiaire.`,
				`*Comment jouer ?* En suivant le plan de l'ARNm, reliez soigneusement les *acides aminés* afin de fabriquer la protéine Spike. Attention à bien respecter le bon ordre, et à ne pas aller trop vite !`
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
			},
			more: [
				`Comment expliquer le succès des *vaccins à ARN messager* de Pfizer-BioNTech et Moderna ? Selon Steve Pascolo, chercheur à l'hôpital universitaire de Zürich, cela tient à leur efficacité, à leur sécurité et à leur versatilité. _"Un vaccin classique est constitué de virus ou de protéines qui sont difficiles à produire et qu'il faut purifier, préserver... il y a beaucoup de points d'interrogation_, détaille-t-il. _Avec l'ARNm, il n'y a plus de points d'interrogation : une fois que l'on sait créer une séquence, il est relativement facile et rapide de produire un vaccin."_ Steve Pascolo en sait quelque chose, puisqu'il est l'ancien directeur scientifique de *CureVac*, un laboratoire pharmaceutique allemand pionnier de l'ARNm qu'il a cofondé en 2000. Leur vaccin anti-Covid vient de terminer ses essais cliniques de phase III et devrait être homologué au mois de juin par l'Agence européenne des médicaments (EMA).`,
				`Si les vaccins à ARNm ont pu susciter la méfiance, il ne s'agit pourtant pas d'une technologie entièrement nouvelle, comme l'explique l'immunologiste. _"Si vous avez déjà été vacciné contre la rougeole, les oreillons et la rubéole (ROR), *vous avez déjà rencontré des vaccins à ARNm*_, précise-t-il. _On injecte un virus vivant mais atténué, qui va libérer son génome sous forme d'ARN dans nos cellules et les forcer à produire des protéines virales contre lesquelles notre système immunitaire apprend à se défendre."_ Le vaccin contre la fièvre jaune, qui existe depuis près de 80 ans, fonctionne également sur le même principe. La différence avec ces nouveaux vaccins ? _"Le mode d'action est le même, mais au lieu d'une membrane virale l'ARN est entouré d'un *liposome entièrement synthétique*, comme une couche de bulles de gras."_`,
				`C'est la fragilité de ce liposome qui explique les *conditions extrêmes de conservation* des vaccins à ARNm (-20°C pour Moderna, et jusqu'à -70°C pour Pfizer-BioNTech). _"Contrairement à ce que l'on a parfois entendu, l'ARN est très résistant : c'est la seule molécule biologique que l'on peut lyophiliser, congeler ou chauffer à 90°C sans qu'elle soit dégradée !"_ Mais ce n'est pas le cas des lipides qui l'entourent, qui à température ambiante ont tendance à fusionner ou à se rompre, laissant échapper l'ARN. Cette membrane est pourtant essentielle pour garantir l'efficacité du vaccin. _"On pourrait injecter l'ARN directement, mais on n'a aucune certitude qu'il parvienne jusqu'aux cellules_, poursuit le chercheur. _C'est un peu comme si vous colliez un timbre sur un bout de papier : votre courrier a des chances d'arriver à destination, mais c'est beaucoup plus sûr de faire appel à un transporteur comme DHL !"_`,
				`Malgré une technologie nouvelle, les vaccins à ARNm ont su démontrer leur efficacité dans la lutte contre le Covid-19. Mais qu'en est-il de la menace des *variants* ? _"Pour le moment, les études ont prouvé qu'ils restaient efficaces contre tous les variants, contrairement aux autres types de vaccins_, rassure Steve Pascolo. _Israël, où près de 60 % de la population est vaccinée, constitue un &ldquo;laboratoire en temps réel&rdquo; : s'il devait y avoir un variant résistant aux vaccins, c'est là-bas qu'il apparaîtrait et on observerait alors une résurgence de l'épidémie - à l'heure actuelle ce n'est pas le cas."_`
			]
		},
		{
			title: `Les essais cliniques`,
			tutorial: [
				`Les *phases I et II* des essais cliniques (parfois confondues pour accélérer le processus) ont lieu sur un petit groupe de volontaires. Elles ont pour objectif de s'assurer à la fois de *l'innocuité* (absence de danger et d'effets secondaires indésirables) et de *l'immunogénicité* (capacité à susciter une réponse immunitaire) du vaccin.`,
				`La *phase III*, réalisée à plus grande échelle (plusieurs dizaines de milliers de volontaires), permet d'évaluer *l'efficacité* du vaccin. Il s'agit d'une étude "randomisée", c'est-à-dire que seule la moitié des participants sont vaccinés. Les autres recoivent, sans le savoir, un placebo : c'est le *groupe contrôle*.`,
				`Au bout de quelques semaines, parmi les volontaires ayant contracté le Covid-19, on étudie *la proportion d'entre eux qui avaient reçu un placebo*. Si aucun des vaccinés n'est tombé malade, le vaccin a une efficacité de 100 %. S'il y a autant de malades faisant partie du groupe contrôle que de malades ayant été vaccinés, alors le vaccin n'a aucune efficacité.`,
				`*Comment jouer ?* Appuyez sur chaque volontaire pour lui administrer soit une dose de vaccin, soit un placebo. Attention à ce qu'il y ait autant de participants dans le groupe contrôle que de vaccinés !`
			],
			infos: [
				`Une fois que l'on a injecté à tous les participants soit une dose de vaccin, soit un placebo, on attend quelques semaines pour voir lesquels parmi eux attrapent le Covid-19.`,
				`*Comment jouer ?* Moins il y a de volontaires vaccinés parmi ceux ayant été infectés, plus votre vaccin est efficace ! Appuyez sur chaque personne ayant attrapé le Covid-19 pour révéler son dossier médical et savoir si elle fait partie du groupe contrôle ou bien si elle a été vaccinée.`
			],
			alerts: {
				win: {
					title: `Covid-19 : l'EMA donne son feu vert au vaccin {{ LAB }}`,
					text: `LA HAYE - L'Agence européenne des médicaments (EMA) a approuvé {{ JOUR }} le vaccin développé par le laboratoire {{ LAB }}, qui n'attend plus que l'autorisation de mise sur le marché (AMM) de la Commission européenne pour être distribué sur le continent.\n_"Il s'agit vraiment d'une réussite scientifique historique : les résultats des essais cliniques montrent que ce vaccin est sûr et efficace à près de 92 %"_, a souligné la directrice de l'EMA, Aine Taylor.`
				},
				fail: {
					title: `Covid-19 : {{ LAB }} abandonne son candidat vaccin, pas assez efficace`,
					text: `PARIS - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} l'arrêt de leur programme de développement d'un vaccin contre le SARS-CoV-2.\n_"Les résultats intermédiaires des essais cliniques montrent que le vaccin a bien été toléré, mais les réponses immunitaires induites se sont avérées inférieures à celles observées chez les personnes guéries d'une infection naturelle"_, précise l'entreprise dans son communiqué de presse.`
				},
				failTransparency: {
					title: `Vaccin {{ LAB }} : une annonce "prématurée et peu crédible" selon l'OMS`,
					text: `GENÈVE - Les laboratoires {{ LAB }} ont annoncé {{ JOUR }} avoir développé un vaccin sûr et efficace contre le SARS-CoV-2, une déclaration jugée _"prématurée et peu crédible"_ par l'Organisation mondiale de la Santé (OMS).\n_"Les essais cliniques obéissent à un protocole rigoureux : à l'heure actuelle, tout porte à croire que celui-ci n'a pas été respecté"_, a déclaré le directeur général de l'OMS, Taye Abreham Elshaday. Il déplore _"un manque de transparence"_ de la part de {{ LAB }}, qui laisse planer _"un doute sur l'efficacité réelle de ce vaccin"_.`
				}
			},
			more: [
				`Bien entendu, *le mini-jeu n'est absolument pas à l'échelle*. Dans la réalité, même avec des essais cliniques de phase III portant sur des dizaines de milliers de volontaires, l'échantillon permettant de mesurer l'efficacité du vaccin reste de petite taille, dans la mesure où il correspond au nombre de participants infectés par le Covid-19. Dans le cas du vaccin Pfizer-BioNTech, ce sont 43.548 personnes qui se sont vu injecter soit deux doses de vaccin, soit deux doses de placebo : parmi eux, 170 ont contracté la maladie, dont seulement 8 avait été vaccinés - ce qui donne un taux d'efficacité de 95 %. Pour Moderna, 196 volontaires sur plus de 30.000 ont été infectés, et seuls 11 d'entre eux ne faisaient pas partie du groupe contrôle - soit un taux d'efficacité similaire de 94,5 %.`,
				`Peu de temps après l'annonce de Pfizer-BioNTech en novembre 2020, la Russie revendique à son tour un taux d'efficacité de 92 %... sur un échantillon de seulement 20 cas confirmés de coronavirus. *Ces mesures d'efficacité sont donc à prendre avec des pincettes*, puisqu'elles dépendent fortement de la taille et de la représentativité des échantillons, ainsi que du seuil statistique choisi par le laboratoire - à partir de combien de volontaires infectés arrêter l'essai clinique.`,
				`Le 25 janvier 2021, *l'Institut Pasteur annonce l'abandon de son candidat vaccin* le plus avancé, basé sur un vaccin contre la rougeole modifié pour lutter contre le SARS-CoV-2. Les essais cliniques de phase I avaient abouti sur un échec, avec un taux d'anticorps _"deux à trois fois moindre que les moyennes observées chez un groupe de personnes guéries d'une infection naturelle"_, s'est justifié le professeur Bruno Hoen, directeur de la recherche médicale de l'institut. Une immense déception pour qui avait l'espoir de voir l'émergence d'un vaccin français avant la fin de l'année.`,
				`Pourquoi l'Institut Pasteur a-t-il fait le choix de cette technologie, plutôt que de prendre la voie des vaccins à ARNm qui se sont révélés les plus efficaces contre le virus ? _"Début 2020, chaque laboratoire a commencé à travailler sur un vaccin avec la technologie qu'il maîtrisait_, explique Steve Pascolo, immunologiste à l'hôpital universitaire de Zürich. _L'ARNm pour BioNTech et Moderna, les adénovirus pour AstraZeneca et Moderna, et le vecteur rougeole pour Pasteur. Avant les essais cliniques, personne ne pouvait savoir quels vaccins allaient être les plus efficaces."_ Ironiquement, *c'est pourtant l'Institut Pasteur qui avait découvert l'ARN messager* en 1961. Mais les vaccins à ARNm ont longtemps été méprisés par la recherche académique. _"Quand je présentais mes résultats, certains universitaires avaient le toupet de me dire que ça ne pouvait pas fonctionner... quand bien même mes recherches prouvaient le contraire !_ raconte Steve Pascolo. _Les investisseurs privés n'avaient pas ces préjugés."_`
			],
		},
		{
			title: `Production & pharmacovigilance`,
			tutorial: [
				`Félicitations, votre vaccin a été approuvé par les autorités et *plusieurs centaines de millions de doses* ont déjà été commandées par les pays développés, l'Europe et les États-Unis en tête.`,
				`Pour produire autant de vaccins dans un temps aussi réduit et avec cette technologie nouvelle de l'ARNm, vous allez devoir *sous-traiter une partie de la production et du conditionnement* à d'autres laboratoires, parfois concurrents, en leur octroyant des licences.`,
				`En parallèle, la campagne de vaccination constitue la phase IV des essais cliniques. La *pharmacovigilance*, c'est-à-dire l'identification des effets secondaires indésirables que les essais cliniques n'avaient pas révélés, peut entraîner une *suspension* de la distribution d'un vaccin si certains risques sont avérés.`,
				`*Comment jouer ?* Appuyez sur le bouton pour remplir les fioles de vaccin. Attention à remplir jusqu'en haut, mais sans déborder !`
			],
			alerts: {
				win: {
					title: `Vaccins : six millions de doses {{ LAB }} en plus au deuxième trimestre`,
					text: `PARIS - La France devrait bénéficier _"d'au moins six millions de doses de vaccins supplémentaires au deuxième trimestre"_, a indiqué {{ JOUR }} la ministre déléguée à l'Industrie, Anaïs Vannier-Rousseau.\nCette annonce fait suite à une forte accélération des livraisons de {{ LAB }} à l'Union européenne, qui a annoncé qu'elle allait commander près de 2 milliards de doses supplémentaires au laboratoire d'ici 2023.`
				},
				fail: {
					title: `Vaccins : l'UE poursuit {{ LAB }} pour ses retards de livraisons`,
					text: `BRUXELLES - La Commission européenne a annoncé {{ JOUR }} son intention d'attaquer en justice le laboratoire {{ LAB }}, accusé d'avoir failli à ses obligations pour les livraisons de son vaccin anti-Covid.\nLe laboratoire s'était engagé à livrer quelque 300 millions de doses au premier trimestre 2021, mais seules 80 millions ont finalement été reçues.\n_"Notre priorité est de nous assurer que les citoyens européens disposent d'un nombre suffisant de doses ; nous estimons que {{ LAB }} n'a pas respecté les termes du contrat_", a déclaré la présidente de la Commission, Ulrike von Limburg-Stirum.`
				},
				randomFail: {
					title: `La France suspend la vaccination avec {{ LAB }}`,
					text: `PARIS - Emboîtant le pas de ses voisins européens, la France a suspendu {{ JOUR }} l'utilisation du vaccin des laboratoires {{ LAB }}, en raison de cas exceptionnels de caillots sanguins graves chez plusieurs personnes vaccinées.\n_"J'ai saisi la Haute Autorité de Santé, qui sur la base des recommandations de l'Agence Nationale de Sécurité du Médicament (ANSM), se prononcera sur la poursuite ou non de la vaccination avec {{ LAB }}"_, a déclaré le ministre de la Santé Arnaud Virey.\nL'Agence européenne des médicaments (EMA) a ouvert une enquête, et prévoit de s'exprimer la semaine prochaine sur _"un éventuel lien entre les cas de thromboses recensés et le vaccin"_, a indiqué sa directrice Aine Taylor.`
				}
			},
			more: [
				`Jamais une campagne de vaccination n'avait été organisée à une telle échelle, avec près d'1,4 milliard de doses administrées à travers le monde à ce jour. Pour les laboratoires, la production de masse est un enjeu majeur, et beaucoup ont dû s'adapter. _"BioNTech, par exemple, était une petite entreprise allemande avec une capacité de production limitée, de l'ordre du million de doses_, raconte Steve Pascolo, chercheur à l'hôpital universitaire de Zürich et spécialiste des vaccins. _L'ARNm est une technologie nouvelle qui était surtout utilisée pour traiter des maladies &ldquo;de niche&rdquo;, comme le cancer de la peau (mélanome)."_ Pour être en mesure de livrer *plusieurs milliards de doses*, BioNTech a dû s'allier avec le géant américain de l'industrie pharmaceutique Pfizer, qui a mis en place de nouvelles chaînes de production aux États-Unis et en Europe.`,
				`Il faut dire que les vaccins à ARNm et les vaccins à vecteur viral (AstraZeneca, Johnson&Johnson) nécessitent *des ingrédients spécifiques et des savoir-faire nouveaux*, que seuls les plus gros acteurs du secteur sont capables de développer. La présence de plusieurs goulots d'étranglement dans la chaîne d'approvisionnement explique les *retards* constatés chez certains fabricants. C'est le cas d'AstraZeneca, attaqué en justice par la Commission européenne pour manquement à ses engagements, et dont les commandes ne seront pas renouvelées à partir du mois de juin.`,
				`La France, à défaut d'être parvenue à mettre au point un vaccin, joue un rôle de *sous-traitant*. L'entreprise Delpharm, qui depuis le mois d'avril met en flacon le vaccin Pfizer-BioNTech dans son usine d'Eure-et-Loire, a été la première à produire des doses sur le sol hexagonal ; le géant Sanofi devrait prochainement mettre à disposition ses usines en Europe et aux États-Unis pour ses concurrents. Mais la contribution française se limite pour le moment au conditionnement des vaccins - la production des principes actifs, elle, se fait dans d'autres pays européens, comme l'Allemagne ou la Belgique.`,
				`*"Le risque zéro n'existe pas"*`,
				`Si les vaccins ne sont approuvés que s'ils sont réputés sûrs à l'issue des essais cliniques de phase III, certains effets secondaires rares ne se manifestent qu'une fois la campagne de vaccination lancée, avec un échantillon de plusieurs millions de personnes vaccinées. Suivre ces effets secondaires, c'est le rôle de la *pharmacovigilance*. En France, 31 centres régionaux sont chargés de collecter les "notifications spontanées" des patients et des professionnels de santé, et de les transmettre à *l'Agence nationale de sécurité du médicament* (ANSM).`,
				`_"Le risque zéro n'existe pas_, explique Mounia Hocine, chercheuse en biostatistique au Conservatoire national des arts et métiers. _Le rôle de la pharmacovigilance, c'est de déterminer si les effets indésirables sont présents dans la proportion qu'on attend ou non."_ Dans le cas des vaccins AstraZeneca et Johnson&Johnson, l'Agence européenne des médicaments (EMA) a établi un lien entre l'injection du vaccin et les effets indésirables constatés - des caillots sanguins graves et une diminution du nombre de plaquettes. Mais elle a également estimé que dû à leur extrême rareté, la *balance bénéfices-risques* de ces vaccins restait positive. _"Il y a 100 fois plus de risques de faire une thrombose en prenant la pilule qu'en se faisant vacciner avec AstraZeneca !"_, martèle la chercheuse.`,
				`Rarement l'évaluation des médicaments n'aura occupé une place aussi centrale dans le débat public. _"Cette campagne de vaccination massive, c'est une bonne chose pour la pharmacovigilance_, acquiesce Mounia Hocine. _L'EMA et toutes les agences nationales sont en mode &ldquo;sniper&rdquo; et surveillent très attentivement les signaux. Il y a une mutualisation des ressources."_`
			]
		}
	],
	outro: {
		text: [
			`Félicitations ! Vous êtes parvenu·e en à peine un an à développer *un vaccin sûr et efficace* contre le Covid-19, et à produire *près d'un milliard de doses* qui sauveront la vie de plusieurs centaines de milliers de personnes.`,
			`Évidemment, une grande partie du mérite revient aux efforts de vos équipes. Mais n'oubliez pas que rien n'aurait été possible sans plusieurs centaines de millions d'euros de *financements publics* et des décennies de recherche fondamentale en virologie et immunologie.`,
			`Retour à la réalité. À l'heure actuelle, *l'épidémie fait rage en Inde et au Brésil*, avec l'émergence de variants plus contagieux. Les services de santé sont débordés et les doses de vaccins, accaparées par les pays riches, tardent à arriver.`,
			`Le 5 mai 2021, le président des États-Unis Joe Biden s'est montré favorable à *une levée des brevets*, qui pourrait permettre aux pays en voie de développement de fabriquer des vaccins sur leur sol - si tant est qu'ils disposent des technologies, compétences et matières premières nécessaires pour ces vaccins d'un nouveau genre. Une décision saluée par l'OMS et plusieurs associations humanitaires.`,
			`Et vous ? Seriez-vous prêt·e à renoncer à votre brevet sur votre vaccin {{ LAB }} pour en faire _"un bien public mondial"_, comme l'avait formulé Emmanuel Macron en mai 2020 ?`
		],
		more: [
			`Sur le papier, la levée des brevets sonne comme une évidence. Mais au-delà des intérêts financiers des laboratoires, *cette mesure n'aurait aucune efficacité* selon Steve Pascolo, immunologiste à l'hôpital universitaire de Zürich. _"Ce n’est pas parce que les brevets sont levés que les autres entreprises vont être capables de produire des vaccins à ARN messager_, explique-t-il. _C'est comme si vous disiez qu'en distribuant la recette des macarons Ladurée, on allait crouler sous les pâtisseries !"_`,
			`Ces nouveaux vaccins nécessitent en effet des produits spécifiques, biologiques ou chimiques, parfois fournis par une seule entreprise dans le monde et dont l'approvisionnement limite les capacités de production. _"C'est une longue chaîne de dominos_, précise Steve Pascolo. _*Le problème ce n'est pas les brevets mais la montée en gamme de cette chaîne d'approvisionnement*, ce qui prend du temps."_`,
			`Pire : la levée des brevets pourrait être contreproductive pour l'accès aux vaccins des pays en voie de développement. _"En décourageant l'innovation, on prend le risque de *ralentir le développement de nouveaux vaccins* ou l'amélioration des vaccins existants_, poursuit le chercheur. _Augmenter l'efficacité des vaccins pourrait pourtant permettre de fabriquer plus de doses avec la même quantité d'ARN, et de fournir plus rapidement les autres pays."_`,
			`Car le temps presse : au-delà de la situation sanitaire catastrophique dans les pays du Sud, ces derniers constituent *une réserve potentielle de variants*, qui s'ils se révélaient résistants aux vaccins actuels pourraient anéantir tous les efforts accomplis.`
		]
	},
	makingOf: [
		{
			title: `Pourquoi un newsgame ?`,
			text: [
				`À l'image de l'article Wikipédia en français qui y est dédié, [long d'à peine une ligne](https://fr.wikipedia.org/wiki/Newsgame), le newsgame ou "jeu d'informations" est encore très peu répandu dans les médias, en particulier français.\nEn ayant l'idée de ce format, j'avais pourtant en tête la web-série interactive *Uchroniques*, réalisée par Thierry Tripod et Patrick Mallet et publiée en 2015 par France TV Nouvelles écritures. Ce format hybride - malheureusement tombé dans les limbes d'Internet et dont il ne reste aujourd'hui que [quelques "let's play"](https://www.youtube.com/watch?v=2DH497MHRRo) - proposait à l'internaute de revisiter dix événements historiques, de l'assassinat de Kennedy à la mission Apollo 13, en passant par la présentation du premier Macintosh.`,
				`Chaque événement incluait un mini-jeu, qui permettait selon la prestation du joueur de débloquer une fin alternative parmi trois ou quatre possibilités, le tout illustré par des images d'archives, réelles ou fabriquées de toutes pièces pour donner vie à ces uchronies plus ou moins farfelues. Pour ce projet de fin d'études, j'ai repensé en particulier au niveau consacré à Louis Pasteur, qui présentait *un mini-jeu expliquant le fonctionnement d'un vaccin.*`,
				`Plus récemment, j'ai également été marqué par [ce format interactif de Reuters](https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/), qui illustre en animations le principe des différents vaccins anti-Covid alors en cours de développement. Convaincu du potentiel de ce type de format pour vulgariser un sujet aussi complexe et qui nous touche toutes et tous, *je me suis lancé dans le développement de mon propre newsgame.*`
			]
		},
		{
			title: `Le jeu`,
			text: [
				`Le newsgame est divisé en *quatre niveaux*, correspondant aux différentes étapes du développement des vaccins contre le Covid-19 : le séquençage du génome du virus, le fonctionnement des vaccins à ARNm (Pfizer-BioNTech, Moderna), les essais cliniques et enfin la production massive de doses et la pharmacovigilance. À chaque niveau, *un mini-jeu permet de vulgariser les enjeux du sujet* d'une manière plus stimulante qu'un simple article.`,
				`Le choix a été fait de bâtir le jeu *au format mobile*, et ce pour plusieurs raisons. D'une part, il s'agit de s'adapter aux usages : plus de 70 % des Français consomment la presse depuis leur smartphone, et le mobile constitue le principal support sur lequel ils jouent aux jeux vidéo, d'après [le rapport 2020 du SELL](https://www.sell.fr/news/bilan-marche-jeu-video-2020). D'autre part, le gameplay de certains niveaux (notamment celui sur le fonctionnement des vaccins) était beaucoup plus adapté au tactile qu'à la souris.`,
				`Tout au long du jeu, *des dépêches* d'une agence de presse fictive - inspirées de véritables faits d'actualité - jalonnent le parcours du joueur et accompagnent ses succès ou ses échecs. Dans la course au vaccin, il y a des gagnants et des perdants, et il me semblait important que *l'échec fasse partie intégrante du jeu*... y compris pour des raisons indépendantes de la volonté de l'internaute, comme l'inefficacité d'un vaccin ou bien la détection d'effets secondaires graves.`
			]
		},
		{
			title: `Plusieurs défis`,
			text: [
				`Quand j'ai eu l'idée de ce jeu, en janvier dernier, la campagne vaccinale venait tout juste de débuter en France et en Europe. Quatre mois plus tard, la situation est bien différente : alors qu'[à peine plus d'un Français sur quatre](https://twitter.com/BotDuVaccin) a déjà reçu une première injection, l'Institut Pasteur a abandonné son projet de vaccin, les vaccins AstraZeneca et Johnson&Johnson ont été suspendus dans plusieurs pays à la suite de rares cas de thromboses, et les retards de livraisons s'accumulent pour plusieurs fabricants - autant d'événements qui m'ont inspiré pour différents aspects du jeu. Jusqu'au dernier jour, *il a donc fallu s'adapter en fonction de l'actualité récente*.`,
				`Par ailleurs, la difficulté dans ce genre de projet est de trouver *le bon niveau d'abstraction*. Un mini-jeu ne peut représenter fidèlement la complexité des enjeux du développement des vaccins, mais je ne voulais pas non plus que le gameplay ne soit qu'un prétexte pour distraire le joueur entre deux longs textes. En somme, il s'agissait d'atteindre le juste équilibre entre l'information et le jeu : trop d'info et l'internaute ne retiendrait rien, pas assez et le jeu en deviendrait superficiel. Finalement, la solution a été de laisser le choix au joueur d'approfondir tel ou tel aspect du sujet s'il le souhaite, mais d'apporter l'essentiel à travers le gameplay et les fausses dépêches.`,
				`Pour m'aider dans cette tâche, j'ai également pu compter sur *l'expertise de spécialistes* comme Florence Débarre, Steve Pascolo ou Mounia Hocine. Ceux-ci m'ont apporté un éclairage sur le processus de développement des vaccins, et m'ont offert la légitimité scientifique nécessaire pour mener à bien ce projet.`
			]
		},

		{
			title: `Un peu de technique...`,
			text: [
				`Le jeu a été codé par mes soins de A à Z, en JavaScript et HTML/CSS. Le projet complet compte environ *3500 lignes de code* et a nécessité plus de 80 heures de développement. J'ai utilisé le framework [Svelte](https://svelte.dev/) pour l'interface utilisateur, le moteur de rendu [PIXI.js](https://www.pixijs.com/) pour le jeu, et les bibliothèques [GSAP](https://greensock.com/gsap/) et [Howler.js](https://howlerjs.com/) pour les animations et le son, respectivement.`,
				`Tous les graphismes _("sprites")_ ont été réalisés sur le logiciel de dessin vectoriel [Inkscape](https://inkscape.org/fr/). Les musiques et effets sonores sont libres de droits et issus de [Freesound](https://freesound.org/). Les icônes proviennent de [Fontisto](https://www.fontisto.com/).`
			]
		}
	],
	credits: [
		{
			label: `Conçu et développé par`,
			items: `Tom Février`
		},
		{
			label: `Réalisé avec`,
			items: [
				`[Svelte](https://svelte.dev/)`,
				`[PIXI.js](https://www.pixijs.com/)`,
				`[GSAP](https://greensock.com/gsap/)`,
				`[Howler.js](https://howlerjs.com/)`,
				`[Fontisto](https://www.fontisto.com/)`
			]
		},
		{
			label: `Musiques et effets sonores`,
			items: `[Freesound](https://freesound.org/)`
		},
		{
			label: `Avec l'aide précieuse de`,
			items: [`Florence Débarre`, `Steve Pascolo`, `Mounia Hocine`, `Guillaume Achaz`, `Marie Mawad`]
		}
	]
};
