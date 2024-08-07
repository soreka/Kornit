import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilterTemplates } from '../../../redux/actions/templateActions';

const TemplatesComponent = () => {
    const dispatch = useDispatch();
    const { regions, machineTypes, clientNames, loading, error } = useSelector((state) => state.templates);

    useEffect(() => {
        dispatch(fetchFilterTemplates());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>

        </div>
    );
};

export default TemplatesComponent;
