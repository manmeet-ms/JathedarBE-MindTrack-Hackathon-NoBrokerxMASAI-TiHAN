import { sendMesagesInDiscordChannel } from "../../frontend/src/utils/discord-server.utils.js";

const luserres = [
  { provider: { discord: { discordId: "rO5S4NxBNlnFcVuBUV" } }, _id: "68b2c823b653c197fde323c7", username: "marcella.franecki69303", name: "Jean Crona", email: "samara.willms@yahoo.com", points: 3930, password: "$2b$10$QkU0LFnzIAcggbZqFkpUMO4IEeHUGQza.DfqLtM0/pHKmMVqbg88S", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/22.jpg", role: "user", isVerified: false, verificationToken: "39fed3c9-b150-45d0-90c6-16cb6f1169c8", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.604Z", updatedAt: "2025-08-30T09:45:07.604Z" },
  { provider: { discord: { discordId: "Wa4r8mhk0pe29Tmxhg" } }, _id: "68b2c823b653c197fde322dc", username: "dorthy_muller68", name: "Lana Lynch", email: "mya68@hotmail.com", points: 3915, password: "$2b$10$/W4Tds5Kwezi.ccUkrkYJO1VbRxuHS1jwbI5aTHj6IdNb7JTSZD..", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/25.jpg", role: "user", isVerified: false, verificationToken: "5db8be6d-7b6b-4b30-93d6-a79378bac19c", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.601Z", updatedAt: "2025-08-30T09:45:07.601Z" },
  { provider: { discord: { discordId: "jQJtigqf7HuC33CoXK" } }, _id: "68b2c823b653c197fde3240b", username: "aurelia78371", name: "Miss Linda Mayer", email: "constance87@hotmail.com", points: 3910, password: "$2b$10$KQACbxR99/fEu97q9WH6Kul5OaJ6Mo8myYiNfRACYErc/iJ.YD50i", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/53.jpg", role: "user", isVerified: false, verificationToken: "3ec2d838-849d-4045-b40f-95df3f97691c", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.605Z", updatedAt: "2025-08-30T09:45:07.605Z" },
  { provider: { discord: { discordId: "Yo6JVlIJObYr2IbYiK" } }, _id: "68b2c823b653c197fde3238a", username: "aimee_schinner29242", name: "Charlene Morissette", email: "lila.kirlin@hotmail.com", points: 3910, password: "$2b$10$mXTGRDUX0BnU33eaJCsvieV1qxucpAlMNRTI2ePR1K4dsexX7ewi2", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/36.jpg", role: "user", isVerified: false, verificationToken: "8200b07a-e3a4-4491-8d63-39e14c56fa05", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.603Z", updatedAt: "2025-08-30T09:45:07.603Z" },
  { provider: { discord: { discordId: "SHI8sU5tibLvuO4C4y" } }, _id: "68b2c823b653c197fde3241e", username: "amie53390", name: "Megan Rosenbaum", email: "kelton81@gmail.com", points: 3905, password: "$2b$10$tP7cxqFEIC.NZaxbCjKjsu9sA.42orbHBXElytS7xdN.Z8enpnkxG", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/87.jpg", role: "user", isVerified: false, verificationToken: "4c2dd17e-c47d-469d-b184-7de96fabca2f", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.605Z", updatedAt: "2025-08-30T09:45:07.605Z" },
  { provider: { discord: { discordId: "pGiO9idYuNWdJ1eozV" } }, _id: "68b2c823b653c197fde32481", username: "mozell_reilly489", name: "Crystal Borer", email: "delta58@hotmail.com", points: 3900, password: "$2b$10$/VAfsLrLp.PGvID4c8bbVO3jTgpWYwBIP32g/iSQT13yjx3Z1GygC", avatar: "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/32.jpg", role: "user", isVerified: false, verificationToken: "fba2f964-d453-42ae-ab3e-76ec428ccf55", resetPasswordToken: null, resetPasswordTokenExpires: null, __v: 0, createdAt: "2025-08-30T09:45:07.606Z", updatedAt: "2025-08-30T09:45:07.606Z" },
];
const dcembedsuserlist = [""];
let message;
const usersLeader = async () => {
  try {
    luserres.map((item) => {
      dcembedsuserlist.push(`${item.name} - ${item.points} `);
    });
    message = dcembedsuserlist.toString().replaceAll(",", "\n- ");
    console.log(message);
    sendMesagesInDiscordChannel("1412432577595183244", message);
  } catch (error) {
    console.log(error);
  }
};

usersLeader();
