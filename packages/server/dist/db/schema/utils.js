import { generatePassword } from "../../templates/index.js";
import { faker } from "@faker-js/faker";
import { customAlphabet } from "nanoid";
const alphabet = "abcdefghijklmnopqrstuvwxyz123456789";
const customNanoid = customAlphabet(alphabet, 6);
export const generateAppName = (type) => {
    const verb = faker.hacker.verb().replace(/ /g, "-");
    const adjective = faker.hacker.adjective().replace(/ /g, "-");
    const noun = faker.hacker.noun().replace(/ /g, "-");
    const randomFakerElement = `${verb}-${adjective}-${noun}`;
    const nanoidPart = customNanoid();
    return `${type}-${randomFakerElement}-${nanoidPart}`;
};
export const cleanAppName = (appName) => {
    if (!appName) {
        return appName?.toLowerCase();
    }
    return appName.trim().replace(/ /g, "-").toLowerCase();
};
export const buildAppName = (type, baseAppName) => {
    if (baseAppName) {
        return `${cleanAppName(baseAppName)}-${generatePassword(6)}`;
    }
    return generateAppName(type);
};
