import { Action } from 'redux';

export interface IActionsMap { [k: string]: string };

export interface IActionPayload extends Action {
    type: string;
    payload?: { [k: string]: any };
}

