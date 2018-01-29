import { CustomerProfileModel } from './profileModel';

export const CUSTOMER_PROFILE_INITIAL_STATE: CustomerProfileModel = {
    loaded: false,
    error: false,
    customerData: {
        contactDetails: {
            emailAddresses: {
                personal: '',
                work: ''
            },
            postalAddress: {
                line1: '',
                line2: '',
                line3: '',
                line4: '',
                postcode: ''
            },
            telephoneNumbers: {
                home: '',
                mobile: '',
                work: ''
            },
            skills: {
                title: ''
            },
            comments: {
                content: ''
            }
        },
        personalDetails: {
            dateOfBirth: '',
            forename: '',
            gender: '',
            isMarketableTo: true,
            isMarketableToUpdating: false,
            isMarketableToUpdateFailure: false,
            isMarketableToUpdateSuccess: false,
            maritalStatus: '',
            maritalStatusUpdating: false,
            maritalStatusUpdateFailure: false,
            maritalStatusUpdateSuccess: false,
            nationalInsuranceNumber: '',
            printPreference: '',
            printPreferenceUpdating: false,
            printPreferenceUpdateFailure: false,
            printPreferenceUpdateSuccess: false,
            surname: '',
            title: ''
        }
    }
};
