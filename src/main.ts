/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    })

    WA.room.area.onLeave('clock').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));
let helpPopup: any;
const ctaHelp = [{
    label: 'Go to hub',
    className: 'primary',
    callback: () => WA.nav.openTab('https://world.cocreation.world')
}];
WA.room.area.onEnter('needHelp').subscribe, () => {
helpPopup = WA.ui.openPopup('hopupHelp','Do you wanna know more about us? Explore our Hub!', ctaHelp)} 

WA.room.area.onLeave('needHelp').subscribe(() => {
    helpPopup.close();
})

export {};
