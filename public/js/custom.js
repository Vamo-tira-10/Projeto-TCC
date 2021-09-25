window.addEventListener('load', () => {
    const body = document.querySelector('body')
    body.style.display = 'block'
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target
                const $target = document.getElementById(target)

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active')
                $target.classList.toggle('is-active')

            })
        })
    }

    window.sr = ScrollReveal()

    sr.reveal('.hero-body', {
        origin: 'left',
        distance: '40px'
    })

    sr.reveal('.card', {
        origin: 'left',
        distance: '40px',
        viewFactor: 0.3
    })

    sr.reveal('.form', {
        origin: 'left',
        distance: '40px',
        viewFactor: 0.7
    })

    sr.reveal('.level', {
        origin: 'left',
        distance: '40px',
        viewFactor: 0.7
    })

    sr.reveal('.table', {
        origin: 'left',
        distance: '40px',
        viewFactor: 0.7
    })
})