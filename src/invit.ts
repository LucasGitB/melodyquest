/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";


console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
const musicTitle = document.getElementById("music-title") as HTMLSelectElement;
const musicType = document.getElementById("music-type") as HTMLTextAreaElement;
const userSelect = document.getElementById('user-select') as HTMLSelectElement;

let musicSelections = [];



// Waiting for the API to be ready
await WA.players.configureTracking();

WA.onInit().then(() => {

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
    const players = WA.players.list();
    for (const player of players) {
        const option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;
        userSelect.appendChild(option);
    }
    saveButton.addEventListener("click", async () => {
        const selectedOptions = Array.from(userSelect.selectedOptions); // Obtenir les options sélectionnées
        const invitFor = selectedOptions.map((option) => option.value); // Obtenir les valeurs des options sélectionnées

        const game = {
            host: WA.player.name,
            gameInfos: musicType.value,
            pos: await WA.player.getPosition(),
            invitFor: invitFor, // Utiliser les valeurs sélectionnées dans user-select
        };

        console.log("GAME =", game);
        WA.event.broadcast("New-Game", game);
    });

    
    
    

}).catch(e => console.error(e));

export {};