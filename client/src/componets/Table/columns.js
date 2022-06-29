import { ColumnFilter } from "./ColumnFilter"

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: '_id',
        disableFilters: true
    },
    {
        Header: 'Name',
        Footer: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Grade',
        Footer: 'Grade',
        accessor: 'grade'
    },
    {
        Header: 'Teacher',
        Footer: 'Teacher',
        accessor: 'teacher'
    },
    {
        Header: 'School',
        Footer: 'School',
        accessor: 'school'
    },
    {
        Header: 'Principal',
        Footer: 'Principal',
        accessor: 'principal'
    },
]