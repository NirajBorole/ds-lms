import { useContext } from 'react';
import { UserContext } from '../Context';
import { Navigate, Outlet } from 'react-router-dom';


export const ProtectedRoute = () => {
    const [state] = useContext(UserContext)

    if (state.loading) return <div>Wait here</div>;
    return state.data ? <Outlet /> : <Navigate to='/' />;
}