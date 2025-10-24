// TODO: KAFKA
/**
 * Doom Engine
 * dangerous philosophers list
 * 🔥 Final "Dangerous Philosophy Squad"

If you want a solid, dangerous & discipline-shame balanced pool, I’d recommend sticking to:

Nietzsche – abyss, will to power

Machiavelli – power, cunning, strategy

Ayn Rand – radical egoism, productivity shame

Marcus Aurelius – cold stoic discipline

Seneca – stoic suffering endurance

Robert Greene – manipulation, law of power

Osho – dangerous mysticism, ritual chaos

Schopenhauer – despair, shame through pessimism

Foucault – surveillance, control

Kierkegaard – dread, inward torment
complete roster of all the philosophers we mentioned for your dangerous gang of motivators. I’ve grouped them into two sets:

✅ Your Original Mentions

Ayn Rand (Objectivism, radical individualism)

Niccolò Machiavelli (power, realpolitik, ruthlessness)

Marcus Aurelius (stoicism, discipline, emperor)

Seneca (stoicism, moral letters, suffering with dignity)

Robert Greene (modern strategist, 48 Laws of Power)

Osho (wild mystic, spiritual provocateur)

Friedrich Nietzsche (will to power, dangerous honesty, abyss staring back)

➕ Ones I Suggested / Referenced

Søren Kierkegaard (existential dread, faith vs despair)

Michel Foucault (power structures, control, surveillance)

Slavoj Žižek (chaotic psychoanalysis + politics, dangerous ideology critique)

Arthur Schopenhauer (pessimism, life as suffering)
 */
import { createQuotesSrv, flushQuotesSrv } from "../../frontend/src/services/philosopher-quote.service.js";

