import {Link} from 'react-router-dom';

const MainPageHeader = () => {
    return (
        <nav className="navbar bg-light mb-2">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                {/* <a className="navbar-brand" href="/"> */}
                <img 
                src={require("../../assets/images/controller.png")}
                alt="Logo" width="30" height="24"
                className="d-inline-block align-text-top" style={{ marginRight: '10px' }} />
                
                Home
                {/* </a> */}
                </Link>
            </div>
           
  {/* <header>
      <h1>WH - Adminsidene til Warehouse-lageret</h1>
      <ul>
          <li><Link to="/">Hjem</Link></li>
          <li><Link to="/game">Game page</Link></li>
          <li><Link to="/delete-orders">Slett ordre</Link></li>
      </ul>
  </header>         */}
</nav>
    )
}

export default MainPageHeader;