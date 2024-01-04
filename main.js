function main() {

    const Observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("left")) {
                    entry.target.classList.add('leftFadeIn');
                    Observer.unobserve(entry.target);
                } else if (entry.target.classList.contains("right")) {
                    entry.target.classList.add('rightFadeIn');
                    Observer.unobserve(entry.target);
                }
            }
        })
    }, { threshold: 0.4 })

    function showAndScrollToSection(sectionID) {
        const section = document.querySelector(sectionID)
        section.classList.remove("hidden")
        section.scrollIntoView({
            behavior: "smooth",
        });
    }

    function startSectionAnimating(sectionID) {
        document.querySelectorAll(`${sectionID} > .price-list > .left, ${sectionID} > .price-list > .right`).forEach((element) => {
            Observer.observe(element)
        })
    }

    function hideSection(sectionID) {
        const sectionElement = document.querySelector(sectionID)
        sectionElement.classList.add("hidden")
    }

    function resetAnimations(sectionID) {
        document.querySelectorAll(`${sectionID} > .price-list > .left, ${sectionID} > .price-list > .right`)
        .forEach((element) => {
            if (element.classList.contains("left")) {
                element.classList.remove('leftFadeIn');
            } else if (element.classList.contains("right")) {
                element.classList.remove('rightFadeIn');
            }
        })
    }

    // If page got ed on section 
    if (window.location.hash) {
        const sectionID = window.location.hash;
        showAndScrollToSection(sectionID)
        startSectionAnimating(sectionID)
    }

    function getCurrentHash() {
        return window.location.hash
    }

    // HashChange event

    var lastHash
    var currentHash = getCurrentHash()

    window.addEventListener("hashchange", (event) => {
        lastHash = currentHash;
        currentHash = getCurrentHash()

        const sectionID = window.location.hash;
        const oldSectionId = lastHash
        
        const MainToSection = !lastHash && currentHash
        const SectionToSection = lastHash && currentHash
        const SectiontoMain = lastHash && !currentHash

        if (MainToSection) {
            console.log("Main to Section")
            showAndScrollToSection(sectionID)
            startSectionAnimating(sectionID)
        } else if (SectionToSection) {
            console.log("Section to Section")
            showAndScrollToSection(sectionID)
            startSectionAnimating(sectionID)
            hideSection(lastHash)
            resetAnimations(oldSectionId)
        } else if (SectiontoMain) {
            console.log("Section to Main")
            resetAnimations(oldSectionId)
        }
    })

    // Scroll event

    window.addEventListener("scroll", () => {
        const sectionID = window.location.hash
        if (window.scrollY == 0 && window.location.hash) {
            hideSection(sectionID)
            history.replaceState("", document.title, window.location.pathname + window.location.search);

            window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
    })

    // Modals
    var modal = document.getElementById("modal1");
    var modalClose = document.getElementById("modal1Close")
    var modalContentImg = document.getElementById("modal1Img")
    var modalText = document.getElementById("modal1Text")

    var modalSection

    document.querySelectorAll(".price > img").forEach(element => {
        element.addEventListener("click", event => {
            modal.classList.remove("hidden")
            modalContentImg.src = event.target.src
            modalText.innerHTML = event.target.alt

            
            document.querySelector("body").style.overflow = "hidden"
            // modalSection = event.target.parentNode.parentNode.parentNode.id
        })
    })

    modalClose.addEventListener("click", event => {
        modal.classList.add("hidden")
        document.querySelector("body").style.overflow = "auto"
    })

    document.addEventListener("keydown", event => {
        if (!modal.classList.contains("hidden") && event.code === "Escape") {
            modal.classList.add("hidden")
            document.querySelector("body").style.overflow = "auto"
        }
    })
    
}