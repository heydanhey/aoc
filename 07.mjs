import { getFileName } from './utility.mjs';
import { sampleData, userData } from "./07_data.mjs";

function findPosition(data, { isConstantRate }) {
    const sortedArray = data.map(x => parseInt(x)).sort((a, b) => a - b);
    const first = sortedArray[0];
    const last = sortedArray[sortedArray.length - 1];
    const range = [...Array(last).keys()].slice(first);
    let result = [];
    for (let i = 0; i <= range.length; i++) {
        const position = data.reduce((acc, cur) => {
            if (isConstantRate) {
                acc += Math.abs(cur - i)
            } else {
                const step = Math.abs(cur - i) + 1;
                const sum = ((step * (step - 1))/2);
                acc += sum;
            }
            return acc;
        }, 0)
        result.push(position);
    }
    return result.sort((a, b) => a - b)[0];
}

function parseData(data) {
    return data.split(',');
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
Sample Data Answer: ${findPosition(parseData(sampleData), { isConstantRate: true })}
User Data Answer: ${findPosition(parseData(userData), { isConstantRate: true })}

Part 2:
Sample Data Answer: ${findPosition(parseData(sampleData), { isConstantRate: false })}
User Data Answer: ${findPosition(parseData(userData), { isConstantRate: false })}
`)
