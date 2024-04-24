/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;



// Waiting for the API to be ready
WA.onInit().then(() => {
    WA.room.hideLayer("rap-room")
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags)
    
    
    

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)


    const subscription = WA.event.on("INVITATION_KARAOKE").subscribe( async (event) => {
        const myWebsite = await WA.ui.website.open({
            url: "./src/invit.html",
            position: {
                vertical: "top",
                horizontal: "left",
            },
            size: {
                height: "20vh",
                width: "20vw",
            },
        });
        
        myWebsite.position.vertical = "top";
    });

    // WA.room.area.onEnter('CreateGameZone').subscribe(async () => {
    //     console.log("salut");
    //     const myWebsite = await WA.ui.website.open({
    //         url: "./src/index.html",
    //         position: {
    //             vertical: "middle",
    //             horizontal: "middle",
    //         },
    //         size: {
    //             height: "50vh",
    //             width: "50vw",
    //         },
    //     });

    //     myWebsite.position.vertical = "top";
    //     WA.room.area.onLeave("CreateGameZone").subscribe(() => {
    //         myWebsite.close();
    //     });
    //   });




    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};