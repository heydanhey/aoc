import { getFileName } from './utility.mjs';
import { sampleData, userData } from "./04_data.mjs";

function parseData(data) {
    const chunks = data.split(/\n\n/)
    const numbers = chunks.shift().split(',').map(x => parseInt(x));
    const boards = chunks.map(data => {
        const rows = data.split(/\n/)
        const board = []
        rows.forEach(row => {
            const parsedRow = row.trim().split(' ').filter(x => !!x).map(c => parseInt(c))
            board.push(parsedRow)
        })
        return board;
    })
    return [numbers, boards]
}

function checkRow(numbers, row) {
    for (const item of row) {
        if (!numbers.includes(item)) {
            return false;
        }
    }
    return true;
}

function check(numbers, rows) {
    let winner = false;
    const columns = []
    for (const [i, row] of rows.entries()) {
        winner = checkRow(numbers, row)
        if (winner) {
            return true
        }
        const column = rows.map((value) => { return value[i]; });
        columns.push(column)
    }
    for (const col of columns) {
        winner = checkRow(numbers, col)
        if (winner) {
            return true
        }
    }
    return false;
}

function getSum(board, numbers) {
    return board.flat().reduce((acc, cur) => {
        if (!numbers.includes(cur)) {
            acc += cur;
        }
        return acc;
    }, 0) * numbers[numbers.length - 1];
}

function playPart1([numbers, boards]) {
    let index = 5;
    let winner = false;
    let playedNumbers = [numbers[0], numbers[1], numbers[2], numbers[3], numbers[4]];
    while (index < numbers.length && !winner) {
        for (const [i, board] of boards.entries()) {
            winner = check(playedNumbers, board)
            if (winner) {
                return getSum(board, playedNumbers)
            }
        }
        playedNumbers.push(numbers[index]);
        index += 1;
    }
    console.log(winningBoards)
    return false;
}

function playPart2([numbers, boards]) {
    let index = 5;
    let winner = false;
    let winningBoards = [];
    let playedNumbers = [numbers[0], numbers[1], numbers[2], numbers[3], numbers[4]];
    while (index < numbers.length) {
        for (const [i, board] of boards.entries()) {
            winner = check(playedNumbers, board)
            if (winner && !winningBoards.includes(i)) {
                winningBoards.push(i)
                if (winningBoards.length === boards.length) {
                    return getSum(board, playedNumbers)
                }
            }
        }
        playedNumbers.push(numbers[index]);
        index += 1;
    }
    console.log(winningBoards)
    return false;
}

console.log(`
Day ${getFileName(import.meta.url)}
________________________

Part 1:
Sample Data Answer: ${playPart1(parseData(sampleData))}
User Data Answer: ${playPart1(parseData(userData))}

Part 2:
Sample Data Answer: ${playPart2(parseData(sampleData))}
User Data Answer: ${playPart2(parseData(userData))}
`)