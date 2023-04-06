# Templating

Générer manuellement le HTML côté serveur est pratique, mais lorsqu'on travaille avec des applications à plus grande échelle, cela devient tout de suite plus difficile à maintenir.

Nous avons pour cela besoin d'un **moteur de templating**.

Un moteur de templating propose au développeur une syntaxe permettant d'écrire du code HTML avec des instructions dynamiques (conditions, boucles, inclusions , …).

Cette syntaxe est ensuite passée au moteur de templating avec un set de données, et le moteur va se charger de transformer le tout en String HTML statique, laquelle pourra être ensuite passée au client.

Par exemple, le langage PHP permet nativement de faire du templating avec du HTML :

```html+php
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title><?= $pageTitle; ?></title>
</head>
<body>
    <?php foreach ($articles as $article) : ?>
        <h1><?= $article->title; ?></h1>
        <p><?= $article->content; ?></p>
    <?php endforeach; ?>
</body>
</html>
```

Il n'existe pas de mécanisme similaire nativement dans Node.js. Il faut passer par des modules tiers qui proposent des moteurs de templating.

En voici quelques-uns :

- [Pug](https://pugjs.org/) (anciennement **Jade**)
- [EJS](https://ejs.co/)
- [Handlebars](https://handlebarsjs.com/)
- [Haml](https://haml.info/)
- [Twing](https://www.npmjs.com/package/twing)

Dans ce cours, nous utiliserons un des plus populaires : **Pug**.

---
## Compilation et rendu

Pour commencer, il faut installer Pug :

```bash
npm install pug
```

Pug fournit 2 méthodes principales :

1. `compile()` : Prend une string de template en entrée et renvoie une fonction de compilation spécifique à ce template, qui permet d'obtenir un rendu. C'est très pratique pour les performances car on peut **pré-compiler** le template et mettre la fonction en cache si le modèle ne change pas.

```js
const pug = require('pug');

const template = `
if age >= 18
    h1 Access granted!
else
    h1 Permission denied!`;

const compileTemplate = pug.compile(template);

compileTemplate({ age : 19 });
// Renvoie: 
// <h1>Access granted!</h1>
```

On peut aussi placer le template dans un fichier externe `.pug` et le compiler avec `.compileFile()` :

```pug
// template.pug
if age >= 18
    h1 Access granted!
else
    h1 Permission denied!
```

```js
// server.js
const pug = require('pug');

const compileTemplate = pug.compileFile('template.pug');

compileTemplate({ age : 19 });
```

2. `render()` : Permet de compiler et de rendre le contenu en un seul coup. C'est plus simple à utiliser mais il faut savoir qu'à chaque appel, le template est **recompilé** puis rendu, ce qui peut impacter les performances inutilement si le template d'origine ne change pas.

Attention pour cette méthode, la fonction de callback est appelée de façon **synchrone !**

```js
const template = `
if age >= 18
    h1 Access granted!
else
    h1 Permission denied!`;

pug.render(template, { age : 19 }, (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

On peut aussi utiliser `.renderFile()` pour utiliser un fichier `.pug` :

```js
pug.renderFile('template.pug', { age : 19 }, (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### Gérer les erreurs

Comme toute opération en programmation, une erreur peut se produire lors de la compilation et/ou du rendu du template.

Pour gérer les éventuelles erreurs provoquées par `compile` et `compileFile`, on peut utiliser un bloc `try/catch` :

```js
try {
    const compileTemplate = pug.compile(template);
    // …
} catch (err) {
    res.writeHead(500, { 'Content-Type' : 'text/plain' });
    res.end( err.message );
}
```

Pour les méthodes `render` et `renderFile`, on peut se servir de la fonction de callback pour récupérer une potentielle erreur :

```js
pug.renderFile('template.pug', { age : 19 }, (err, data) => {
    if (err) {
        res.writeHead(500, { 'Content-Type' : 'text/plain' });
        res.end( err.message );
    }
});
```

Attention pour cette méthode, la fonction de callback est toujours appelée de façon **synchrone !**

# Syntaxe Pug de base

Pug propose une syntaxe simplifiée et expressive, permettant au développeur de créer des templates HTML épurés sans fioritures de langage comme 
les chevrons, les point-virgules, accolades ou parenthèses.

**⚠ Attention** ! C'est un langage basé sur **l'indentation** (comme le langage Python par ex.). Une mauvaise indentation entraînera une erreur de compilation !

## Ecrire du HTML standard

On écrit les balises HTML sans les chevrons `< >`. Chaque niveau d'indentation équivaut à une imbrication :

```pug
nav
    ul
        li
            a(href='/home') Home
        li
            a(href='/portfolio') Portfolio
        li
            a(href='/contact') Contact
```

sera compilé vers :

```html
<nav>
    <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

Pour sauver de l'espace d'affichage, Pug propose une syntaxe inline plus lisible pour les tags imbriqués :

```pug
nav: ul
    li: a(href='/home') Home
    li: a(href='/portfolio') Portfolio
    li: a(href='/contact') Contact
```

Les attributs s'écrivent entre parenthèses :

```pug
input(type='radio' name='gender' value='Homme')

//- où sur plusieurs lignes
input(
    type='radio'
    name='gender'
    value='Femme'
    checked
)
```

```html
<input type="radio" name="gender" value="Homme"/>
<input type="radio" name="gender" value="Femme" checked="checked"/>
```

On peut également utiliser la syntaxe des sélecteurs CSS pour gérer les attributs `class` et `id` :

```pug
main#container
    article
        .article-inner
            p.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nisi voluptatum maiores laboriosam accusamus

            //- Ici le `p.` indique un bloc de texte standard sur plusieurs lignes
```

va générer :

```html
<main id="container">
    <article>
        <div class="article-inner">
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Nisi voluptatum maiores laboriosam accusamus
            </p>
        </div>
    </article>
</main>
```

Pour de petites inclusions de tags HTML, Pug autorise l'écriture classique :

```pug
p Ceci est un texte à <strong>forte emphase</strong>

//- Équivalent à :

p Ceci est un texte à 
    strong forte emphase
```

```html
<p>Ceci est un texte à <strong>forte emphase</strong></p>
```

On peut aussi écrire du texte standard sur une ligne avec l'opérateur pipe `|` :

```pug
div
    p Je suis dans le paragraphe 
    | Je suis en dehors du paragraphe
```
```html
<div>
    <p>Je suis dans le paragraphe </p>
    Je suis en dehors du paragraphe
</div>
```

## Interpolation

L'intérêt primaire d'un moteur de templating est de pouvoir interprêter des variables et les afficher dans le rendu final, via l'interpolation.

Dans Pug, on passe les variables à la vue sous forme d'objet :

```js
const compileTemplate = pug.compileFile('template.pug');

const data = {
    name: 'Norbert',
    age: 33,
    gender: 'M'
};

compileTemplate(data);
```

L'interpolation côté templating se fait avec le marqueur suivant : `#{expression}`

```pug
h1 Hello #{name}
p Your age is #{age} and you are a #{gender}
```

Lorsqu'une balise HTML ne contient que la valeur d'une expression et rien d'autre, on peut utiliser le raccourci avec `=` :

```pug
h1 Hello #{name}

p Your age is:
    output= age

select
    option(value=gender)= gender
```

Affichera :
```html
<h1>Hello Norbert</h1>

<p>Your age is: <output>33</output></p>

<select>
    <option value="M">M</option>
</select>
```

Par défaut, les valeurs interpolées sont automatiquement échappées pour éviter les attaques de type XSS :

```pug
- const sensitiveData = `<script>alert('XSS')</script>`;

div= sensitiveData
//- div #{sensitiveData}
```
```html
<div>&lt;script&gt;alert('XSS')&lt;/script&gt;</div>
```

Dans certains cas, **si on sait ce que l'on fait**, on peut désactiver l'échappement automatique avec un `!` :

```pug
- const text = `<b>Hello there!</b>`;

div!= text
//- div !{text}
```

```html
<div><b>Hello there!</b></div>
```

## Écrire du code JS

On a parfois besoin d'écrire du code JS pour de petites instructions, notamment pour le formatage de donnée, ou pour faire de la décomposition et rendre le template plus lisible.

On utilise pour ça le trait d'union `-`

```pug
article
    - const { title, date, author } = post
    h1= title
    p Written by #{author}
    time(datetime=date.toISOString())= date.toLocaleDateString()
```

Donnera le rendu suivant :

```html
<article>
    <h1>Le templating avec Pug</h1>
    <p>Written by 3WAcademy</p>
    <time datetime="2022-04-19T13:37:30.000Z">19/04/2022</time>
</article>
```

Parfois, on a besoin d'écrire des blocs de code sur plusieurs lignes :

```pug
article
    -
        const { title, date, author } = post;
        const ISODate = date.toISOString();
        const formattedDate = date.toLocaleDateString();

    h1= title
    p Written by #{author}
    time(datetime=ISODate)= formattedDate
```

Enfin, si on veut écrire du code JS qui sera interprêté côté client, on le place simplement dans un tag `script` que l'on précède par un point :

```pug
input(type='text' id='message')
p Hello <span id="messageValue"></span>

script.
    const messageEl = document.getElementById('message');
    const span = document.getElementById('messageValue');
    messageEl.oninput = function (event) {
        span.textContent = event.target.value;
    };
```

Génèrera :

```html
<input type="text" id="message"/>
<p>Hello <span id="messageValue"></span></p>
<script>
    const messageEl = document.getElementById('message');
    const span = document.getElementById('messageValue');
    messageEl.oninput = function (event) {
        span.textContent = event.target.value;
    };
</script>
```

## Conditions, commentaires

Le moteur supporte les conditions basiques :

```pug
if results
    if results.length > 1
        p Il y a #{results.length} résultats de recherche
    else if results.length === 1
        p Il y a 1 unique résultat
    else
        p Aucun résultat
else
    p Aucune recherche effectuée …
```

Il propose aussi un raccourci pour la négation :

```pug
unless user.logged
    p Veuillez vous authentifier

//- Parfaitement équivalent à :

if !user.logged
    p Veuillez vous authentifier
```

On peut également faire d'un `switch/case` en JS avec les mots-clé `case/when` de Pug :

```pug
case user.gender
    when 'M'
        p Male
    when 'F'
        p Female
    default
        p Autre

//- À noter que les *break* sont implicites pour chaque `when`.
```


Les commentaires peuvent être côté Pug, ou côté HTML :
```pug
div.commentaires
    //- Ce commentaire pug NE sera PAS affiché dans le rendu
    // Mais celui-ci oui !
```

```html
<div class="commentaires">
    <!-- Mais celui-ci oui !-->
</div>
```