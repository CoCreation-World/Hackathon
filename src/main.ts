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

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

let currentZone: string;
let currentPopup: any;

const config = [
    {
        zone: 'needHelp',
        message: 'Do you wanna know more about us? Explore our Hub!',
        cta: [
            {
                label: 'go to hub',
                className: 'primary',
                callback: () => WA.nav.openTab('https://world.cocreation.world'),
            }
        ]
    },
    {
        zone: 'followUs',
        message: 'Hey! Have you already started following us?',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/cocreationworld'),
            },
            {
                label: 'Newsletter',
                className: 'primary',
                callback: () => WA.nav.openTab('https://cocreation.world'),
            }
        ]
    },
]


WA.onEnterZone('needHelp', () => {
    currentZone = 'needHelp'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.onEnterZone('followUs', () => {
    currentZone = 'followUs'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.onLeaveZone('needHelp', closePopup);
WA.onLeaveZone('followUs', closePopup);

function openPopup(zoneName: string, popupName: string) {
    const zone = config.find((item) => {
        return item.zone == zoneName
    });
    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
