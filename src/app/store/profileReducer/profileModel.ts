export interface CustomerProfileModel {
    loaded: boolean;
    error: boolean;
    customerData: {
        contactDetails: {
            emailAddresses: {
                personal: string,
                work: string
            },
            postalAddress: {
                line1: string,
                line2: string,
                line3: string,
                line4: string,
                postcode: string
            },
            telephoneNumbers: {
                home: string,
                mobile: string,
                work: string
            },
            skills: {
                title: string
            },
            comments: {
                content: string
            }
        },
        personalDetails: {
            dateOfBirth: string,
            forename: string,
            gender: string,
            isMarketableTo: boolean,
            isMarketableToUpdating: boolean,
            isMarketableToUpdateFailure: boolean,
            isMarketableToUpdateSuccess: boolean,
            maritalStatus: string,
            maritalStatusUpdating: boolean,
            maritalStatusUpdateFailure: boolean,
            maritalStatusUpdateSuccess: boolean,
            nationalInsuranceNumber: string,
            printPreference: string,
            printPreferenceUpdating: boolean,
            printPreferenceUpdateFailure: boolean,
            printPreferenceUpdateSuccess: boolean,
            surname: string,
            title: string
        }
    };
}
