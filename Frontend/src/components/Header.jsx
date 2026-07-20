import "./Header.css";

function Header({ hasSidebar = false }) {
    return (
        <header className="header">
            <div className="header-container">

                {/* Menu */}
                <div className="header-menu">
                    <span>Destinations</span>
                    <span>Familles</span>
                    <span>Professionnels</span>
                </div>

                {/* Logo */}
                <img
                    src="/images/logo-adagio.png"
                    alt="Adagio Aparthotel"
                    className="header-logo"
                />

                {/* Bouton */}
                <button className="header-account">
                    Mon compte
                </button>

            </div>
        </header>
    );
}

export default Header;