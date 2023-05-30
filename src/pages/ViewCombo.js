import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { stableSort, getComparator } from '../utils';
import db, { storage } from '../firebase';
import EnhancedTableHead from '../utils/tableHeader';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	},
	paperModal: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	},
	text: {
		top: '50px',
		position: 'relative',
		left: '-50px'
	},
	button: {
		margin: theme.spacing(1)
	}
}));

const columns = [
	{ field: 'id', headerName: 'S.NO', width: 50 },
	{ field: 'comboName', headerName: 'Combo Name', width: 50 },

	{ field: 'productPrice', headerName: 'Product Price', width: 50 },
	{ field: 'comboItems', headerName: 'Items', width: 50 },

	{ field: 'branch', headerName: 'Branch Name', width: 50 },
	{
		field: '',
		headerName: '',
		width: 260
	}
];

const ViewCombo = ({ history }) => {
	const classes = useStyles();
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);

	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	useEffect(() => {
		getRows();
	}, []);

	const getRows = async () => {
		const data = await db.collection('comboItems').orderBy('comboName').get();
		const dataarr = [];
		data.forEach((element) => {
			let _ = element.data();
			_['merchantName'] = element.data().merchant[0].merchantName;
			_['branchName'] = element.data().branch[0].branchName;
			_['id'] = element.id;
			dataarr.push(_);
		});
		setLoading(false);
		//	console.log(dataarr);
		setList(dataarr);
	};

	const handleRequestSort = (event, property, isNumber) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = list.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, list.length - page * rowsPerPage);

	const deleteMerchant = async (row) => {
		setLoading(true);
		await db.collection('comboItems').doc(row.id).delete();
		// delete logo

		if (row.productImage) {
			await storage.ref('comboImage/' + row.id).delete();
		}

		getRows();
		setLoading(false);
	};

	return (
		<div className='view-merchant-body'>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color='inherit' />
				<div className={classes.text}>Loading</div>
			</Backdrop>
			<Header page='View Merchant'></Header>
			<div className='view-merchant-search-div'>
				<input className='view-merchant-search' placeholder='Search'></input>
				<button>Search</button>{' '}
			</div>
			<div style={{ height: 600, width: '100%', padding: '1%' }}>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
						aria-label='enhanced table'
					>
						<EnhancedTableHead
							headCells={columns}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={list.length}
						/>
						<TableBody>
							{stableSort(list, getComparator(order, orderBy, ['productName']))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.name);
									return (
										<TableRow
											hover
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell>{row.id}</TableCell>
											<TableCell>{row.comboName}</TableCell>

											<TableCell>{row.productPrice}</TableCell>
											<TableCell>{row.comboItems.map(k => k.productName)}</TableCell>
											<TableCell>{row.branchName}</TableCell>
											<TableCell>
												<Button
													variant='contained'
													color='secondary'
													className={classes.button}
													startIcon={<DeleteIcon />}
													onClick={() => deleteMerchant(row)}
												>
													Delete
												</Button>
												<Button
													variant='contained'
													color='primary'
													className={classes.primary}
													startIcon={<EditIcon />}
													onClick={() => history.push(`/edit/combo/${row.id}`)}
												>
													Edit
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[2, 5, 10, 25]}
					component='div'
					count={list.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
};

export default withRouter(ViewCombo);
