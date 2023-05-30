export const set_branch_info = (payload) => async (dispatch) => {
	// dispatch({ type: 'SET_BASIC_INFO', payload: payload });
	// return (dispatch) => {
	// 	return new Promise((resolve, reject) => {
	// 		dispatch({
	// 			type: 'SET_BASIC_INFO',
	// 			payload: payload
	// 		});

	// 		resolve();
	// 	});
	// };

	dispatch({ type: 'SET_BASIC_INFO', payload: payload });
	return Promise.resolve();
};

export const set_branch_loc = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_BRANCH_LOCATION', payload: payload });
};

export const set_delivery_settings = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_DELIVERY_SETTINGS', payload: payload });
};

export const set_delivery_areas = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_DELIVERY_AREAS', payload: payload });
};

export const set_pickup = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_PICKUP', payload: payload });
};

export const set_dinein = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_DINEIN', payload: payload });
};

// delivery
export const set_startTime_delivery = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_START_TIME_DELIVERY', payload: payload });
};

export const set_endTime_delivery = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_END_TIME_DELIVERY', payload: payload });
};

export const add_timeSlot_delivery = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_ADD_TIMESLOT_DELIVERY', payload: payload });
};

export const toggle_delivery_day = (payload) => async (dispatch) => {
	dispatch({ type: 'TOGGLE_DELIVERY_DAY', payload: payload });
};

// pickup
export const set_startTime_pickup = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_START_TIME_PICKUP', payload: payload });
};

export const set_endTime_pickup = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_END_TIME_PICKUP', payload: payload });
};

export const add_timeSlot_pickup = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_ADD_TIMESLOT_PICKUP', payload: payload });
};

export const toggle_pickup_day = (payload) => async (dispatch) => {
	dispatch({ type: 'TOGGLE_PICKUP_DAY', payload: payload });
};

// dinein
export const set_startTime_dinein = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_START_TIME_DINEIN', payload: payload });
};

export const set_endTime_dinein = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_END_TIME_DINEIN', payload: payload });
};

export const add_timeSlot_dinein = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_ADD_TIMESLOT_DINEIN', payload: payload });
};

export const toggle_dinein_day = (payload) => async (dispatch) => {
	dispatch({ type: 'TOGGLE_DINEIN_DAY', payload: payload });
};

export const set_add_step = (payload) => async (dispatch) => {
	dispatch({ type: 'SET_ADD_STEP', payload: payload });
};
