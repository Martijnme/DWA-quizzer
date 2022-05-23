# TODO list

## Stappen:
- Stap 1: af
- Stap 2: Martijn
- Stap 3: Samen naar kijken
- Stap 4: Tim (nog ff beschrijving toevoegen voor de lezer)
- Stap 5: Tim
- Stap 6: Martijn
- Stap 7: 
- Stap 8: 

<br/>

## notulen gesprek Lars: 
- Je hoeft alleen de teamnaam op te slaan
- Bij 4.player teamName het webrequest weghalen. Je wilt pas een websocket bericht sturen als de data binnen is. Dus ws versturen in afhandeling van het POST request. 
- 4.player teamname moet post /api/teams (meervoud is gebruikelijk) worden. POST geeft al aan dat het een nieuwe instantie moet zijn.
- Je wilt per ronde 3 categorieën kunnen zien, dus niet 
- Room id bij overzicht van master zou mooi zijn.
- aantal players tonen bij master moet er uit
- Je moet teams kunnen kicken
- Je mag tegen quizmaster zeggen nieuw antwoord en dat hij vervolgens getall() doet. 
- Je moet geen data via sockets gaan versturen. De database moet alle data hebben zodat als iedereen de verbinding verbreekt je weer terug kan naar het spel. Je moet weten in welke vraag je bent, welke ronde, en welke vragen er al geweest zijn. 
- Zorg dat je met elkaar goed blijft communiceren over ontwerpbeslissingen. Volgende week hebben we een update dus dan kan je nog vragen stellen. Vandaag wordt er een roostertje gestuurd met tijdsloten voor lessen volgende week. 