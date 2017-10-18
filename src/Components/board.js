import React from 'react';

import Square from './square';

class Board extends React.Component {
    renderRow(rowStart, rowNum) {
        let row = [];

        for (let i = rowStart; i < this.props.size + rowStart; i++) {
            row.push(
                <Square
                    key={i}
                    value={this.props.squares[i]}
                    onClick={
                        // Если квадрат уже был нажат не обрабатываем событие
                        (!this.props.squares[i]) ? () => this.props.onClick(i) : () => {}
                    }
                    winSquare={
                        this.props.winSquares ?
                            this.props.winSquares.some((winSquare) => {return winSquare == i;}) :
                            false
                    }
                />
            );
        }

        row = <div key={rowNum} className="board-row">{row}</div>;

        return row;
    }

    renderBoard() {
        let board = [],
            size = this.props.size;

        for (let i = 0; i < size; i++) {
            board.push(this.renderRow(i * size, i));
        }

        return board;
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

export default Board;