import './Popup.css'
import Button from '../button/Button'

export default function Popup({message, closePopup, btnText}) {

    return (
        <div className='popup-container' onClick={closePopup}>
            <div className='popup'>
                <h3 className='popup-message'>{message}</h3>
                <Button onClick={closePopup}>{btnText}</Button>
            </div>
        </div>
    )
}