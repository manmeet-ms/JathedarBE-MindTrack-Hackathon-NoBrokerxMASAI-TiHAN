import { createTimerSrv } from "../../frontend/src/services/timer.service.js";

export const timers = [

{
  
  "codename": "Prevention",
  "failures": 47,
  "timerStarted": "Fri Oct 24 2025 22:32:45 GMT+0530 (India Standard Time)",
  "title": "Lorem ipsum",
  "description": "Lorem ipsum",
  "perks": [
   
   
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }
  ],
  "punishments": [   {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }],
  "alternates": [   {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }],
  "quoteFlashingAllowed": false,
  "pulseTheme": "bg-amber-500",
  "__v": 0
},{
  
  "codename": "Prevention",
  "failures": 47,
  "timerStarted": "Fri Oct 24 2025 22:32:45 GMT+0530 (India Standard Time)",
  "title": "Lorem ipsum",
  "description": "Lorem ipsum",
  "perks": [
   
   
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }
  ],
  "punishments": [   {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }],
  "alternates": [   {
      "name": "Lorem ipsum",
      "description": "Automatically"
    },
    {
      "name": "Lorem ipsum",
      "description": "Automatically"
    }],
  "quoteFlashingAllowed": false,
  "pulseTheme": "bg-amber-500",
  "__v": 0
}



  // {
    // uid:'68b1d51b657c3f684bb3cb11',
  //   codename: "Lorem",
  // failures:0,
  //   title: "1. Consectetur adipisicing",
  //   description:
  //     "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, odit.",
  //   timerStarted: new Date(),
  //   perks: [{ name: "Perks", description: "perks" }],
  //   punishments: [{ name: "Punishments", description: "punishments" }],
  //   alternates: [{ name: "Alternates", description: "alternates" }],
  //   quoteFlashingAllowed: false,
  //   pulseTheme: "bg-rose-800",
  // },
  // {
];

const timerarray=[]
export const externalInitializer = () => {
  for (let i = 0; i < timers.length; i++) {
    const data = {
    uid:'68b1d51b657c3f684bb3cb11',
      codename: timers[i].codename,
      failures: timers[i].failures,
      timerStarted: new Date(),
      title: timers[i].title,
      description: timers[i].description,
      perks: timers[i].perks,
      punishments: timers[i].punishments,
      alternates: timers[i].alternates,
      quoteFlashingAllowed: timers[i].quoteFlashingAllowed,
      pulseTheme: timers[i].pulseTheme,
    };
timerarray.push(data)    
createTimerSrv(data)
  }
};


externalInitializer()