# Code-Bot

Code-Bot est un bot Discord ayant été créé pour tracker les victoires et défaites des joueurs de League of Legends [^1]. (Idée prise à [@Tinmardoule](https://twitter.com/Tinmardoule/status/1490091355196076042?s=20&t=rY4TYQK_2mM-rY_er6mDwQ) sur Twitter)

Le bot utilise l'[API de Riot Games](https://developer.riotgames.com/), ainsi que [DiscordJS v13](https://discord.js.org/#/docs/discord.js/stable/general/welcome)

## Fonctionnalités

### Tracker LoL

- Tracker un joueur et afficher ses victoires et défaites.  
![Tracker LoL](https://i.ibb.co/JpJgj6R/queue.png)

- Associer un compte discord à un compte League of Legends.
- Afficher un profil LoL en donnant le nom du compte.  
![Profil LoL](https://i.ibb.co/KwRDk3T/queue.png)
---
### Musique

- Jouer de la musique à partir de Youtube.
- Gestion d'une file d'attente.
- Répéter la file d'attente ou une musique.
- Afficher la file d'attente.  
![File d'attente](https://i.ibb.co/DLGq5xj/queue.png)

- Mettre le musique sur pause.
- Mélanger la file d'attente.

## Commandes

### Tracker LoL

- `/track <compte>` ajoute un compte à la liste de tracking du serveur
- `/untrack <compte>` enlève un compte à la liste de tracking du serveur
- `/trackhere` associe un channel Discord pour le tracking
- `/tracklist` affiche la liste des joueurs track sur le serveurs
- `/register <compte>` associe un compte Discord à un compte LoL
*Si un compte Discord est associé à un compte LoL, il peut être utilisé à la place d'un compte dans les commandes.*
- `/unregister` supprime l'association entre un compte Discord et un compte LoL
- `/profilelol <compte>` affiche un compte LoL *(nom, rank, tier, 5 dernières parties)*
---
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

```py
# Used to log files loaded
DEBUG=false

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

## Schéma de la Base de Donnée

```sql
CREATE TABLE accounts (
	discordID VARCHAR(50),
	summonerName VARCHAR(20),
	summonerID VARCHAR(63),
	summonerPUUID VARCHAR(78)
);

CREATE TABLE guildChannels (
	guildID VARCHAR(25),
	channelID VARCHAR(25)
);

CREATE TABLE guildTrack (
	summonerName VARCHAR(20),
	guildID VARCHAR(25)
);

CREATE TABLE lolgames (
	ID int,
	query_date timestamp NOT NULL,
	TIER VARCHAR(10),
	`RANK` VARCHAR(5),
	LPs int,
	BO VARCHAR(5)
);
```

[^1]: [League of Legends](https://www.leagueoflegends.com) est un jeu de type MOBA réalisé par [Riot Games](https://www.riotgames.com).