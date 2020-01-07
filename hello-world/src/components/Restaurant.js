
import React, { Component } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';

import '../App.css';


function Restaurant(props) {

  return (
    <TableRow styckyHeader class="tableRow" key={props.name.id}    >
      <TableCell >{props.name.name}</TableCell>
      <TableCell >{props.name.cuisine}</TableCell>

      <TableCell>
        <Fab onClick={() => props.removeRestaurant(props.name)} color="secondary">
          <DeleteIcon fontSize="small" />
        </Fab>

      </TableCell>
    </TableRow>


  );
}

export default Restaurant;


