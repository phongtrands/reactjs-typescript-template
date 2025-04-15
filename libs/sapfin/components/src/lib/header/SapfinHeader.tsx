const SapfinHeader = () => {
    return (
        <div className="sapfin-header">
            <div className="container-fluid header-top d-flex align-items-center justify-content-between">
                <div className="logo d-flex align-items-center">
                    <img src="/assets/logo.png" alt="Logo" height="40" />
                </div>
                <h2 className="main-title text-center mt-2 pb-1 flex-grow-1">Finance Interface</h2>
            </div>
            <div className="container-fluid header-bottom d-flex justify-content-between align-items-center pt-1 pb-1">
                <div className="subtitle">* SAP Portal</div>
                <div className="user-info text-end">
                    Hello <strong>User</strong> | <a href="#">Logout</a>
                </div>
            </div>
        </div>
    )
}

export default SapfinHeader;