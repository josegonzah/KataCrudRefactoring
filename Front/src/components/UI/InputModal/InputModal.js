import React, { useState } from 'react';

import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './InputModal.module.css';

const InputModal = props => {
    const [enteredValue, setEnteredValue] = useState('');

    const goalInputChangeHandler = event => {
        setEnteredValue(event.target.value)
    };

    const buttonClickHandler = () => {
        if(enteredValue.trim().length === 0){
            return
        }
        props.onConfirm(enteredValue)
    }

    return(
        <div>
            <div className={classes.backdrop}/>
            <Card className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <div className={classes.input}>
                    <input type="text" onChange={goalInputChangeHandler} />
                </div>
                <footer className={classes.actions}>
                    <Button onClick={buttonClickHandler}> Okay</Button>
                </footer>
            </Card>
        </div>
    )
}

export default InputModal;