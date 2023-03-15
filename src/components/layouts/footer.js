import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer class="navbar d-flex flex-wrap">
      <div class="container">
        <Link href="/" class="navbar-brand d-flex align-items-center">
          <strong>
            <i className="bi bi-egg-fried me-2"></i>KitchenGenie
          </strong>
        </Link>
        <div className="text-muted">2023kitchengenie</div>
        <ul class=" navbar-nav">
          <li class="navbar-item">
            <Link href="#" className="navbar-link">
              BACK TO TOP
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
