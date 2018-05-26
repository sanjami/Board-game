import { CELL_CLICKED } from './actionTypes'


export function cellClicked(position) {
    return {
      type: CELL_CLICKED,
      position
    };
  }