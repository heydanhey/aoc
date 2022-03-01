import { getFileName } from './utility.mjs';
import { sampleData, userData } from "./06_data.mjs";

function parseData(state) {
    return state.split(',');
}

function part1(data, { days }) {
    let day = 0;
    let fishes = data;
    while (day < days ) {
        fishes = fishes.reduce((acc, cur, i) => {
            if (cur === 0) {
                acc[i] = 7
                acc.push(9)
            }
            return acc;
        }, fishes).map(fish => {
            return fish -= 1;
        })
        day += 1;
    }
    return fishes.length
}

function part2(input, { days }) {
    let fishesByAge = {
      ...{
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
      },
    };

    fishesByAge = input.reduce((acc, cur) => {
        acc[cur] = acc[cur] ? acc[cur] += 1 : 1
        return acc;
    }, fishesByAge)
  
    const school = Array.from({ length: days }).reduce(
      (school) => ({
        0: school['1'],
        1: school['2'],
        2: school['3'],
        3: school['4'],
        4: school['5'],
        5: school['6'],
        6: school['7'] + school['0'],
        7: school['8'],
        8: school['0'],
      }),
      fishesByAge,
    );
  
    return Object.values(school).reduce((a, b) => a + b, 0);
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
Sample Data Answer: ${part1(parseData(sampleData), { days: 80 })}
User Data Answer: ${part1(parseData(userData), { days: 80 })}

Part 2:
Sample Data Answer: ${part2(parseData(sampleData), { days: 256 })}
User Data Answer: ${part2(parseData(userData), { days: 256 })}
`)