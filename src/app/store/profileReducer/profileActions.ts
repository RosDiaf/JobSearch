import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { CustomerProfileModel } from './profileModel';

type Payload = CustomerProfileModel[];

@Injectable()
export class CustomerProfileActions {
  static readonly GET_CUSTOMER_PROFILE_LOADING = 'GET_CUSTOMER_PROFILE_LOADING';
  static readonly GET_CUSTOMER_PROFILE_SUCCESS = 'GET_CUSTOMER_PROFILE_SUCCESS';
  static readonly GET_CUSTOMER_PROFILE_ERROR = 'GET_CUSTOMER_PROFILE_ERROR';
  static readonly UPDATE_CUSTOMER_ADDRESS_SUCCESS = 'UPDATE_CUSTOMER_ADDRESS_SUCCESS';
  static readonly UPDATE_CUSTOMER_ADDRESS_ERROR = 'UPDATE_CUSTOMER_ADDRESS_ERROR';
  static readonly UPDATE_CUSTOMER_HOME_PHONE_CONTACT_SUCCESS = 'UPDATE_CUSTOMER_HOME_PHONE_CONTACT_SUCCESS';
  static readonly UPDATE_CUSTOMER_WORK_PHONE_CONTACT_SUCCESS = 'UPDATE_CUSTOMER_WORK_PHONE_CONTACT_SUCCESS';
  static readonly UPDATE_CUSTOMER_MOBILE_PHONE_CONTACT_SUCCESS = 'UPDATE_CUSTOMER_MOBILE_PHONE_CONTACT_SUCCESS';
  static readonly UPDATE_CUSTOMER_PERSONAL_EMAIL_CONTACT_SUCCESS = 'UPDATE_CUSTOMER_PERSONAL_EMAIL_CONTACT_SUCCESS';
  static readonly UPDATE_CUSTOMER_WORK_EMAIL_CONTACT_SUCCESS = 'UPDATE_CUSTOMER_WORK_EMAIL_CONTACT_SUCCESS';
  static readonly UPDATE_CUSTOMER_MARITAL_STATUS_LOADING = 'UPDATE_CUSTOMER_MARITAL_STATUS_LOADING';
  static readonly UPDATE_CUSTOMER_MARITAL_STATUS_SUCCESS = 'UPDATE_CUSTOMER_MARITAL_STATUS_SUCCESS';
  static readonly UPDATE_CUSTOMER_MARITAL_STATUS_FAILURE = 'UPDATE_CUSTOMER_MARITAL_STATUS_FAILURE';
  static readonly UPDATE_CUSTOMER_MARKETING_INFORMATION_LOADING = 'UPDATE_CUSTOMER_MARKETING_INFORMATION_LOADING';
  static readonly UPDATE_CUSTOMER_MARKETING_INFORMATION_SUCCESS = 'UPDATE_CUSTOMER_MARKETING_INFORMATION_SUCCESS';
  static readonly UPDATE_CUSTOMER_MARKETING_INFORMATION_FAILURE = 'UPDATE_CUSTOMER_MARKETING_INFORMATION_FAILURE';
  static readonly UPDATE_CUSTOMER_PRINT_PREFERENCE_LOADING = 'UPDATE_CUSTOMER_PRINT_PREFERENCE_LOADING';
  static readonly UPDATE_CUSTOMER_PRINT_PREFERENCE_SUCCESS = 'UPDATE_CUSTOMER_PRINT_PREFERENCE_SUCCESS';
  static readonly UPDATE_CUSTOMER_PRINT_PREFERENCE_FAILURE = 'UPDATE_CUSTOMER_PRINT_PREFERENCE_FAILURE';
  static readonly UPDATE_CUSTOMER_PERSONAL_DETAILS = 'UPDATE_CUSTOMER_PERSONAL_DETAILS';
  static readonly UPDATE_CUSTOMER_COMMENTS = 'UPDATE_CUSTOMER_COMMENTS';
  static readonly UPDATE_CANDIDATE_SKILLS = 'UPDATE_CANDIDATE_SKILLS';

  @dispatch()
  getCustomerProfileLoading = () => ({
    type: CustomerProfileActions.GET_CUSTOMER_PROFILE_LOADING,
    payload: {},
  })

  @dispatch()
  getCustomerProfileSuccess = (payload) => ({
    type: CustomerProfileActions.GET_CUSTOMER_PROFILE_SUCCESS,
    payload: payload,
  })

  @dispatch()
  getCustomerProfileError = () => ({
    type: CustomerProfileActions.GET_CUSTOMER_PROFILE_ERROR,
    payload: null,
  })

  @dispatch()
  updateCustomerProfile = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateCustomerProfileError = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_ERROR,
    payload: null,
  })

  @dispatch()
  updateContactHomePhoneSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_HOME_PHONE_CONTACT_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateContactWorkPhoneSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_WORK_PHONE_CONTACT_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateContactMobilePhoneSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MOBILE_PHONE_CONTACT_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateContactPersonalEmailSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_EMAIL_CONTACT_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateContactWorkEmailSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_WORK_EMAIL_CONTACT_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateMaritalStatusLoading = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_LOADING,
    payload: {},
  })

  @dispatch()
  updateMaritalStatusSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateMaritalStatusFailure = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_FAILURE,
    payload: {},
  })

  @dispatch()
  updateMarketingInformationLoading = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_LOADING,
    payload: {},
  })

  @dispatch()
  updateMarketingInformationSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updateMarketingInformationFailure = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_FAILURE,
    payload: {},
  })

  @dispatch()
  updatePrintPreferenceLoading = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_LOADING,
    payload: {},
  })

  @dispatch()
  updatePrintPreferenceSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_SUCCESS,
    payload: payload,
  })

  @dispatch()
  updatePrintPreferenceFailure = () => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_FAILURE,
    payload: {},
  })

  @dispatch()
  updatePersonalDetailsSuccess = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_DETAILS,
    payload: payload,
  })

  @dispatch()
  updateCandidateSkills = (payload) => ({
    type: CustomerProfileActions.UPDATE_CANDIDATE_SKILLS,
    payload: payload,
  })

  @dispatch()
  updateFinalComments = (payload) => ({
    type: CustomerProfileActions.UPDATE_CUSTOMER_COMMENTS,
    payload: payload,
  })
}
