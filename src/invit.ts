/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";


console.log('Script started successfully');

const noteTextArea = document.getElementById("noteTextArea") as HTMLTextAreaElement;
const saveButton = document.getElementById("saveButton") as HTMLButtonElement;
const invitAllMap = document.getElementById("invitAllMap") as HTMLButtonElement;
const musicType = document.getElementById("music-type") as HTMLSelectElement;
const userSelect = document.getElementById('user-select') as HTMLSelectElement;

let musicSelections = [];



// Waiting for the API to be ready
await WA.players.configureTracking();

WA.onInit().then(() => {

    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    //recup player autour pour les inviter
    const players = WA.players.list();
    for (const player of players) {
        const option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;

        userSelect.appendChild(option);
    }

    saveButton.addEventListener("click", async () => {
        const rapArea = await WA.room.area.get('karaokeArea');
        const popArea = await WA.room.area.get('popArea');
        const singerRapArea = await WA.room.area.get('singerZone');
        const singerPopArea = await WA.room.area.get('singerPopArea');
        let x_to_tp = 0;
        let y_to_tp = 0;

        const selectedOptions = Array.from(userSelect.selectedOptions); // Obtenir les options sélectionnées
        const invitFor = selectedOptions.map((option) => option.value); // Obtenir les valeurs des options sélectionnées
        const roomSelected = Array.from(musicType.selectedOptions).map((option => option.value));
        console.log(roomSelected.toString()+"choix")
        if (roomSelected.toString() == "Rap") {
            console.log("salutttttt")
            x_to_tp = rapArea.x;
            y_to_tp = rapArea.y;
        } else if(roomSelected.toString() == "Pop"){
            x_to_tp = popArea.x;
            y_to_tp = popArea.y;
        }

        const game = {
            public : false,
            host: WA.player.name,
            gameInfos: musicType.value,
            pos: {
                x:x_to_tp,
                y:y_to_tp
            },
            invitFor: invitFor, // Utiliser les valeurs sélectionnées dans user-select
        };

        if (roomSelected.toString() == "Rap") {
            x_to_tp = singerRapArea.x;
            y_to_tp = singerRapArea.y;
        } else if(roomSelected.toString() == "Pop"){
            x_to_tp = singerPopArea.x;
            y_to_tp = singerPopArea.y;
        }
        console.log(JSON.stringify(game) +"laaa")
        
        WA.event.broadcast("New-Game", game);

        
        WA.player.teleport(x_to_tp, y_to_tp);
    });

    invitAllMap.addEventListener("click", async () => {
        const rapArea = await WA.room.area.get('karaokeArea');
        const popArea = await WA.room.area.get('popArea');
        const singerRapArea = await WA.room.area.get('singerZone');
        const singerPopArea = await WA.room.area.get('singerPopArea');
        let x_to_tp = 0;
        let y_to_tp = 0;

        const selectedOptions = Array.from(userSelect.selectedOptions); // Obtenir les options sélectionnées
        const invitFor = selectedOptions.map((option) => option.value); // Obtenir les valeurs des options sélectionnées
        const roomSelected = Array.from(musicType.selectedOptions).map((option => option.value));
        console.log(roomSelected.toString()+"choix")
        if (roomSelected.toString() == "Rap") {
            console.log("aloooooo")
            x_to_tp = rapArea.x;
            y_to_tp = rapArea.y;
        } else if(roomSelected.toString() == "Pop"){
            x_to_tp = popArea.x;
            y_to_tp = popArea.y;
        }

        const game = {
            public : true,
            host: WA.player.name,
            gameInfos: musicType.value,
            pos: {
                x:x_to_tp,
                y:y_to_tp
            },
            invitFor: invitFor, // Utiliser les valeurs sélectionnées dans user-select
        };

        if (roomSelected.toString() == "Rap") {
            x_to_tp = singerRapArea.x;
            y_to_tp = singerRapArea.y;
        } else if(roomSelected.toString() == "Pop"){
            x_to_tp = singerPopArea.x;
            y_to_tp = singerPopArea.y;
        }
        
        
        WA.event.broadcast("New-Game", game);

        
        WA.player.teleport(x_to_tp, y_to_tp);
    });


    
    
    

}).catch(e => console.error(e));

export {};