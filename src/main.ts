/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(async () => {
    let noteWebsite: any;
  let votingPeriod: any;
  let ranking: any;
    //WA.room.hideLayer("rap-room")
    console.log("Scripting API ready");

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));

  
 
    
    const singerZone = WA.room.area
      .onEnter("singerZone")
      .subscribe(async () => {
        const playerId = WA.player.uuid;
        const playerName = WA.player.name;

       noteWebsite = await WA.ui.website.open({
            url: "./src/youtubeIframe.html",
            position: {
                vertical: "top",
                horizontal: "left",
            },
            size: {
                height: "50vh",
                width: "70vw",
            },

            allowApi: true,
        });

        // Définissez les données du joueur à envoyer
        const playerData = {
          playerId: playerId,
          playerName: playerName
          // Ajoutez d'autres champs si nécessaire, comme la date de naissance, etc.
        };

        fetch("http://localhost:3000/players", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playerData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Nouveau joueur inséré:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // Envoie de la requête POST à l'API
        WA.room.area.onLeave("singerZone").subscribe(()=>{
            noteWebsite.close();
          })
      });
      

      

    const subscription = WA.event.on("New-Game").subscribe((event: any) => {
      const x: number = event.data.pos.x;
      const y: number = event.data.pos.y;
      if (event.data.invitFor.indexOf(WA.player.name) !== -1) {
        WA.chat.open();
        WA.chat.sendChatMessage('Vous êtes invité pour chanter ! Invitation reçu de la part de ' + event.data.host + 'Cliquer sur le boutton REJOINDRE KARAOKE', { scope: 'local', author: 'Mr Robot' });
        WA.ui.actionBar.addButton({
          id: "joinKaraoke",
          label:"Rejoindre Karaoke",
          callback: (event: any) => {
            
            // When a user clicks on the action bar button 'Register', we remove it.
            WA.player.state.singer = "false";
            WA.player.teleport(x, y);
            WA.ui.actionBar.removeButton("joinKaraoke");
            WA.chat.close();
          },
        });
      } else if (event.data.public == true) {
        WA.chat.open();
        WA.chat.sendChatMessage('Vous êtes invité pour chanter ! Invitation reçu de la part de ' + event.data.host + 'Cliquer sur le boutton REJOINDRE KARAOKE', { scope: 'local', author: 'Mr Robot' });
        WA.ui.actionBar.addButton({
          id: "joinKaraoke",
          label:"Rejoindre Karaoke",
          callback: (event: any) => {
            
            // When a user clicks on the action bar button 'Register', we remove it.
            WA.player.state.singer = "false";
            WA.player.teleport(x, y);
            WA.ui.actionBar.removeButton("joinKaraoke");
            WA.chat.close();
          },
        });
      }
    });

  WA.event.on("VotePeriod").subscribe(async (event: any) => {
    console.log("porto"+WA.player.state.singer)
    if (WA.player.state.singer != 'true') {
      votingPeriod= await WA.ui.website.open({
        url: "http://localhost:5174/rating",
        position: {
            vertical: "top",
            horizontal: "left",
        },
        size: {
            height: "50vh",
            width: "70vw",
        },

        allowApi: true,
    });
       }
         
     });
  
     const karaokeArea = WA.room.area.onLeave("karaokeArea").subscribe(async () => {
        votingPeriod.close()
     })
  
   WA.room.area.onEnter("rankingArea").subscribe(async () => {
    console.log("coucoucoucocuou")
    ranking= await WA.ui.website.open({
      url: "http://localhost:5174/ranking",
      position: {
          vertical: "top",
          horizontal: "left",
      },
      size: {
          height: "50vh",
          width: "70vw",
      },

      allowApi: true,
  });
  })
  
   WA.room.area.onLeave("rankingArea").subscribe(async () => {
    console.log("coucoucoucocuou")
     ranking.close();
     })

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
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
