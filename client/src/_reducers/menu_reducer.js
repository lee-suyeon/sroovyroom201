import { 
  TOGGLE_SIDE_NAV
} from '../_actions/menu_action';

const initailState = {
  showSideNav: false
}

export default function (state = initailState, action) {
  switch (action.type) {
    case TOGGLE_SIDE_NAV:
      return { ...state, showSideNav: !state.showSideNav }
      break;
    default:
      return state;
  }
}