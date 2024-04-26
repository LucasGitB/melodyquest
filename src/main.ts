/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit()
  .then(async () => {
    //WA.room.hideLayer("rap-room")
    console.log("Scripting API readyiiiii");

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));

    const myAreaSubscriber = WA.room.area
      .onEnter("singerZone")
      .subscribe(() => {
        const playerId = WA.player.uuid;
        console.log(playerId);
        const playerName = WA.player.name;
        console.log(playerName);

        // Définissez les données du joueur à envoyer
        const playerData = {
          playerId: playerId,
          playerName: playerName
          // Ajoutez d'autres champs si nécessaire, comme la date de naissance, etc.
        };

        // Envoie de la requête POST à l'API
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
      });

    const subscription = WA.event.on("New-Game").subscribe((event: any) => {
      console.log("Event received", event.data);
      const x: number = event.data.pos.x;
      const y: number = event.data.pos.y;
      console.log("ptit test" + event.data.invitFor.indexOf(WA.player.name));
      if (event.data.invitFor.indexOf(WA.player.name) !== -1) {
        WA.ui.actionBar.addButton({
          id: "register-btn",
          type: "action",
          imageSrc: "../public/images/favicon.svg",
          toolTip: "Rejoindre",
          callback: (event: any) => {
            console.log("Button clicked", event);
            // When a user clicks on the action bar button 'Register', we remove it.
            WA.player.teleport(x, y);
            WA.ui.actionBar.removeButton("register-btn");
          },
        });
      } else {
        console.log("non");
      }
    });

    WA.state.onVariableChange("gamesState").subscribe((value) => {
      console.log("salutttttttt" + value);
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
  })
  .catch((e) => console.error(e));

function closePopup() {
  if (currentPopup !== undefined) {
    currentPopup.close();
    currentPopup = undefined;
  }
}

export {};
