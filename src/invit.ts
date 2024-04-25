/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";


console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
const musicTitle = document.getElementById("music-title") as HTMLSelectElement;
const musicType = document.getElementById("music-type") as HTMLTextAreaElement;
let musicSelections = [];

// Waiting for the API to be ready
WA.onInit().then(() => {
    
    console.log( typeof WA.state.gamesState +"jasonddddsdsnsns")
   
    saveButton.addEventListener("click", async () => {
        WA.room.showLayer("rap-room")
        const game = {
            host : WA.player.name,
            gameInfos: musicType.value,
            pos : await WA.player.getPosition()
        }
        WA.event.broadcast("New-Game", game);
    });

    
    
    

}).catch(e => console.error(e));

export {};