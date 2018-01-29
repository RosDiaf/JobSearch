import { CustomerProfileModel } from './profileModel';
import { CustomerProfileActions } from './profileActions';
import { CUSTOMER_PROFILE_INITIAL_STATE } from './profileInitialState';

export function customerProfileReducer(state: CustomerProfileModel = CUSTOMER_PROFILE_INITIAL_STATE, action) {
    switch (action.type) {
        case CustomerProfileActions.GET_CUSTOMER_PROFILE_LOADING:
            return {
                ...state,
                loaded: false,
                error: false,
                customerData: action.payload
            };
        case CustomerProfileActions.GET_CUSTOMER_PROFILE_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: {
                  ...state.customerData,
                  contactDetails: {
                    ...state.customerData.contactDetails,
                    ...action.payload.contactDetails
                  },
                  personalDetails: {
                    ...state.customerData.personalDetails,
                    ...action.payload.personalDetails
                  }
                }
            };
        case CustomerProfileActions.GET_CUSTOMER_PROFILE_ERROR:
            return {
                ...state,
                loaded: true,
                error: true,
                customerData: {}
            };
        case CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        postalAddress: action.payload
                    }
                })
            };
        case CustomerProfileActions.UPDATE_CUSTOMER_ADDRESS_ERROR:
            return {
                ...state,
                loaded: true,
                error: true,
                customerData: {}
        };
        case CustomerProfileActions.UPDATE_CUSTOMER_HOME_PHONE_CONTACT_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        telephoneNumbers: {
                            ...state.customerData.contactDetails.telephoneNumbers,
                            home: action.payload
                        }
                    }
                })
            };
        case CustomerProfileActions.UPDATE_CUSTOMER_WORK_PHONE_CONTACT_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        telephoneNumbers: {
                            ...state.customerData.contactDetails.telephoneNumbers,
                            work: action.payload
                        }
                    }
                })
            };
        case CustomerProfileActions.UPDATE_CUSTOMER_MOBILE_PHONE_CONTACT_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        telephoneNumbers: {
                            ...state.customerData.contactDetails.telephoneNumbers,
                            mobile: action.payload
                        }
                    }
                })
            };

        case CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_EMAIL_CONTACT_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        emailAddresses: {
                            ...state.customerData.contactDetails.emailAddresses,
                            personal: action.payload
                        }
                    }
                })
            };

        case CustomerProfileActions.UPDATE_CUSTOMER_WORK_EMAIL_CONTACT_SUCCESS:
            return {
                ...state,
                loaded: true,
                error: false,
                customerData: Object.assign({}, state.customerData, {
                    contactDetails: {
                        ...state.customerData.contactDetails,
                        emailAddresses: {
                            ...state.customerData.contactDetails.emailAddresses,
                            work: action.payload
                        }
                    }
                })
            };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_LOADING:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            maritalStatusUpdating: true,
                            maritalStatusUpdateFailure: false,
                            maritalStatusUpdateSuccess: false
                        },
                    }
                };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_SUCCESS:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            maritalStatus: action.payload,
                            maritalStatusUpdating: false,
                            maritalStatusUpdateFailure: false,
                            maritalStatusUpdateSuccess: true
                        },
                    }
                };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARITAL_STATUS_FAILURE:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            maritalStatusUpdating: false,
                            maritalStatusUpdateFailure: true,
                            maritalStatusUpdateSuccess: false
                        },
                    }
                };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_LOADING:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            isMarketableToUpdating: true,
                            isMarketableToUpdateFailure: false,
                            isMarketableToUpdateSuccess: false
                        },
                    }
                };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_SUCCESS:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            isMarketableTo: action.payload,
                            isMarketableToUpdating: false,
                            isMarketableToUpdateFailure: false,
                            isMarketableToUpdateSuccess: true
                        },
                    }
                };

            case CustomerProfileActions.UPDATE_CUSTOMER_MARKETING_INFORMATION_FAILURE:
                return {
                    ...state,
                    customerData: {
                        ...state.customerData,
                        personalDetails: {
                            ...state.customerData.personalDetails,
                            isMarketableToUpdating: false,
                            isMarketableToUpdateFailure: true,
                            isMarketableToUpdateSuccess: false
                        },
                    }
                };

                case CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_LOADING:
                    return {
                        ...state,
                        customerData: {
                            ...state.customerData,
                            personalDetails: {
                                ...state.customerData.personalDetails,
                                printPreferenceUpdating: true,
                                printPreferenceUpdateFailure: false,
                                printPreferenceUpdateSuccess: false
                            },
                        }
                    };

                case CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_SUCCESS:
                    return {
                        ...state,
                        customerData: {
                            ...state.customerData,
                            personalDetails: {
                                ...state.customerData.personalDetails,
                                printPreference: action.payload,
                                printPreferenceUpdating: false,
                                printPreferenceUpdateFailure: false,
                                printPreferenceUpdateSuccess: true
                            },
                        }
                    };

                case CustomerProfileActions.UPDATE_CUSTOMER_PRINT_PREFERENCE_FAILURE:
                    return {
                        ...state,
                        customerData: {
                            ...state.customerData,
                            personalDetails: {
                                ...state.customerData.personalDetails,
                                printPreferenceUpdating: false,
                                printPreferenceUpdateFailure: true,
                                printPreferenceUpdateSuccess: false
                            },
                        }
                    };

                case CustomerProfileActions.UPDATE_CUSTOMER_PERSONAL_DETAILS:
                    return {
                        ...state,
                        loaded: true,
                        error: false,
                        customerData: Object.assign({}, state.customerData, {
                            personalDetails: action.payload
                        })
                    };

                case CustomerProfileActions.UPDATE_CANDIDATE_SKILLS:
                    return {
                        ...state,
                        customerData: Object.assign({}, state.customerData, {
                            contactDetails: {
                                ...state.customerData.contactDetails,
                                skills: {
                                    ...state.customerData.contactDetails.skills,
                                    title: action.payload
                                }
                            }
                        })
                    };

                case CustomerProfileActions.UPDATE_CUSTOMER_COMMENTS:
                    return {
                        ...state,
                        customerData: Object.assign({}, state.customerData, {
                            contactDetails: {
                                ...state.customerData.contactDetails,
                                comments: {
                                    ...state.customerData.contactDetails.comments,
                                    content: action.payload
                                }
                            }
                        })
                    };
    }
    return state;
}
