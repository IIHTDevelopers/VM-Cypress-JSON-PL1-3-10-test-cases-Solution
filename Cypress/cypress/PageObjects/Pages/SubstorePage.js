import path from "path";

export default class SubstorePage {

  constructor() {
    this.substore = {
      substoreLink: 'a[href="#/WardSupply"]',
      selectSubstore: '(//span[@class="report-name"])[1]',
      inventoryRequisition: 'a[href="#/WardSupply/Inventory/InventoryRequisitionList"]',
      consumption: 'a[href="#/WardSupply/Inventory/Consumption"]',
      reports: 'a[href="#/WardSupply/Inventory/Reports"]',
      patientConsumption: 'a[href="#/WardSupply/Inventory/PatientConsumption"]',
      return: 'a[href="#/WardSupply/Inventory/Return"]',
      inventory: 'ul.page-breadcrumb a[href="#/WardSupply/Inventory"]',
      signoutCursor: 'i.fa-sign-out',
      tooltip: 'div.modal-content h6',
    };
  }

  /**
   * @Test6
   * @description This method navigates to the Inventory Requisition section, captures a screenshot of the page, 
   *              and saves it in the screenshots folder.
   * @expected
   * Screenshot of the page is captured and saved successfully.
   */
  captureInventoryRequisitionScreenshot() {
    // Write your logic here
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshotPath = `../../screenshots/inventory-requisition-${timestamp}.png`;
    // const screenshotPath = path.join(__dirname, `../screenshots/inventory-requisition-${timestamp}.png`);

    // Step 1: Click on the "Substore" link
    cy.get(this.substore.substoreLink).click();

    // Step 2: Select the substore
    cy.xpath(this.substore.selectSubstore).click();

    // Step 3: Click on the "Inventory" tab
    cy.get(this.substore.inventory).click();

    // Step 4: Click on the "Inventory Requisition" section
    cy.xpath(this.substore.inventoryRequisition).click();
    cy.url().should('contain', "Inventory/InventoryRequisitionList");

    // Step 5: Take a screenshot of the current page
    cy.screenshot(screenshotPath, { capture: 'fullPage' });
  }
}
