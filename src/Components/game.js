import React from 'react';

import Board from './board';
import Menu from './menu';
import {checkWinner} from "../functions";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: '',
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
            stepNumber: 0,
            menu: true,
            started: false
        }
    }

    // Menu actions
    setSize(event) {
        let size = event.target.value;

        if (size.length === 0) {
            this.setState({
                size: ''
            })
        } else if (!isNaN(size) && size < 10) {
            this.setState({
                size: parseInt(size)
            })
        }

    }

    closeMenu() {
        this.setState({
            menu: false
        });
    }

    startGame() {
        this.setState({
            started: true
        });
    }


    // Square action
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const winner = checkWinner(current.squares, this.state.size);

        if (winner) {
            return;
        }

        const squares = current.squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : '0';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    // History action
    jumpToMove(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winData = checkWinner(current.squares, this.state.size);

        let moves = [];
        let status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
        let winSquares = [];

        if (!this.state.size) {
            status = '';
        } else if (winData) {
            status = 'The winner is: ' + winData.winner;
            winSquares = winData.winSquares;
        } else {
            moves = history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move :
                    'Go to game start';

                return (
                    <li className={(this.state.stepNumber === move) ? "current" : ""} key={move}>
                        <button onClick={() => this.jumpToMove(move)}>{desc}</button>
                    </li>
                );
            });
        }

        if (this.state.menu) {
            return (
                <Menu
                    size={this.state.size}
                    setSize={(event) => this.setSize(event)}
                    closeMenu={() => this.closeMenu()}
                    started={this.state.started}
                    startGame={() => this.startGame()}
                />
            );
        }

        return (
            <div className="game">
                <div className="game-board">
                    <div>{status}</div>
                    <Board
                        size={this.state.size}
                        squares={current}
                        onClick={(i) => this.handleClick(i)}
                        winSquares={winSquares}
                    />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;