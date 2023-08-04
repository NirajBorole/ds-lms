import { useContext } from 'react'
import { Navbar, NavItem, NavLink } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context'

function Nav() {
    const [state, setState] = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        setState({ data: null, loading: false, error: null });
        localStorage.removeItem("token");
        navigate('/')
    }

    return (
        // hbjb className="mb-3"
        <Navbar>
            <NavItem>
                <Link className='nav-link' to='/'>
                    Home
                </Link>
            </NavItem>
            {state.data && (
                <NavItem className='ms-auto'>
                    <NavLink onClick={handleLogOut}>
                        Logout
                    </NavLink>
                </NavItem>
            )}

        </Navbar >
    )
}

export default Nav