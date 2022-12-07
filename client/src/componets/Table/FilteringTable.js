import React, { useParams, useQuery, useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";
//data
import { QUERY_SCHOOL } from "../../utils/queries";

import { COLUMNS } from "./columns.js";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

function Students() {
	let { id } = useParams();
	const { loading, error, data } = useQuery(QUERY_SCHOOL, {
		variables: { _id: id },
	});

	const school = data?.school || [];

	const students = data?.school.students || [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// alphabetizes the Students roster
	const studentsForSort = [...students];
}

// export const FilteringTable = () => {
// 	const columns = useMemo(() => COLUMNS, []);
// 	const data = useMemo(() => STUDENT_DATA, []);

// 	const defaultColumn = useMemo(() => {
// 		return {
// 			Filter: ColumnFilter,
// 		};
// 	}, []);

// 	const {
// 		getTableProps,
// 		getTableBodyProps,
// 		headerGroups,
// 		footerGroups,
// 		rows,
// 		prepareRow,
// 		state,
// 		setGlobalFilter,
// 	} = useTable(
// 		{
// 			columns,
// 			data,
// 			defaultColumn,
// 		},
// 		useFilters,
// 		useGlobalFilter
// 	);

// 	const { globalFilter } = state;

// 	return (
// 		<>
// 			<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

// 			<table {...getTableProps()}>
// 				<thead>
// 					{headerGroups.map((headerGroup) => (
// 						<tr {...headerGroup.getHeaderGroupProps()}>
// 							{headerGroup.headers.map((column) => (
// 								<th {...column.getHeaderProps()}>
// 									{column.render("Header")}
// 									<div>{column.canFilter ? column.render("Filter") : null}</div>
// 								</th>
// 							))}
// 						</tr>
// 					))}
// 				</thead>
// 				<tbody {...getTableBodyProps()}>
// 					{rows.map((row) => {
// 						prepareRow(row);
// 						return (
// 							<tr {...row.getRowProps()}>
// 								{row.cells.map((cell) => {
// 									return (
// 										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
// 									);
// 								})}
// 							</tr>
// 						);
// 					})}
// 				</tbody>
// 				<tfoot>
// 					{footerGroups.map((footerGroup) => (
// 						<tr {...footerGroup.getFooterGroupProps()}>
// 							{footerGroup.headers.map((column) => (
// 								<td {...column.getFooterProps}>{column.render("Footer")}</td>
// 							))}
// 						</tr>
// 					))}
// 				</tfoot>
// 			</table>
// 		</>
// 	);
// };
