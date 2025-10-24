import { faker } from "@faker-js/faker";
import api from "../../frontend/src/services/api.js";
import { logUrgeService } from "../../frontend/src/services/urge.service.js";
console.time("createUrges.test.js Execution"); // Start a timer labeled "myScriptExecution"


 let typeEnum= [
      "procrastination",
      "distraction",
      "doomscroll",
      "browsing",
      "addiction",
      // "other",
    ]
 let triggerEnum= [
      "boredom",
      "stress",
      "anxiety",
      "habitual time",
      "social media notification",
      "being alone",
      "seeing others online",
      "avoiding hard task",
      "tiredness",
      "mindless routine",
      "dopamine craving",
      "overwhelmed",
      "no clear goal",
      "peer influence",
      "seeking comfort",
    ]
 let locationEnum= [
      "bedroom",
      "workspace",
      "library",
      "college",
      "commute",
      "living room",
      "alone",
      "in public",
    ]
for (let i = 0; i <2; i++) {

let  data = {
    urgeTimeStamp: faker.date.between({ from: '2025-05-01T00:00:00.000Z', to: '2025-08-05T00:00:00.000Z' }),
    urgeIntensity: faker.number.int({ min: 4, max: 10 }),
    urgeType: typeEnum[faker.number.int({min:0, max:typeEnum.length-1})],
    urgeTrigger: triggerEnum[faker.number.int({min:0, max:triggerEnum.length-1})],
    urgeLocation: locationEnum[faker.number.int({min:0, max:locationEnum.length-1})],
    urgeResolved: false,
    urgeNotes: i+ ". " +faker.lorem.lines(),
  };
  logUrgeService(data)
}
 
console.timeEnd("createUrges.test.js Execution"); // Start a timer labeled "myScriptExecution"
