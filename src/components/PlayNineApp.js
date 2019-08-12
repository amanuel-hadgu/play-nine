import React from 'react';
import Stars from './Stars';
import '../bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../App.css';

export default class PlayNineApp extends React.Component {
    state = {
        buttons: [
            { txt: 1, selected: false, disabled: false },
            { txt: 2, selected: false, disabled: false },
            { txt: 3, selected: false, disabled: false },
            { txt: 4, selected: false, disabled: false },
            { txt: 5, selected: false, disabled: false },
            { txt: 6, selected: false, disabled: false },
            { txt: 7, selected: false, disabled: false },
            { txt: 8, selected: false, disabled: false },
            { txt: 9, selected: false, disabled: false },
        ],
        disabledButtonsNum: 0,
        selectedButtonsSum: 0,
        selectedButtons: [],
        starsNum: Math.floor(Math.random() * 9) + 1,
        stars: [],
        chances: 5,
        win: false,
        lose: false
    };
    handleEqualClick = () => {

    };
    handleRefreshClick = () => {
        if ((this.state.chances === 1 && (this.state.disabledButtonsNum !== 9))) {
            this.setState(() => ({
                lose: true
            }));
        } else if ((this.state.chances === 1 && (this.state.disabledButtonsNum === 9))) {
            this.setState(() => ({
                win: true
            }));
        } else {
            let starsNum = Math.floor(Math.random() * 9) + 1;
        this.setState((prevState) => ({
            starsNum,
            chances: prevState.chances - 1,
            selectedButtons: [],
            buttons: prevState.buttons.map((button) => {
                if (button.selected) {
                    button.disabled = true;
                }
                return button;
            })
        }));
        }        
    };
    handleButtonClick = (event) => {
        let selectedButton = event.target.innerHTML;
        if (event.target.style.backgroundColor === "lightgray") {
            this.setState((prevState) => ({
                buttons: prevState.buttons.map((button) => {
                    if (selectedButton == button.txt) {
                        button.selected = true;
                    }
                    return button;
                }),
                disabledButtonsNum: prevState.disabledButtonsNum + 1,
                selectedButtons: prevState.selectedButtons.concat(selectedButton)
            }));
        } else {
            this.setState((prevState) => ({
                buttons: prevState.buttons.map((button) => {
                    if (selectedButton == button.txt) {
                        button.selected = false;
                    }
                    return button;
                }),
                disabledButtonsNum: prevState.disabledButtonsNum - 1,
                selectedButtons: prevState.selectedButtons.filter((prevSelectedButton) => (
                    prevSelectedButton != selectedButton
                ))
            }));
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <h3 style={{ color: 'black' }}>Play Nine</h3>
                    </div>
                    <div className="col-sm-4">
                        {
                            this.state.win && <h1 style={{ color: 'black' }}>You Win!</h1>
                        }
                        {
                            this.state.lose && <h1 style={{ color: 'red' }}>You Lose!</h1>
                        }
                    </div>
                    <div className="col-sm-3">
                        Chances: {this.state.chances}
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-sm-4">
                        <div className="jumbotron jumbotron-fluid">
                            <Stars
                                starsNum={this.state.starsNum}
                            />
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <p align="center">
                            <div className="form-group">
                                <br />
                                <br />
                                <button className="btn btn-info" onClick={this.handleEqualClick}>=</button>
                                <br />
                                <br />
                                <button className="btn btn-info" onClick={this.handleRefreshClick}>
                                    <i className="fa fa-refresh"></i>&nbsp;&nbsp;{this.state.chances}
                                </button>
                            </div>
                        </p>
                    </div>

                    <div className="col-sm-4">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                {
                                    this.state.selectedButtons.sort().map((selectedButton) => (
                                        <button
                                            id={selectedButton}
                                            style={{ background: 'lightgreen' }}
                                            className="button button-circle"
                                            onClick={this.handleButtonClick}
                                        >{selectedButton}</button>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-md-10">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <p align="center">
                                    {
                                        this.state.buttons.map((button) => (
                                            <button
                                                id={button}
                                                style={
                                                    button.selected ?
                                                        { background: 'lightgreen' } :
                                                        { background: 'lightgray' }
                                                }
                                                disabled={button.disabled}
                                                className="button button-circle"
                                                onClick={this.handleButtonClick}
                                            >{button.txt}</button >
                                        ))
                                    }
                                </p >
                            </div >
                        </div >
                    </div>
                </div >
            </div >
        );
    }
}