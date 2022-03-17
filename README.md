# Code-Bot

Code-Bot est un bot Discord ayant été créé pour tracker les victoires et défaites des joueurs de League of Legends [^1]. (Idée prise à [@Tinmardoule](https://twitter.com/Tinmardoule/status/1490091355196076042?s=20&t=rY4TYQK_2mM-rY_er6mDwQ) sur Twitter)

Le bot utilise l'[API de Riot Games](https://developer.riotgames.com/), ainsi que [DiscordJS v13](https://discord.js.org/#/docs/discord.js/stable/general/welcome)


## Fonctionnalités

### Tracker LoL

- Tracker un joueur et afficher ses victoires et défaites.
![Commande](https://i.imgur.com/sw215.jpeg)

- Associer un compte discord à un compte League of Legends
- Afficher un profile LoL en donnant le nom du compte.
![Profile LoL](https://i.imgur.com/sw215.jpeg)

### Musique

- Jouer de la musique à partir de Youtube
- Gestion d'une file d'attente
- Répéter la file d'attente ou une musique
- Afficher la file d'attente
![File d'attente](https://i.imgur.com/sw215.jpeg)
- Mettre le musique sur pause
- Mélanger la file d'attente

## Commandes

### Tracker LoL


### Musique

- `/play <song>` ajoute une musique à la file d'attente
- `/skip` passe la musique actuelle
- `/skipto <n-ième song>` passe à la n-ième musique
- `/shuffle` mélange la file d'attente
- `/queue` affiche la file d'attente
- `/clearq` vide la file d'attente
- `/repeat <song/queue>` répéte la musique actuelle/la file d'attente
- `/remove <n-ième song>` enlève la n-ième musique
- `/pause` met/enlève la pause

## Forme du .env

```
# Used to log files loaded
DEBUG = false

# Discord Related Infos #

# Token for Discord API
TOKEN=

# Guild where to push commands
GUILD=123456789101112131

# Client ID used for Discord API
CLIENT=123456789101112131

# DATABASE #

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Other APIs #

API_YOUTUBE=
RIOT_API_TOKEN=
```


[^1] : League of Legends est un jeu de type MOBA réalisé par Riot Games.