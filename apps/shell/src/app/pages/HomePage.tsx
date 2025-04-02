import { Link } from "react-router-dom"

const HomePage = () => {

    return (
        <div>
            <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/pentaho'>Pentaho</Link>
        </li>
      </ul>
        </div>
    )
}

export default HomePage; 