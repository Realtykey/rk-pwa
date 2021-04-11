import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ViewLayout from "../../utils/ViewLayout";

//custom comps
import MatchesList from '../MatchesList.js';
import MatchDetails from '../MatchDetails.js';
import { AuthContext } from "../../Auth";

//redux imports
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { fetchMatchesThunk } from '../../redux';

const MatchView = function () {

    const { currentUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    const fetchMatches = (uid) => dispatch(fetchMatchesThunk(uid));


    const matches = useSelector(state => state.general.matches)
    const { selectedMatch, details } = useSelector(state => state.general)

    useEffect(
        () => {

            //initial fetch
            fetchMatches(currentUser.uid);
            const load = async () => {
                const { app } = await import('../../base');

                //listen changes
                return app.firestore().collection('users').doc(currentUser.uid).collection("matches")
                    .onSnapshot((snapshot) => {
                        fetchMatches(currentUser.uid);
                    });
            }

            const unsubscribe = load();

            return async () => await unsubscribe
        },
        []
    )

    return (
        <ViewLayout 
        list={<MatchesList />} 
        detail={selectedMatch ? <MatchDetails /> : <></>} 
        name="matches" 
        showDetails={details}
        iterable={matches} />
    );
}

export default MatchView;
