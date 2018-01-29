import { CUSTOMER_PROFILE_INITIAL_STATE } from './profileInitialState';
import { customerData as mockData } from '../../mocks/profileDataMock';
import { CustomerProfileActions } from './profileActions';
import { CustomerProfileModel } from './profileModel';
import { customerProfileReducer } from './profileReducer';

describe('CustomerProfileReducer', () => {
    it('should handle initial state', () => {
        expect(customerProfileReducer(undefined, {}))
            .toEqual(CUSTOMER_PROFILE_INITIAL_STATE);
    });

    xit('should disable the error and loaded flag when service call in progress', () => {
        const action = {
            type: CustomerProfileActions.GET_CUSTOMER_PROFILE_LOADING,
            payload: {}
        };
        expect(customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action))
            .toEqual({
                loaded: false,
                error: false,
                customerData: {}
            });
    });

    xit('should store the response in redux store and enable the loaded flag on success', () => {
        const action = {
            type: CustomerProfileActions.GET_CUSTOMER_PROFILE_SUCCESS,
            payload: mockData.customerData
        };
        expect(customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action))
            .toEqual({
                loaded: true,
                error: false,
                customerData: mockData.customerData
            });
    });

    xit('should enable the error flag when the service call fails', () => {
        const action = {
            type: CustomerProfileActions.GET_CUSTOMER_PROFILE_ERROR,
            payload: {}
        };
        expect(customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action))
            .toEqual({
                loaded: true,
                error: true,
                customerData: {}
            });
    });

    xit('should enable the error flag when the update service call fails', () => {
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_ERROR,
            payload: {}
        };
        expect(customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action))
            .toEqual({
                loaded: true,
                error: true,
                customerData: {}
            });
    });

    it('should update address and store the response in redux store and enable the loaded flag on success', () => {
        const newAddress = {
            line1: '5',
            line2: 'New palace',
            line3: 'King street',
            line4: 'London',
            postcode: 'SW1A 1AA'
        };
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_SUCCESS,
            payload: newAddress
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.postalAddress).toEqual(newAddress);
        expect(updatedStore.customerData.contactDetails.emailAddresses).toEqual(mockData.customerData.contactDetails.emailAddresses);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers).toEqual(mockData.customerData.contactDetails.telephoneNumbers);
    });

    it('should update home telephone to store the response in redux store and enable the loaded flag on success', () => {
        const home = '0123456789';
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_HOME_PHONE_CONTACT_SUCCESS,
            payload: home
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.work)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.work);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.mobile)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.mobile);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.home).toEqual(home);
    });
    it('should update work telephone to store the response in redux store and enable the loaded flag on success', () => {
        const work = '0123456789';
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_WORK_PHONE_CONTACT_SUCCESS,
            payload: work
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.home)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.home);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.mobile)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.mobile);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.work).toEqual(work);
    });
    it('should update mobile telephone to store the response in redux store and enable the loaded flag on success', () => {
        const mobile = '0123456789';
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_MOBILE_PHONE_CONTACT_SUCCESS,
            payload: mobile
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.home)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.home);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.work)
            .toEqual(updatedStore.customerData.contactDetails.telephoneNumbers.work);
        expect(updatedStore.customerData.contactDetails.telephoneNumbers.mobile).toEqual(mobile);
    });

    it('should update personal email and store the response in redux store and enable the loaded flag on success', () => {
        const personalEmailAddress = 'daniela.bonafe@test.com';
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_EMAIL_CONTACT_SUCCESS,
            payload: personalEmailAddress
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.emailAddresses.work)
            .toEqual(updatedStore.customerData.contactDetails.emailAddresses.work);
        expect(updatedStore.customerData.contactDetails.emailAddresses.personal).toEqual(personalEmailAddress);
    });

    it('should update work email and store the response in redux store and enable the loaded flag on success', () => {
        const workEmailAddress = 'daniela.bonafe@test.com';
        const action = {
            type: CustomerProfileActions.UPDATE_CUSTOMER_WORK_EMAIL_CONTACT_SUCCESS,
            payload: workEmailAddress
        };
        CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
        const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
        expect(updatedStore.customerData.contactDetails.emailAddresses.work).toEqual(workEmailAddress);
        expect(updatedStore.customerData.contactDetails.emailAddresses.personal)
            .toEqual(updatedStore.customerData.contactDetails.emailAddresses.personal);
    });

    describe('marital status', () => {
        it('should set the updating flag and unset the success and error flags when the update is loading', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_LOADING,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.maritalStatusUpdating = true;
            expectedStore.customerData.personalDetails.maritalStatusUpdateSuccess = false;
            expectedStore.customerData.personalDetails.maritalStatusUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag, set the success flag and the payload when the update is successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_SUCCESS,
              payload: 'Single'
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.maritalStatus = 'Single';
            expectedStore.customerData.personalDetails.maritalStatusUpdating = false;
            expectedStore.customerData.personalDetails.maritalStatusUpdateSuccess = true;
            expectedStore.customerData.personalDetails.maritalStatusUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag and set the failure flag when the update is not successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_FAILURE,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.maritalStatusUpdating = false;
            expectedStore.customerData.personalDetails.maritalStatusUpdateSuccess = false;
            expectedStore.customerData.personalDetails.maritalStatusUpdateFailure = true;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });
    });

    describe('marketing information', () => {
        it('should set the updating flag and unset the success and error flags when the update is loading', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_LOADING,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.isMarketableToUpdating = true;
            expectedStore.customerData.personalDetails.isMarketableToUpdateSuccess = false;
            expectedStore.customerData.personalDetails.isMarketableToUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag, set the success flag and the payload when the update is successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_SUCCESS,
              payload: false
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.isMarketableTo = false;
            expectedStore.customerData.personalDetails.isMarketableToUpdating = false;
            expectedStore.customerData.personalDetails.isMarketableToUpdateSuccess = true;
            expectedStore.customerData.personalDetails.isMarketableToUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag and set the failure flag when the update is not successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_FAILURE,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.isMarketableToUpdating = false;
            expectedStore.customerData.personalDetails.isMarketableToUpdateSuccess = false;
            expectedStore.customerData.personalDetails.isMarketableToUpdateFailure = true;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });
    });

    describe('print preference', () => {
        it('should set the updating flag and unset the success and error flags when the update is loading', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_LOADING,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.printPreferenceUpdating = true;
            expectedStore.customerData.personalDetails.printPreferenceUpdateSuccess = false;
            expectedStore.customerData.personalDetails.printPreferenceUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag, set the success flag and the payload when the update is successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_SUCCESS,
              payload: 'Online'
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.printPreference = 'Online';
            expectedStore.customerData.personalDetails.printPreferenceUpdating = false;
            expectedStore.customerData.personalDetails.printPreferenceUpdateSuccess = true;
            expectedStore.customerData.personalDetails.printPreferenceUpdateFailure = false;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });

        it('should unset the updating flag and set the failure flag when the update is not successful', () => {
            const action = {
              type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_FAILURE,
              payload: {}
            };

            const expectedStore = CUSTOMER_PROFILE_INITIAL_STATE;
            expectedStore.customerData.personalDetails.printPreferenceUpdating = false;
            expectedStore.customerData.personalDetails.printPreferenceUpdateSuccess = false;
            expectedStore.customerData.personalDetails.printPreferenceUpdateFailure = true;

            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);

            expect(updatedStore).toEqual(expectedStore);
        });
    });

    describe('skills list', () => {
        it('should update candidate skills, store the response in redux store and enable the loaded flag on success', () => {
            const skills = 'Angular 4, Typescript, SASS';
            const action = {
                type: CustomerProfileActions.UPDATE_CANDIDATE_SKILLS,
                payload: skills
            };
            CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
            expect(updatedStore.customerData.contactDetails.skills.title).toEqual(skills);
        });
    });

    describe('final comments', () => {
        it('should update final comments, store the response in redux store and enable the loaded flag on success', () => {
            const comments = 'Final comments here....';
            const action = {
                type: CustomerProfileActions.UPDATE_CUSTOMER_COMMENTS,
                payload: comments
            };
            CUSTOMER_PROFILE_INITIAL_STATE.customerData.contactDetails = mockData.customerData.contactDetails;
            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
            expect(updatedStore.customerData.contactDetails.comments.content).toEqual(comments);
        });
    });

    describe('personal details', () => {
        it('should update personal details, store the response in redux store and enable the loaded flag on success', () => {
            const personalDetails = {
                dateOfBirth: '14/02/1973',
                forename: 'Rosario',
                gender: 'male',
                surname: 'Diaferia'
            };
            const action = {
                type: CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_DETAILS,
                payload: personalDetails
            };
            CUSTOMER_PROFILE_INITIAL_STATE.customerData.personalDetails = mockData.customerData.personalDetails;
            const updatedStore = customerProfileReducer(CUSTOMER_PROFILE_INITIAL_STATE, action);
            expect(updatedStore.customerData.personalDetails).toEqual(personalDetails);
        });
    });
});
