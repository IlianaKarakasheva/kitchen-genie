import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="navbar d-flex flex-wrap">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <strong>
            <i className="bi bi-egg-fried me-2"></i>KitchenGenie
          </strong>
        </Link>
        <div className="text-muted">2023kitchengenie</div>
        <ul className=" navbar-nav">
          <li className="navbar-item">
            <Link href="#" className="navbar-link">
              BACK TO TOP
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
