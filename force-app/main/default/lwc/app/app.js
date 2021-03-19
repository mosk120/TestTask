import { LightningElement, track, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { deleteRecord } from "lightning/uiRecordApi";
import getAccounts from "@salesforce/apex/AccountController.getAccounts";
import searchAccounts from "@salesforce/apex/AccountController.searchAccounts";

export default class App extends NavigationMixin(LightningElement) {
  @track accounts;
  sortBy = "Name";
  sortDirection = "asc";
  error;
  offset = 0;
  prevOffset = 0;
  limit = 10;
  showModal = false;
  searchKey = "";
  wiredAccountsResult;
  @wire(getAccounts, {
    offset: "$offset",
    cap: "$limit",
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
      this.showErrorToast();
    }
  }

  showErrorToast() {
    const evt = new ShowToastEvent({
      title: "Error deleting record",
      message: "Error",
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
      .catch(() => {
        this.showErrorToast();
      });
  }

  handleKeyChange(event) {
    this.searchKey = event.target.value;
  }

  handleSearch() {
    searchAccounts({ searchKey: this.searchKey })
      .then((result) => {
        this.accounts = result;
      })
      .catch(() => {
        this.error = this.showErrorToast();
      });
  }

  closeModal() {
    this.showModal = false;
  }

  showModalPopup() {
    this.showModal = true;
  }
}
