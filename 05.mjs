import { getFileName } from './utility.mjs';
import { sampleData, userData } from "./05_data.mjs";

function createMatrix(n) {
    const matrix = []
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (j === 0) {
                matrix.push([])
            }
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function parseData(data) {
    return data.split(/\n/).map(x => x.split(' -> ').map(y => y.split(',').map(z => parseInt(z))))
}

function is45(x1, y1, x2, y2) {
    return Math.abs(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI);
}

function travelMap(data, { withDiagnals }) {
    const matrix = createMatrix(1000)
    data.forEach(row => {
        const [x1, y1] = row[0];
        const [x2, y2] = row[1];
        if (x1 === x2) {
            if (y1 <= y2) {
                for (let i = y1; i <= y2; i++) {
                    matrix[i][x1]++
                }
            } else {
                for (let i = y2; i <= y1; i++) {
                    matrix[i][x1]++
                }
            }
        } else if (y1 === y2) {
            if (x1 <= x2) {
                for (let i = x1; i <= x2; i++) {
                    matrix[y1][i]++
                }
            } else {
                for (let i = x2; i <= x1; i++) {
                    matrix[y1][i]++
                }
            }
        } else if (withDiagnals && is45(x1, y1, x2, y2)) {
            let complete = false;
            matrix[y2][x2]++
            let curX = x1;
            let curY = y1;
            while (!complete) {
                matrix[curY][curX]++
                if (x1 < x2) {
                    curX++;
                } else if (x1 > x2) {
                    curX--;
                }
                if (y1 < y2) {
                    curY++;
                } else if (y1 > y2) {
                    curY--;
                }
                if (curX === x2) {
                    complete = true
                }
            }

        }
    });
    return matrix;
}

function countOvelap(data, opts) {
    const matrix = travelMap(data, opts);
    return matrix.flat().reduce((acc, cur) => {
        if (cur >= 2) {
            acc += 1;
        }
        return acc;
    }, 0);
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
Sample Data Answer: ${countOvelap(parseData(sampleData), { withDiagnals: false })}
User Data Answer: ${countOvelap(parseData(userData), { withDiagnals: false })}

Part 2:
Sample Data Answer: ${countOvelap(parseData(sampleData), { withDiagnals: true })}
User Data Answer: ${countOvelap(parseData(userData), { withDiagnals: true })}
`)