import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import Picker from './Picker';
import styled from 'styled-components';

const RenderDays = ({
	day,
	timeSlot,
	toggleSwitch,
	addSlot,
	dayData,
	setStartTime,
	setEndTime,
	clearTimeSlot
}) => {
	// const [startTime, setStartTime] = useState('03:00');
	// const [endTime, setEndTime] = useState('06:00');

	const setStartTimePicker = async (startTime, index) => {
		setStartTime(startTime, day, index);
	};

	const setEndTimePicker = async (endTime, index) => {
		setEndTime(endTime, day, index);
	};

	let value = dayData?.value?.length || 1;

	const [count, setCount] = useState(value);

	return (
		<div className='flex flex-wrap mb-3 mx-0'>
			<Row>
				<div className='d-flex align-items-start pr-3' style={{ minWidth: '245px' }}>
					<span className='w-100 my-2 py-1 pr-2'>{day}</span>{' '}
					<Switch
						checked={dayData.status}
						onChange={() => toggleSwitch(day, !dayData.status, dayData.value)}
					/>
				</div>
				{dayData.status ? (
					<>
						<Col className='pl-1'>
							{Array.apply(null, Array(dayData.value.length)).map((item, i) => {
								return (
									<Picker
										key={i}
										index={i}
										day={day}
										timeProps={dayData.value[i]}
										setStartTimePicker={setStartTimePicker}
										setEndTimePicker={setEndTimePicker}
										clearTimeSlot={clearTimeSlot}
										disable={i < count - 1 && count > 1 ? true : false}
									/>
								);
							})}
						</Col>
						<Button
							onClick={(e) => {
								e.preventDefault();
								if (count <= 4) {
									setCount(count + 1);
									addSlot(day);
								}
							}}
							style={{
								margin: 0,
								padding: 0
							}}
							className='w-10'
						>
							<span>
								<AddIcon />
								Add Hours
							</span>
						</Button>
					</>
				) : null}
			</Row>
		</div>
	);
};

const Col = styled.div`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
`;

const Day = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-width: 150px;
	flex-wrap: wrap;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	color: #0bacf8;
`;

export default RenderDays;
