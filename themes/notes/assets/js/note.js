const headings = Array.from(document.querySelectorAll("h2, h3"));
const toc = document.getElementById("TableOfContents");
const tocAnchors = toc.querySelectorAll("a");

let options = {
    root: document,
    rootMargin: "0% 0% -95%",
};

function observe(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            tocAnchors.forEach((anchor) => {
                anchor.classList.remove("active");
            });
            const index = headings.indexOf(entry.target);
            tocAnchors[index].classList.add("active");
        }
    });

    console.log("entries");
}

let observer = new IntersectionObserver(observe, options);

headings.forEach((heading) => {
    observer.observe(heading);
});

tocAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
        tocAnchors.forEach((anchor) => {
            anchor.classList.remove("active");
        });
        anchor.classList.add("active");
    });
});
