const initialState = {
  countSuccess: 0,
  total:0,
  countFail: 0, 
  data: [],
  failReq: [],
  showModal: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "CALL_REQ": {
      const { data } = action;
      debugger;
      return {
        ...state
      };
    }
    case "CALL_REQ_SUCCESS": {
      debugger;
      let data = [];
      let failReq = []
      action.data.forEach(element => {
        if(!element.status) data.push(element);
        else failReq.push(element);
      });
      debugger;
      return {
        ...state,
        countSuccess: state.countSuccess + 1,
        data: [...state.data, ...data],
        failReq : [...failReq],
        countSuccess: data.length,
        countFail: failReq.length,
        total: data.length + failReq.length,

      };
    }
    case "CALL_REQ_FAIL": {
      const { data } = action;
      return {
        ...state,
        failReq: [...state.failReq, data],
        showModal: true
      };
    }
    case "TOGGLE_MODAL": {
      const { data } = action;
      return {
        ...state,
        showModal: data
      };
    }
    default:
      return state;
  }
}
