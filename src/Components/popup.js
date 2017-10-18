import React from 'react';
import * as ReactDOM from "react-dom";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.popup;
    }

    render() {
        return (<noscript></noscript>);
    }

    componentDidMount() {
        this.renderPopup();
    }

    componentDidUpdate() {
        this.renderPopup();
    }

    componentWillUnmount() {
        // ReactDOM.unmountComponentAtNode(document.getElementById('popup'));
        ReactDOM.unmountComponentAtNode(this.popup);
    }

    renderPopup() {
        if (!this.popup) {
            this.popup = document.createElement("div");
            document.body.appendChild(this.popup);
        }

        ReactDOM.render(

            // TODO: Переписать с рендером попапа отдельно от #react-app (#root)?

            <div className="popup-overlay">
                <div className="popup-content">
                    {this.props.children}
                </div>
            </div>,
            this.popup);
    }
}

export default Popup;