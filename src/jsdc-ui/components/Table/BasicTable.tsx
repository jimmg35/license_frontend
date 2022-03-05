import React from 'react'
import TableContainer from './TableContainer'
import Table from './Table'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import TableCell from './TableCell'
import { IPropsWithDisplayVarient } from '../../utils/jui-ui-interface'

export type BasicTableBodyRow = any[]
export type BasicTableBody = BasicTableBodyRow[]

export interface IBasicTableProps extends IPropsWithDisplayVarient {
  header?: any[]
  body: BasicTableBody
  headerVarient?: IPropsWithDisplayVarient['varient']
  headerHollow?: IPropsWithDisplayVarient['hollow']
}

const BasicTable = (props: IBasicTableProps) => {
  const {
    header = [],
    body = [[]],
    varient = 'primary',
    hollow = false,
    headerVarient,
    headerHollow
  } = props
  return (
    <TableContainer varient={varient} hollow={hollow}>
      <Table>
        {
          header.length > 0
            ? (
                <TableHeader varient={headerVarient || varient} hollow={headerHollow || hollow}>
                  <TableRow>
                    {
                      header.map((head, index) => (
                        <TableCell varient={varient} hollow={hollow} asHead key={index}>{ head }</TableCell>
                      ))
                    }
                  </TableRow>
                </TableHeader>
              )
            : null
        }
        <TableBody>
          {
            body.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {
                  row.map((item, itemIndex) => (
                    <TableCell varient={varient} hollow={hollow} asHead={itemIndex === 0} key={itemIndex}>{ item }</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
