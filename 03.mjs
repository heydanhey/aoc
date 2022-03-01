import { sampleData, userData } from "./03_data.mjs";
import { dataToArray, getFileName } from './utility.mjs';

function getGammaAndEpsilonReports(arr) {
    let gamma = '';
    let epsilon = '';
    for (let i = 0; i < arr[0].length; i++) {
        const col = { '1': 0, '0': 0 } 
        for (let j = 0; j < arr.length; j++) {
            col[arr[j][i]] += 1
        }
        if (col['1'] >= col['0']) {
            gamma += 1;
            epsilon += 0;
        } else {
            gamma += 0;
            epsilon += 1;
        }
    }
    return [gamma, epsilon];
}

function getOxygenGeneratorRating(arr) {
    let index = 0;
    while (arr.length > 1) {
        const [gamma] = getGammaAndEpsilonReports(arr);
        arr = arr.filter(n => n[index] === gamma[index])
        index += 1;
    }
    return parseInt(arr[0], 2);
}

function getCO2ScrubberRating(arr) {
    let index = 0;
    while (arr.length > 1) {
        const [, epsilon] = getGammaAndEpsilonReports(arr);
        arr = arr.filter(n => n[index] === epsilon[index]);
        index += 1;
    }
    return parseInt(arr[0], 2);
}

function getPowerConsumption(arr) {
    const [gamma, epsilon] = getGammaAndEpsilonReports(arr);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function getLifeSupportRating(arr) {
    return getOxygenGeneratorRating(arr) * getCO2ScrubberRating(arr);
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
${getPowerConsumption(dataToArray(userData))}

Part 2:
${getLifeSupportRating(dataToArray(userData))}
`)