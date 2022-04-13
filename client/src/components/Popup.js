import React from 'react'
import './popup.css'
import { Button } from './Button'

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popupInner">
                <button className="closeBtn" onClick={() => props.setTrigger(false)}
                style={{
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'right'
                }}>X</button>
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Popup
