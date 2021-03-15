import { LightningElement, track, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import getAccountList from '@salesforce/apex/ContactController.getAccountList';
import findContacts from '@salesforce/apex/ContactController.findAccounts';

export default class ApexImperativeMethod extends NavigationMixin(LightningElement) {
    // track data;
    @track accounts;
    @track error;
    @track tableLoadingState = false;
    @track offset=0;
    @track Prevoffset=0;
    @track limit = 10;
    @track showModal = false;
    @track showNegativeButton;
    @track showPositiveButton = true;
    @track positiveButtonLabel = 'Close';
    searchKey = '';
    wiredAccountsResult;
    @wire(getAccountList, { offset: '$offset', l : '$limit' })
    accounts(result) {
        this.tableLoadingState = false;
        this.wiredAccountsResult = result;
        if (result.data) {
            this.accounts = result.data;
            this.error = undefined;
            if(this.accounts.length == 0) {
                this.offset= this.Prevoffset;
            }
        } else if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        }
    }


    handlePrev (_event) {     
        if(this.offset - this.limit >=0) {
            this.tableLoadingState = true;
            this.Prevoffset=this.offset;
            this.offset = this.offset - this.limit;
        }
    }
    handleNext (_event) {
        this.tableLoadingState = true;
        this.Prevoffset=this.offset;
        this.offset = this.offset + this.limit;
    }
    

    allSelected(event) {
        let selectedRows = this.template.querySelectorAll('lightning-input');
        
        for(let i = 0; i < selectedRows.length; i++) {
            if(selectedRows[i].type === 'checkbox') {
                selectedRows[i].checked = event.target.checked;
            }
        }
    }

    sort(e) {
        if(this.sortedColumn === e.currentTarget.dataset.id){
            this.sortedDirection = this.sortedDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedDirection = 'asc';
        }        
        let reverse = this.sortedDirection === 'asc' ? 1 : -1;
        let table = JSON.parse(JSON.stringify(this.accounts));
        table.sort((a,b) => {return a[e.currentTarget.dataset.id] > b[e.currentTarget.dataset.id] ? 1 * reverse : -1 * reverse});
        this.sortedColumn = e.currentTarget.dataset.id;        
        this.accounts = table;
    }  



    navigateToAccount(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.target.value,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }

    deleteAccount(event) {
        const recordId = event.target.dataset.recordid;
        deleteRecord(recordId)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account deleted',
                        variant: 'success'
                    })
                );
                return refreshApex(this.wiredAccountsResult);
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error,
                        variant: 'error'
                    })
                );
            });
    }

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleSearch() {
        findContacts({ searchKey: this.searchKey })
            .then((result) => {
                this.accounts = result;
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.accounts = undefined;
            });
    }

    closeModal() {
        this.showModal = false;
      }
    
      showModalPopup() {
        this.showModal = true;
      }
    

    
    
} 