const quotes = [
  {
    philosopher: {
      name: "Thomas Shelby",

      iconUrl: "https://cdn-thumbs.ohmyprints.net/1/f831710dcb06e86c42c7d9e53b8dcb65/817x600/thumbnail/fit.jpg",
      coverUrl: "",
      qualities: ["🎩", "Consequence Vibes", "Ruthless Discipline", "Neutral"],
    },
    quotes: ["You can change what you do, but you can’t change what you want. Control the want, own the day.", "I don’t pay for suits. My suits are on the house… because I run the house. Run your house.", "Sometimes, the right hand fights the left. Discipline decides which hand wins.", "You don’t get what you deserve, you get what you take — so take control.", "Everyone’s a man when the sun is shining. Be one when it’s raining.”", "In this business, failure has a price. Pay up, or tighten up.", "The only way to beat weakness is to put a bullet in it.", "You made a promise to yourself. Break it, and you’re just another liar.", "The world doesn’t give second chances. Why should I?", "You had a choice. You chose badly.", "Good taste is for people who can’t afford sapphires.", "I think, therefore I plan.", "Sometimes it’s not a question of right or wrong. It’s a question of power.", "The only rule is: don’t get caught without a plan."],
  },
  {
    philosopher: {
      name: "Finds",
      qualities: ["🎩", "Consequence Vibes", "Ruthless Discipline", "Neutral"],
    },
    quotes: ["Every ambition needs preparation"],
  },
  {
    philosopher: {
      name: "Friedrich Nietzsche",

      iconUrl: "https://cdn-thumbs.ohmyprints.net/1/f831710dcb06e86c42c7d9e53b8dcb65/817x600/thumbnail/fit.jpg",
      coverUrl: "",
      qualities: ["🐍", "abyss", "will to power"],
    },
    quotes: ["He who fights with monsters should look to it that he himself does not become a monster.", "When you gaze long into the abyss, the abyss also gazes into you.", "Become who you are.", "That which does not kill us makes us stronger.", "Man is something that shall be overcome.", "In individuals, madness is rare; but in groups, parties, nations it is the rule.", "The higher we soar, the smaller we appear to those who cannot fly.", "There are no facts, only interpretations.", "The secret for harvesting from existence the greatest fruitfulness and greatest enjoyment is: to live dangerously.", "A thought, even a possibility, can shatter and transform us."],
  },
  {
    philosopher: {
      name: "Niccolò Machiavelli",

      iconUrl: "https://i0.wp.com/www.heartoftheart.org/wp-content/uploads/2015/12/Screen-Shot-2015-12-04-at-14.30.42.png?fit=620%2C395&ssl=1",
      coverUrl: "",
      qualities: ["🦊", "power", "cunning", "strategy"],
    },
    quotes: ["It is better to be feared than loved, if you cannot be both.", "The ends justify the means.", "Men judge generally more by the eye than by the hand.", "Whosoever desires constant success must change his conduct with the times.", "He who wishes to be obeyed must know how to command.", "A wise ruler ought never to keep faith when by doing so it would be against his interests.", "The promise given was a necessity of the past; the word broken is a necessity of the present.", "Everyone sees what you appear to be, few experience what you really are.", "Never attempt to win by force what can be won by deception.", "Hatred is gained as much by good works as by evil."],
  },
  {
    philosopher: {
      name: "Ayn Rand",

      iconUrl: "https://upittpress.org/wp-content/uploads/2018/05/AynRand4.jpg",
      coverUrl: "",
      qualities: ["💎", "radical egoism", "productivity shame"],
    },
    quotes: ["The question isn’t who is going to let me; it’s who is going to stop me.", "Wealth is the product of man’s capacity to think.", "The man who does not value himself cannot value anything or anyone.", "The ladder of success is best climbed by stepping on the rungs of opportunity.", "Freedom: To ask nothing. To expect nothing. To depend on nothing.", "The worst guilt is to accept an unearned guilt.", "To sell your soul is the easiest thing in the world. That’s what everybody does every hour of their life. If I asked you to keep it, you’d think I’m speaking in riddles.", "The man who lets a leader prescribe his course is a wreck being towed to the scrap heap.", "Do not ever say that the desire to 'do good' by force is a good motive. Neither power-lust nor stupidity are good motives.", "The smallest minority on earth is the individual."],
  },
  {
    philosopher: {
      name: "Marcus Aurelius",

      iconUrl: "https://img.freepik.com/premium-photo/portrait-stoic-marcus-aurelius-black-white-film-grain-highly-detailed-masterpiece_1097265-29435.jpg",
      coverUrl: "",
      qualities: ["🏛", "cold", "stoic", "discipline"],
    },
    quotes: ["You have power over your mind — not outside events. Realize this, and you will find strength.", "Waste no more time arguing what a good man should be. Be one.", "The impediment to action advances action. What stands in the way becomes the way.", "It is not death that a man should fear, but he should fear never beginning to live.", "When you arise in the morning, think of what a precious privilege it is to be alive.", "A man’s worth is no greater than his ambitions.", "The soul becomes dyed with the color of its thoughts.", "You could leave life right now. Let that determine what you do and say and think.", "Don’t waste the rest of your time worrying about other people.", "He who lives in harmony with himself lives in harmony with the universe."],
  },
  {
    philosopher: {
      name: "Seneca",

      iconUrl: "https://www.highexistence.com/content/images/size/w600/wp-content/uploads/2020/04/seneca.png",
      coverUrl: "",
      qualities: ["🗡", "stoic", "suffering", "endurance"],
    },
    quotes: ["We suffer more often in imagination than in reality.", "It is not that we have a short time to live, but that we waste a lot of it.", "Luck is what happens when preparation meets opportunity.", "Difficulties strengthen the mind, as labor does the body.", "He suffers more than necessary, who suffers before it is necessary.", "Associate with people who are likely to improve you.", "The greatest remedy for anger is delay.", "No man was ever wise by chance.", "It is the power of the mind to be unconquerable.", "Begin at once to live, and count each separate day as a separate life."],
  },
  {
    philosopher: {
      name: "Robert Greene",

      iconUrl: "https://powerseductionandwar.com/wp-content/uploads/2024/02/RobertGreene.webp",
      coverUrl: "",
      qualities: ["🐍", "manipulation", "law of power"],
    },
    quotes: ["Never outshine the master.", "Never put too much trust in friends, learn how to use enemies.", "Conceal your intentions.", "Always say less than necessary.", "So much depends on reputation — guard it with your life.", "Court attention at all costs.", "Crush your enemy totally.", "Pose as a friend, work as a spy.", "Keep others in suspended terror: cultivate an air of unpredictability.", "Despise the free lunch."],
  },
  {
    philosopher: {
      name: "Osho",

      iconUrl: "https://i.pinimg.com/1200x/02/6f/d6/026fd67fab9ea3fecb69f9160ee8b825.jpg",
      coverUrl: "",
      qualities: ["🔮", "dangerous mysticism", "ritual chaos"],
    },
    quotes: ["Be — don’t try to become.", "Life begins where fear ends.", "Courage is a love affair with the unknown.", "Don’t move the way fear makes you move.", "Get out of your head and into your heart. Think less, feel more.", "If you love a flower, don’t pick it up. Because if you pick it up it dies and ceases to be what you love.", "The greatest fear in the world is of the opinions of others.", "Truth is not something outside to be discovered, it is something inside to be realized.", "You feel good, you feel bad, and these feelings are bubbling from your unconsciousness, from your past. Nothing is coming from outside.", "Courage is the readiness to die."],
  },
  {
    philosopher: {
      name: "Arthur Schopenhauer",

      iconUrl: "https://literariness.org/wp-content/uploads/2018/01/arthur-schopenhauer.jpg",
      coverUrl: "",
      qualities: ["☠", "despair", "shame through pessimism"],
    },
    quotes: ["The world is my representation.", "Man can do what he wills but he cannot will what he wills.", "Compassion is the basis of morality.", "Every man takes the limits of his own field of vision for the limits of the world.", "A man can be himself only so long as he is alone.", "The two enemies of human happiness are pain and boredom.", "We forfeit three-fourths of ourselves in order to be like other people.", "Talent hits a target no one else can hit; Genius hits a target no one else can see.", "To live alone is the fate of all great souls."],
  },
  {
    philosopher: {
      name: "Michel Foucault",

      iconUrl: "https://monoskop.org/images/thumb/8/8a/Michel_Foucault_late_1950s.jpg/350px-Michel_Foucault_late_1950s.jpg",
      coverUrl: "",
      qualities: ["📡", "surveillance", "control"],
    },
    quotes: ["Knowledge is not for knowing: knowledge is for cutting.", "Where there is power, there is resistance.", "The soul is the prison of the body.", "Visibility is a trap.", "The judges of normality are present everywhere.", "Freedom is the ontological condition of ethics.", "Do not ask who I am and do not ask me to remain the same.", "People know what they do; frequently they know why they do what they do; but what they don’t know is what what they do does.", "Power is not an institution, and not a structure; neither is it a certain strength we are endowed with; it is the name that one attributes to a complex strategical situation in a particular society.", "The individual is the product of power."],
  },
  {
    philosopher: {
      name: "Søren Kierkegaard",

      iconUrl: "https://advocatetanmoy.com/wp-content/uploads/2023/05/Soren-Kierkegaard.jpg",
      coverUrl: "",
      qualities: ["⛓", "dread", "inward torment"],
    },
    quotes: ["Anxiety is the dizziness of freedom.", "Life can only be understood backwards; but it must be lived forwards.", "People demand freedom of speech as a compensation for the freedom of thought which they seldom use.", "The most painful state of being is remembering the future, particularly the one you’ll never have.", "Life is not a problem to be solved, but a reality to be experienced.", "The greatest hazard of all, losing one’s self, can occur very quietly in the world, as if it were nothing at all.", "Face the facts of being what you are, for that is what changes what you are.", "To dare is to lose one’s footing momentarily. Not to dare is to lose oneself.", "Boredom is the root of all evil.", "The function of prayer is not to influence God, but rather to change the nature of the one who prays."],
  },
];
// flushQuotesSrv();
quotes.map((item) => createQuotesSrv(item));
// for (let i = 0; i <= quotes.length; i++) {
//   try {
//     const res = createQuotesSrv(...quotes[i])
//     logger("log",res);

//     logger("log","Success");
//   } catch (error) {
//     logger("error",error.message);
//     logger("log","Failed");
//   }
// }

/**
 *
 * postman
 * {
    "philosopher": {
      "name": "🐍 Nietzsche",
      "iconUrl": "",
      "coverUrl": "",
      "qualities": ["abyss", "will to power"]
    },
    "quotes": [
      "He who fights with monsters should look to it that he himself does not become a monster.",
      "When you gaze long into the abyss, the abyss also gazes into you.",
      "Become who you are.",
      "That which does not kill us makes us stronger.",
      "Man is something that shall be overcome.",
      "In individuals, madness is rare; but in groups, parties, nations it is the rule.",
      "The higher we soar, the smaller we appear to those who cannot fly.",
      "There are no facts, only interpretations.",
      "The secret for harvesting from existence the greatest fruitfulness and greatest enjoyment is: to live dangerously.",
      "A thought, even a possibility, can shatter and transform us."
    ]
  }
 */
