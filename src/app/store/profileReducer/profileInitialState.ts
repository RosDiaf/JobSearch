import { CustomerProfileModel } from './profileModel';

export const CUSTOMER_PROFILE_INITIAL_STATE: CustomerProfileModel = {
    loaded: false,
    error: false,
    customerData: {
        userAccoutDetails: {
            userEmailAddresses: {
                userPersonal: 'rosdiaf@aol.com',
                userWork: '',
            },
            postalAddress: {
                line1: '311 Maidstone Road',
                line2: 'London',
                line3: 'UK',
                line4: '',
                postcode: 'N22 2TS'
            },
            telephoneNumbers: {
                home: '020822233329',
                mobile: '07922383177',
                work: ''
            },
            personalDetails: {
                dateOfBirth: '14 Feb 1973',
                forename: 'Rosario',
                gender: 'male',
                surname: 'Diaferia',
                title: ''
            }
        },
        contactDetails: {
            emailAddresses: {
                personal: '',
                work: '',
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
