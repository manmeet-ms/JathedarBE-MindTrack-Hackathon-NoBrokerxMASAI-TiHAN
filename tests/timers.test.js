import { faker } from "@faker-js/faker";
import { createTimerSrv } from "../../frontend/src/services/timer.service.js";
import dayjs from "dayjs";
import logger from "../utils/logger.utils.js";


for (let i = 0; i < process.argv[2]; i++) {
  const data = {
    uid:'68a93bc1f3476d8cf96e3a0c',
     codename: faker.word.noun(), // random single noun
  failures: faker.number.int({ min: 50, max: 100 }), // random number 50-100
  timerStarted: dayjs(faker.date.recent()).format("DD/MM/YYYY"), // random date string
  title: faker.lorem.words(3), // random 3-word lorem
  description: faker.lorem.lines(2), // random lorem text
  perks: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
    ({name:faker.word.noun(), description:faker.lorem.lines(2)})
  ),
  punishments: Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () =>
    ({name:faker.word.noun(), description:faker.lorem.lines(2)})
  ),
  alternates: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
    ({name:faker.word.noun(), description:faker.lorem.lines(2)})
  ),
  quoteFlashingAllowed: faker.datatype.boolean(),
  pulseTheme: "bg-green-500",
  };
try {
    createTimerSrv(data);
    logger("log","success");
  } catch (err) {
    logger("log",err.message);
    
  }
}

