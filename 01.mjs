import { userData, sampleData } from "./01_data.mjs";
import { dataToArray, getFileName } from './utility.mjs';

const increasingMeasurmentsCount = measurments => {
    return measurments
        .reduce((acc, cur) => {
            if (cur > acc['prev']) {
                acc['count'] += 1;
            }
            acc['prev'] = cur;
            return acc;
        }, { prev: null, count: 0 })
        .count
}

const increasingMeasurmentsGroupCount = measurments => {
    let count = 0;
    let a, b;
    for (let i = 0;  i < measurments.length - 3; i += 1) {
        a = sum(measurments[i], measurments[i+1], measurments[i+2])
        b = sum(measurments[i+1], measurments[i+2], measurments[i+3])
        if (b > a) {
            count += 1;
        }
    }
    return count;
}

function sum(a, b, c) {
    return parseInt(a) + parseInt(b) + parseInt(c);
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
${increasingMeasurmentsCount(dataToArray(userData))}

Part 2:
${increasingMeasurmentsGroupCount(dataToArray(userData))}
`)