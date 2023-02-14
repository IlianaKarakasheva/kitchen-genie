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
                        <a href="profile" class="navbar-link">
                            <button class="btn btn-sm btn-outline-secondary">My profile</button>
                        </a>
                        <a href="saved" class="navbar-link">
                            <button class="btn btn-sm btn-outline-secondary">Saved Recipes</button>
                        </a>
                    </li>
                </ul>
                <ul class= " navbar-nav">
                    <li class="navbar-item">
                        <a href="signin" class="navbar-link">
                            <button class="btn btn-sm btn-outline-secondary">Login</button>
                        </a>
                        <a href="signup" class="navbar-link">
                            <button class="btn btn-sm btn-outline-secondary">Register</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        </header>
    )
}  