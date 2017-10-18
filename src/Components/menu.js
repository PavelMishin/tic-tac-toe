import React from 'react';

import Popup from './popup';
import {isNumber} from '../functions';

class Menu extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         validSize: false
    //     }
    // }

    render() {
        return (
            <Popup>
                {this.props.started &&
                <div style={{textAlign: 'right', marginBottom: 20 + 'px'}}>
                    <button onClick={() => this.props.closeMenu()} disabled={!this.props.size}>
                        Close menu
                    </button>
                </div>
                }

                {!this.props.started &&
                <div>
                    <div>
                        <input
                            id="size"
                            type="text"
                            value={this.props.size}
                            onChange={(event) => this.props.setSize(event)}
                            placeholder="Board size"
                        />
                    </div>

                    <div style={{textAlign: 'center', marginTop: 20 + 'px'}}>
                        <button onClick={
                            this.props.size ?
                                () => {
                                    this.props.closeMenu();
                                    this.props.startGame()
                                } :
                                () => this.startWarning()
                        }
                        >
                            Start game
                        </button>
                    </div>
                </div>
                }

            </Popup>
        );
    }

    startWarning() {
        document.getElementById('size').classList.add('warning')
    }
}

export default Menu;