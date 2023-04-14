import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const signOut = async () => {
    await logout();
    router.push("/signin");
  };

  return (
    <header className="navbar shadow-sm d-flex flex-wrap">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <strong>
            <i className="bi bi-egg-fried me-2"></i>KitchenGenie
          </strong>
        </Link>
        <ul className=" navbar-nav">
          <li className="navbar-item">
            <Link href="/" className="navbar-link">
              HOME
            </Link>
            <Link href="/about" className="navbar-link">
              ABOUT
            </Link>
          </li>
        </ul>
        <ul className=" navbar-nav">
          <li className="navbar-item">
            {user ? (
              <>
                <Link href="#" className="navbar-link me-2">
                  {user.email}
                </Link>
                <button className="btn btn-sm btn-secondary" onClick={signOut}>
                  <b>Logout</b>
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-sm btn-secondary me-2">
                  <b>Sign In</b>
                </Link>
                <Link href="/signup" className="btn btn-sm btn-secondary">
                  <b>Register</b>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
