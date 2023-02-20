export default function SiteFooter() {
    return (
        <footer class="navbar d-flex flex-wrap">
            <div class="container">
            <a href="/" class="navbar-brand d-flex align-items-center">
                <strong>
                    <i className="bi bi-egg-fried me-2"></i>KitchenGenie</strong>
            </a>
                <ul class= " navbar-nav">
                    <li class="navbar-item">

                        <a href="/" class="navbar-link">
                            HOME
                            </a>
                        <a href="/about" class="navbar-link">
                           ABOUT
                        </a>
                        <a href="/contacts" class="navbar-link">
                           CONTACTS
                        </a>
                    </li>
                
                </ul>
            </div>
   
        </footer>
    )
}  