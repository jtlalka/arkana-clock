import * as fs from "fs";

export function loadDateFromFile(fileName, fileType) {
    try {
        return fs.readFileSync(fileName, fileType);
    } catch (ex) {
        return {};
    }
}

export function saveDataToFile(fileName, fileType, data) {
    fs.writeFileSync(fileName, data, fileType);
}
