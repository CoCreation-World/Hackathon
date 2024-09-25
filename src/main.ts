/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import { getLayersMap } from '@workadventure/scripting-api-extra';
// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

getLayersMap().then(() => {
    console.log('getLayersMap ready');
}).catch(e => console.error(e));

WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    let helpPopup: any;
    WA.room.area.onEnter('needHelpPopup').subscribe(() => {
        helpPopup = WA.ui.openPopup('popupHelp', 'Do you wanna know more about us? Explore our Hub!', [{
            label: 'Go to hub',
            className: 'primary',
            callback: () => WA.nav.openTab('https://world.cocreation.world')
        }]);
    });

    WA.room.area.onLeave('needHelp').subscribe(() => {
        helpPopup.close();
    });

    function checkAndSetProperty() {
        getLayersMap().then(() => {
            const lockAll = WA.state.lockAll;
            const roomNames: string[] = ['Blue', 'Pink', 'Yellow', 'Red', 'Orange'];
            roomNames.forEach(roomName => {
                const propertyName = `doorstep${roomName}In`;
                if (lockAll === "") {
                    WA.room.setProperty(propertyName, "code", "");
                } else {
                    console.log(`Variable lockAll is not empty for ${propertyName}, no action taken`);
                }
            });
        }).catch(e => console.error(e));
    }

    checkAndSetProperty();
    WA.onInit().then(() => { checkAndSetProperty(); });
    // Listen for changes to the lockAll variable
    WA.state.onVariableChange('lockAll').subscribe(() => {
        console.log('lockAll variable changed');
        checkAndSetProperty();
    });

});
export {  };



