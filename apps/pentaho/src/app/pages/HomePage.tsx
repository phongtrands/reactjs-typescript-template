import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <div>
            <ul>
        <li>
          <Link to='/pentaho'>Pentaho Home</Link>
        </li>
        <li>
          <Link to='/pentaho/product'>Pentaho Product</Link>
        </li>
      </ul>
        </div>
    )
}

export default HomePage;