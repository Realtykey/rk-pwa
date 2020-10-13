const initialState = {
  selectedRequest: null,
  requests: [],
  rdetails: false,
}

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    //PROP VIEW ACTIONS
    case 'LOAD_REQS':
      return {
        ...state,
        requests: action.payload
      }
    case 'REQS_DETAILS':
      return {
        ...state,
        rdetails: !state.rdetails
      }
    case 'SELECT_REQ':
      const requests = state.requests.map((req, index) => {
        //prop seleccionado
        if (index === action.payload.index) {
          return { ...req, selected: true }
        }
        //resto de prop
        return {
          ...req, selected: false
        }
      }
      );
      return {
        ...state,
        selectedRequest: action.payload.req,
        requests: requests,
        rdetails: true
      };
    default:
      return state;
  }
}

//RequestsView

export const setReqAction = (req, index) => { return { type: 'SELECT_REQ', payload: { req: req, index: index } } }
export const reqsDetailsAction = () => { return { type: 'REQS_DETAILS' } }
const loadReqsAction = (requests) => { return { type: 'LOAD_REQS', payload: requests } }

export const fetchReqsThunk = (uid) => {
  return (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    import('./../base').then(
      ({ app }) => {
        
        app.firestore().collection('requests').where('uid', '==', uid)
          .get()
          .then(
            (snap) => {
              let requests = [];
              snap.docs.forEach(
                (doc, index) => {

                  let req = { ...doc.data(), key: doc.id, selected: false };

                  requests.push(req);
                }
              )
              dispatch(loadReqsAction(requests));
              dispatch({ type: 'SET_LOADING', payload: false });

            }
          )
      }
    )
  }

}