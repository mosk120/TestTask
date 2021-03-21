import { LightningElement, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from "lightning/uiRecordApi";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import searchAccounts from "@salesforce/apex/AccountController.searchAccounts";

export default class App extends NavigationMixin(LightningElement) {
  @track accounts;
  error;
  sortBy = "Name";
  sortDirection = "asc";
  offset = 0;
  prevOffset = 0;
  limit = 10;
  showModal = false;
  searchKey = "";
  wiredAccountsResult;
  @wire(getAccounts, {
    offset: "$offset",
    field: "$sortBy",
    sortOrder: "$sortDirection"
  })
  accounts(result) {
    this.wiredAccountsResult = result;
    if (result.data) {
      this.accounts = result.data;
      //it doesn't let pagination to go over limit
      if (this.accounts.length == 0) {
        this.offset = this.prevOffset;
      }
    } else if (result.error) {
      this.showErrorToast(error);
    }
  }

  showErrorToast(msg) {
    const evt = new ShowToastEvent({
      title: 'Error',
      message: msg.body.message,
      variant: "error"
    }); 
    this.dispatchEvent(evt);
  }

  handlePrev() {
    if (this.offset - this.limit >= 0) {
      this.prevOffset = this.offset;
      this.offset = this.offset - this.limit;
    }
  }

  handleNext() {
    this.prevOffset = this.offset;
    this.offset = this.offset + this.limit;
  }

  sort(event) {
    let fieldName = event.currentTarget.dataset.id;
    if (fieldName) {
      this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
    } else {
      this.sortDirection = "asc";
    }
    this.sortBy = fieldName;
    this.sortDirection = sortDirection;
  }

  navigateToAccount(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: event.target.value,
        objectApiName: "Account",
        actionName: "view"
      }
    });
  }

  deleteAccount(event) {
    const recordId = event.target.dataset.recordid;
    deleteRecord(recordId)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Account deleted",
            variant: "success"
          })
        );
        return refreshApex(this.wiredAccountsResult);
      })
      .catch((error) => {
        this.error = this.showErrorToast(error);
      });
  }

  handleKeyChange(event) {
    this.searchKey = event.detail;
  }

  handleSearch() {
    searchAccounts({ searchKey: this.searchKey })
      .then((result) => {
        this.accounts = result;
      })
      .catch((error) => {
        this.error = this.showErrorToast(error);
      });
  }

  closeModal() {
    this.showModal = false;
  }

  showModalPopup() {
    this.showModal = true;
  }
}
