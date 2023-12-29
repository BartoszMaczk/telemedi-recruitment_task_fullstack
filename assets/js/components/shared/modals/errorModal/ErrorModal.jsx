import React from 'react';
import {TxtRegular} from "../../typography/txtRegular/TxtRegular";

export const ErrorModal = ({show, message, onClose}) => {

    if (!show) {
        return null;
    }

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal show" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-danger">Błąd</h5>
                            <button type="button" className="close" onClick={onClose}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <TxtRegular className={'text-dark'}>{message}</TxtRegular>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Zamknij</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};