
import { LightningElement, api, track } from 'lwc';
/* eslint-disable no-console */
 /* eslint-disable no-alert */
export default class Pagination extends LightningElement {

    previousHandler1(_event) {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    nextHandler1(_event) {
        this.dispatchEvent(new CustomEvent('next'));
    }
}