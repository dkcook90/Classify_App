import React, { useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddTeacherForm from "./AddTeacherForm";
import "./Teacher.css";
import { QUERY_ALLTEACHERS } from "../../utils/queries";
import { REMOVE_TEACHER } from "../../utils/mutation";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";
import { useTable, useSortBy } from "react-table";
import { COLUMNS } from "./columns.js";
import "./Teacher.css";

function TeachersTable() {
	const { loading, error, data } = useQuery(QUERY_ALLTEACHERS);
	const teachers = data?.teachers || [];
	console.log(data);

	const [removeTeacher] = useMutation(REMOVE_TEACHER);

	const columns = useMemo(() => COLUMNS, []);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		footerGroups,
		rows,
		prepareRow,
	} = useTable(
		{
			columns,
			teachers,
		},
		useSortBy
	);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return;
	// (
	// <table {...getTableProps()}>
	// 	<thead>
	// 		{headerGroups.map((headerGroup) => (
	// 			<tr {...headerGroup.getHeaderGroupProps()}>
	// 				{headerGroup.headers.map((column) => (
	// 					<th {...column.getHeaderProps(column.getSortByToggleProps())}>
	// 						{column.render("Header")}
	// 						<span>
	// 							{column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
	// 						</span>
	// 					</th>
	// 				))}
	// 			</tr>
	// 		))}
	// 	</thead>
	// 	<tbody {...getTableBodyProps()}>
	// 		{rows.map((row) => {
	// 			prepareRow(row);
	// 			return (
	// 				<tr {...row.getRowProps()}>
	// 					{row.cells.map((cell) => {
	// 						return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
	// 					})}
	// 				</tr>
	// 			);
	// 		})}
	// 	</tbody>
	// 	<tfoot>
	// 		{footerGroups.map((footerGroup) => (
	// 			<tr {...footerGroup.getFooterGroupProps()}>
	// 				{footerGroup.headers.map((column) => (
	// 					<td {...column.getFooterProps}>{column.render("Footer")}</td>
	// 				))}
	// 			</tr>
	// 		))}
	// 	</tfoot>
	// </table>
	// );
}

export default TeachersTable;
