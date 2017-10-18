function checkWinner(squares, size) {
    // Check if squares is array of nulls
    if (squares.every((element) => {return element === null;})) {
        return false;
    }

    let winningLines = getWiningLines(size),
        winData = null;

    winningLines.forEach((item) => {
        let line = [],
            thereIsWinner;

        item.forEach((element) => {
            line.push(squares[element])
        });

        thereIsWinner = !!line.reduce((a, b) => {
            return (a === b) ? a : NaN;
        });

        if (thereIsWinner) {
            winData = {winner: squares[item[0]], winSquares: item};
        }
    });

    return winData;
}

function getWiningLines(size = 3) {
    let lines = [],
        diagonal = [],
        diagonalReverse = [],
        n = 0;

    for (let i = 0; i < size; i++) {
        let horizontal = [],
            vertical = [];

        for (let j = 0; j < Math.pow(size, 2); j += size) {
            horizontal.push(n);
            vertical.push(i + j);
            n++;
        }

        lines.push(horizontal, vertical);

        diagonal.push(i + i * size);
        diagonalReverse.push((i + 1) * size - 1 - i)
    }

    lines.push(diagonal, diagonalReverse);

    return lines;
}

function isNumber(value) {
    return !isNaN(value);
}

export {checkWinner, isNumber};