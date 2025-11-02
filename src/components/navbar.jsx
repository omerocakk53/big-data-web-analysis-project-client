import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <ul className="flex items-center justify-start gap-4">
      <li>
        <Link className="text-white hover:text-blue-400" to="/">
          Anasayfa
        </Link>
      </li>
      <li>
        <Link className="text-white hover:text-blue-400" to="/table">
          Tablo
        </Link>
      </li>
      <li>
        <Link className="text-white hover:text-blue-400" to="/graph">
          Analiz Grafikleri
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
