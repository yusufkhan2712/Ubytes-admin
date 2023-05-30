import React, { useState } from 'react';
import styled from 'styled-components';
// import TimePicker from 'react-times';
import Picker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import ClearIcon from '@material-ui/icons/Clear';

const PickerComponent = ({
	disable,
	setStartTimePicker,
	setEndTimePicker,
	timeProps,
	index,
	clearTimeSlot,
	day
}) => {
	const format = 'h:mm a';
	const now = moment().hour(0).minute(0);

	return (
		<Div>
			{/* <TimePicker
				margin='normal'
				id='time-picker'
				label='Time picker'
				time={startTime}
				disabled={disable}
				onTimeChange={(e) => {
					console.log(e);
					setStartTime(`${e.hour}:${e.minute}`);
					setStartTimePicker(startTime, index);
				}}
				onFocusChange={(e) => {
					console.log(e, 'e:', startTime);
					if (e) {
						setStartTimePicker(startTime, index);
					}
				}}
			/> */}
			<TimePicker
				showSecond={false}
				defaultValue={now}
				value={moment(timeProps.startTime, 'HH:mm A')}
				className='time-picker'
				onChange={(e) => {
					let date = e.format('hh:mm').toString();
					setStartTimePicker(date, index);
				}}
				// format={format}
				inputReadOnly
			/>

			<TimePicker
				showSecond={false}
				defaultValue={now}
				value={moment(timeProps.endTime, 'HH:mm A')}
				className='time-picker'
				onChange={(e) => {
					if (e) {
						let date = e.format('hh:mm').toString();
						setEndTimePicker(date, index);
					}
				}}
				clearIcon={null}
				// format={format}
				inputReadOnly
			/>
			<Button
				onClick={(e) => {
					e.preventDefault();
					clearTimeSlot({ day, index });
				}}
			>
				<ClearIcon />
			</Button>
		</Div>
	);
};

const Div = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	min-width: 300px;
`;

const Icon = styled.span`
	border-radius: 50%;
	height: 4px;
	width: 4px;
	background-color: grey;
	font-size: 8px;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	color: #0bacf8;
`;

// const TimePicker = styled(Picker)`
// 	& .rc-time-picker-panel-select-option-selected {
// 		background-color: #edeffe;
// 		font-weight: normal;
// 	}

// 	& .rc-time-picker-clear,
// 	& .rc-time-picker-clear-icon:after {
// 		font-size: 15px;
// 	}

// 	& .rc-time-picker-panel-select,
// 	& .rc-time-picker-input,
// 	& .rc-time-picker-panel-input {
// 		font-family: 'Consolas', sans-serif;
// 		font-size: 16px;
// 		cursor: pointer;

// 		::-webkit-scrollbar {
// 			width: 0;
// 			height: 0;
// 		}
// 		scrollbar-width: none;
// 	}
// `;

const TimePicker = styled(Picker)`
	& .rc-time-picker-panel-select-option-selected {
		background-color: #edeffe;
		font-weight: normal;
	}

	& .rc-time-picker-clear,
	& .rc-time-picker-clear-icon:after {
		font-size: 15px;
	}

	& .rc-time-picker-panel-select,
	& .rc-time-picker-input,
	& .rc-time-picker-panel-input {
		font-family: 'Consolas', sans-serif;
		font-size: 16px;
		cursor: pointer;

		::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
	}
`;

export default PickerComponent;
