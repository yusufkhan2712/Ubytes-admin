const initialState = {
	basicInfo: {},
	location: {},
	deliverySettings: {
		timeSlot: {
			Sunday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Monday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Tuesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Wednesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Thursday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Friday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Saturday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] }
		}
	},
	deliveryAreas: {},
	pickup: {
		timeSlot: {
			Sunday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Monday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Tuesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Wednesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Thursday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Friday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Saturday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] }
		}
	},
	dinein: {
		timeSlot: {
			Sunday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Monday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Tuesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Wednesday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Thursday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Friday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] },
			Saturday: { status: false, value: [{ startTime: '01:00', endTime: '03:00' }] }
		}
	},
	step: 7
};

const branchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_BASIC_INFO': {
			const { basicInfo } = action.payload;
			return { ...state, basicInfo: basicInfo };
		}

		case 'SET_BRANCH_LOCATION': {
			const { location } = action.payload;
			return { ...state, location: location };
		}

		case 'SET_DELIVERY_SETTINGS': {
			const { deliverySettings } = action.payload;
			return {
				...state,
				deliverySettings: {
					...state.deliverySettings,
					...deliverySettings
				}
			};
		}

		case 'SET_DELIVERY_AREAS': {
			const { deliveryAreas } = action.payload;
			return { ...state, deliveryAreas };
		}

		case 'SET_PICKUP': {
			const { pickup } = action.payload;
			return { ...state, pickup: { ...state.pickup, ...pickup } };
		}

		case 'SET_DINEIN': {
			const { dinein } = action.payload;
			return { ...state, dinein: { ...state.dinein, ...dinein } };
		}

		// refactor
		case 'SET_STARTTIME_DELIVERY': {
			const { startTime, day } = action.payload;

			return {
				...state,
				deliverySettings: {
					...state.deliverySettings,
					timeSlot: {
						...state.deliverySettings.timeSlot
					}
				}
			};
		}

		// refactor
		case 'SET_ENDTIME_DELIVERY': {
			const { endTime } = action.payload;
			return {
				...state,
				deliverySettings: {
					...state.deliverySettings,
					timeSlot: {
						...state.deliverySettings.timeSlot
						// [day]: arr
					}
				}
			};
		}

		case 'SET_ADD_TIMESLOT_DELIVERY': {
			const { startTime, endTime, day } = action.payload;

			let arr = state.deliverySettings.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				deliverySettings: {
					...state.deliverySettings,
					timeSlot: {
						...state.deliverySettings.timeSlot,
						[day]: {
							...state.deliverySettings.timeSlot[day],
							value: arr
						}
					}
				}
			};
		}

		case 'TOGGLE_DELIVERY_DAY': {
			const { day, value } = action.payload;

			let arr = state.deliverySettings.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				deliverySettings: {
					...state.deliverySettings,
					timeSlot: {
						...state.deliverySettings.timeSlot,
						[day]: {
							...state.deliverySettings.timeSlot[day],
							status: value
						}
					}
				}
			};
		}

		// pickup
		case 'SET_ADD_TIMESLOT_PICKUP': {
			const { startTime, endTime, day } = action.payload;

			let arr = state.pickup.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				pickup: {
					...state.pickup,
					timeSlot: {
						...state.pickup.timeSlot,
						[day]: {
							...state.pickup.timeSlot[day],
							value: arr
						}
					}
				}
			};
		}

		case 'TOGGLE_PICKUP_DAY': {
			const { day, value } = action.payload;

			let arr = state.pickup.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				pickup: {
					...state.pickup,
					timeSlot: {
						...state.pickup.timeSlot,
						[day]: {
							...state.pickup.timeSlot[day],
							status: value
						}
					}
				}
			};
		}

		// dinein
		case 'SET_ADD_TIMESLOT_DINEIN': {
			const { startTime, endTime, day } = action.payload;

			let arr = state.dinein.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				dinein: {
					...state.dinein,
					timeSlot: {
						...state.dinein.timeSlot,
						[day]: {
							...state.dinein.timeSlot[day],
							value: arr
						}
					}
				}
			};
		}

		case 'TOGGLE_DINEIN_DAY': {
			const { day, value } = action.payload;

			let arr = state.dinein.timeSlot[day].value;
			arr.push({
				startTime: '12:44',
				endTime: '12:44'
			});

			return {
				...state,
				dinein: {
					...state.dinein,
					timeSlot: {
						...state.dinein.timeSlot,
						[day]: {
							...state.dinein.timeSlot[day],
							status: value
						}
					}
				}
			};
		}

		case 'SET_ADD_STEP': {
			return { ...state, step: state.step + 1 };
		}

		default:
			return state;
	}
};

export default branchReducer;
