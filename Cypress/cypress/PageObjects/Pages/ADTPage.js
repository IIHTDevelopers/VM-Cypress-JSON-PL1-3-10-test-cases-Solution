import data from "../../fixtures/PatientName.json";

export default class ADTPage {

    constructor() {
        this.ADT = {
            ADTLink: 'a[href="#/ADTMain"]',
            searchBar: "#quickFilterInput",
            admittedPatientsTab: 'ul.page-breadcrumb a[href="#/ADTMain/AdmittedList"]',
            moreOptionsButton: '//button[contains(text(),"...")]',
            changeDoctorOption: 'a[danphe-grid-action="changedr"]',
            changeDoctorModal: 'div.modelbox-div',
            updateButton: '//button[text()="Update"]',
            fieldErrorMessage: '//span[text()="Select doctor from the list."]',
            counterItem: "//div[@class='counter-item']",
        };
    }

    /**
     * @Test7
     * @description This test verifies that the error message "Select doctor from the list." is displayed 
     *              when the user attempts to update the doctor without selecting a value.
     * @expected The error message "Select doctor from the list." is shown near the field.
     */
    verifyFieldLevelErrorMessage() {
        // Write your logic here
        const patientName = data.PatientNames[0].Patient1 || "";

        // Step 1: Click on the "ADT" link
        cy.get(this.ADT.ADTLink).click();

        // Step 2: Select the first counter item if available
        cy.xpath(this.ADT.counterItem)
            .then(($counterItems) => {
                const counterCount = $counterItems.length;
                if (counterCount > 0) {
                    cy.wrap($counterItems.first()).click();
                } else {
                    console.log("No counter items available");
                }
            });

        // Step 3: Navigate to the "Admitted Patients" tab
        cy.get(this.ADT.admittedPatientsTab).click();

        // Step 4: Search for the patient
        cy.get(this.ADT.searchBar).type(patientName, { delay: 100 });
        cy.get(this.ADT.searchBar).type("{enter}");

        // Step 5: Click on the "..." button for the patient
        cy.xpath(this.ADT.moreOptionsButton).click();

        // Step 6: Select "Change Doctor" from the options
        cy.get(this.ADT.changeDoctorOption).click();

        // Step 7: Wait for the "Change Doctor" modal to appear
        cy.get(this.ADT.changeDoctorModal)
            .should("be.visible");

        // Step 8: Click on the "Update" button without selecting a doctor
        cy.xpath(this.ADT.updateButton).click();

        // Step 9: Verify the error message is displayed
        cy.xpath(this.ADT.fieldErrorMessage)
            .should("be.visible")
            .then(($errorMessage) => {
                const errorMessage = $errorMessage.text().trim();
                expect(errorMessage).to.equal("Select doctor from the list.");
            });
    }
}