const initialState = {
    //properties view (personal area)
    selectedProperty: null,
    properties: [],
    showDetails: false,
}

export const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        //PROP VIEW ACTIONS
        case 'SHOW_DETAILS':
            return {
                ...state,
                showDetails:action.payload
            }
        case 'LOAD_PROPS':
            return {
                ...state,
                properties: action.payload
            }
        case 'RESET_SELECTED':
            return{
                ...state,
                selectedProperty:null
            }
        case 'SELECT_PROP':
            const properties = state.properties.map((prop, index) => {
                //prop seleccionado
                if (index === action.payload.index) {
                    return { ...prop, selected: true }
                }
                //resto de prop
                return {
                    ...prop, selected: false
                }
            }
            );
            return {
                ...state,
                selectedProperty: action.payload.prop,
                properties: properties,
            };
        
        case 'SET_SELECTED_PROPERTY':
            return {
                ...state,
                selectedProperty: action.payload
            }
        default:
            return state;
    }
}

//PropertiesView

export const setPropAction = (prop, index) => { return { type: 'SELECT_PROP', payload: { prop: prop, index: index } } }
const loadPropsAction = (properties) => { return { type: 'LOAD_PROPS', payload: properties } }
//prop view
export const fetchPropsThunk = (uid) => {
    return (dispatch) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        import('./../base').then(
            ({ app }) => {
                app.firestore().collection('properties').where('uid', '==', uid)
                    .get()
                    .then(
                        (snap) => {
                            let properties = [];
                            snap.docs.forEach(
                                (doc, index) => {

                                    let prop = { ...doc.data(), key: doc.id, selected: false };

                                    properties.push(prop);
                                }
                            )
                            dispatch(loadPropsAction(properties));
                            dispatch({ type: 'SET_LOADING', payload: false });

                        }
                    )
            }
        )
    }

}
