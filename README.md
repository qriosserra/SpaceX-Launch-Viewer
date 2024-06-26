# Remarques
J'ai utilisé TailwindCSS avec des composants de Flowbite par import CDN pour construire plus rapidement le contenu 
  de la page. Je voulais essayer la web preview intégré de Webstorm, l'import par CDN mettait plus rapidement à jour 
  la preview.

J'ai affiché les données demandés dans un tableau, après avoir vu le résultat un tableau n'est pas le plus adapté 
  pour afficher ces données. 

Je me suis rendu compte que l'API SpaceX n'était plus maintenue, les dernières entrées datent de 2022 et manquent de 
  certaines données. J'ai donc utilisé les premières entrées à la place qui sont complètes pour faire l'exercice. Le 
  décompte affiche donc "_-6660 jours ..._", mais il est fonctionnel. 

J'ai pu faire tout l'exercice demandé en environ 1 heure de programmation sans les bonus, j'ai pris légèrement 
  plus de temps pour arranger le code et le style. 

Afin de gagner du temps, j'ai demandé à ChatGPT le code pour certaines fonctions, je l'ai également utilisé pour 
  m'aider à l'intégration de la pop-up de vidéo YouTube que je n'avais jamais fait avant. 

Cependant, j'ai remarqué que sur certains navigateurs l'ordre d'affichage des éléments Locality et Payloads du 
  tableau 
  changent à cause des Promises qui sont par nature asynchrones.

# Notes
Partie importante des réponses JSON :
###### Launches
```json
{
    "links": {
        "patch": {
            "small": "https://images2.imgbox.com/94/f2/NN6Ph45r_o.png"
        },
        "webcast": "https://www.youtube.com/watch?v=0a_00nJ_Y88",
        "youtube_id": "0a_00nJ_Y88",
        "article": "https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html"
    },
    "static_fire_date_utc": "2006-03-17T00:00:00.000Z",
    "static_fire_date_unix": 1142553600,
    "success": false,
    "details": "Engine failure at 33 seconds and loss of vehicle",
    "payloads": [
        "5eb0e4b5b6c3bb0006eeb1e1"
    ],
    "launchpad": "5e9e4502f5090995de566f86",
    "name": "FalconSat",
    "date_utc": "2006-03-24T22:30:00.000Z",
    "date_unix": 1143239400,
    "id": "5eb87cd9ffd86e000604b32a"
}
```
###### Launchpad
```json
{
    "name": "LZ-2",
    "full_name": "Landing Zone 2",
    "locality": "Cape Canaveral",
    "region": "Florida",
    "latitude": 28.485833,
    "longitude": -80.544444,
    "launches": [
        "5eb87d13ffd86e000604b360",
        "5eb87d2dffd86e000604b376",
        "5eb87d35ffd86e000604b37a"
    ],
    "id": "5e9e3032383ecb90a834e7c8"
}
```
###### Payload
```json
{
    "name": "Tintin A & B",
    "type": "Satellite",
    "customers": [
        "SpaceX"
    ],
    "nationalities": [
        "United States"
    ],
    "manufacturers": [
        "SpaceX"
    ],
    "id": "5eb0e4c6b6c3bb0006eeb21e"
}
```