import { LightningElement, api } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findAccounts';

export default class ApexImperativeMethodWithParams extends LightningElement {
    @api searchKey = '';
    @api contacts;
    @api error;

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleSearch() {
        findContacts({ searchKey: this.searchKey })
            .then((result) => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.contacts = undefined;
            });
    }
}