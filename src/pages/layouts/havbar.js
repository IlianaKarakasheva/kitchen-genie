export default function Navbar() {
    return (
        <header>
        <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container">
            <a href="/" class="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"></svg>
                <strong>KitchenGenie</strong>
            </a>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        <a href="login" class="navbar-link">
                            <button>login</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </header>
    )
}  