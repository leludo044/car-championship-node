'use strict';

class DriverValidator {

    constructor() {
    }

    validate(driver) {
        if (driver.dateNaissance == '') {
            driver.dateNaissance = null;
        }
        return true;
    }
}

module.exports = DriverValidator;