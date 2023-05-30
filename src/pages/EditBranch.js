import React from 'react';
import BranchStatus from '../components/branchStatus';
import BasicInfo from '../components/BasicInfo';
import { Switch, Route } from 'react-router-dom';
import BranchLoc from '../components/BranchLoc';
import DeliveryAreas from '../components/delAreas';
import DeliverySettings from '../components/DeliverySettings';
import { useParams } from 'react-router-dom';
import PickUpSettings from '../components/PickUpSettings';
import DineInSettings from '../components/DineInSettings';
import { useSelector } from 'react-redux';

const EditBranch = ({ history, match, ...props }) => {
	// let id = props.location.state ? props.location.state.id : null;
	const state = useSelector((state) => state.branch);
	let edit = true;
	const params = useParams();
	const { id } = params;

	return (
		<div className='add_branch_parent'>
			<div className='add_branch_left'>
				<BranchStatus id={id} edit={true} />
			</div>
			<div className='add_branch_right'>
				<Switch>
					<Route path={'/branch/edit/:id/location'}>
						<BranchLoc id={id} edit={true} />
					</Route>
					<Route path={'/branch/edit/:id/basic/'}>
						<BasicInfo id={id} edit={true} />
					</Route>
					<Route exact path='/branch/edit/:id/delivery-settings'>
						<DeliverySettings id={id} edit={true}></DeliverySettings>
					</Route>
					<Route exact path='/branch/edit/:id/delivery-areas'>
						<DeliveryAreas id={id} edit={true}></DeliveryAreas>
					</Route>
					<Route exact path='/branch/edit/:id/pick-up-settings'>
						<PickUpSettings id={id} edit={true}></PickUpSettings>
					</Route>
					<Route exact path='/branch/edit/:id/dine-in-settings'>
						<DineInSettings id={id} edit={true}></DineInSettings>
					</Route>
				</Switch>
			</div>
		</div>
	);
};

export default EditBranch;
