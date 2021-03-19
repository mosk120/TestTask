import { LightningElement, api } from "lwc";

export default class ModalWindow extends LightningElement {
  @api showModal;

  handlePositive() {
    this.dispatchEvent(new CustomEvent("positive"));
  }

  handleNegative() {
    this.dispatchEvent(new CustomEvent("negative"));
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }
}
