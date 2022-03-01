import { userData, sampleData } from "./02_data.mjs";
import { dataToArray, getFileName } from './utility.mjs';

function caclulatePosition(directions) {
    const values = directions
        .reduce((acc, cur) => {
            let [direction, value] = cur.split(' ');
            value = parseInt(value);
            switch(direction) {
                case 'forward':
                    acc.horizontal += value;
                    break;
                case 'down':
                    acc.depth += value;
                    break;
                case 'up':
                    acc.depth -= value;
                    break;
            }
            return acc;
        }, { depth: 0, horizontal: 0 })

    return values.depth * values.horizontal;
}

function caclulatePositionWithAim(directions) {
    const values = directions
        .reduce((acc, cur) => {
            let [direction, value] = cur.split(' ');
            value = parseInt(value);
            switch(direction) {
                case 'forward':
                    acc.horizontal += value;
                    acc.depth += acc.aim * value;
                    break;
                case 'down':
                    acc.aim += value;
                    break;
                case 'up':
                    acc.aim -= value;
                    break;
            }
            return acc;
        }, { depth: 0, horizontal: 0, aim: 0 })

    return values.depth * values.horizontal;
}

const __filename = new URL(import.meta.url).pathname;

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
${caclulatePosition(dataToArray(userData))}

Part 2:
${caclulatePositionWithAim(dataToArray(userData))}
`)
