const projectsContainer = document.querySelector("#github-projects");
const statusMessage = document.querySelector("#github-status");
const languageFilter = document.querySelector("#language-filter");
const languageColors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    Java: "#b45309",
    HTML: "#c2410c",
    CSS: "#663399",
    C: "#555555",
    "C++": "#00599c",
    "C#": "#68217a",
    ShaderLab: "#245c35",
    Racket: "#9f1d20",
    Prolog: "#78350f"
};

languageFilter.addEventListener("change", () => {
    const selectedLanguage = languageFilter.value;
    const cards = projectsContainer.querySelectorAll(".project-card");
    let visibleCount = 0;

    cards.forEach((card) => {
        const matches =
            selectedLanguage === "" ||
            card.dataset.language === selectedLanguage;

        card.hidden = !matches;

        if (matches) {
            visibleCount++;
        }
    });

    statusMessage.textContent =
        `Showing ${visibleCount} of ${cards.length} repositories`;
});

async function loadProjects() {
    try {
        let repositories = [];
        let page = 1;

        // Load additional pages if there are more than 100 repositories.
        while (true) {
            const response = await fetch(
                `https://api.github.com/users/Lbeenc/repos?sort=updated&direction=desc&per_page=100&page=${page}`
            );

            if (!response.ok) {
                throw new Error(`GitHub request failed: ${response.status}`);
            }

            const results = await response.json();
            repositories.push(...results);

            if (results.length < 100) {
                break;
            }

            page++;
        }
        const languages = [...new Set(
    repositories.map((repo) => repo.language || "Not specified")
)].sort();

languageFilter.replaceChildren(new Option("All languages", ""));

languages.forEach((language) => {
    languageFilter.add(new Option(language, language));
});

languageFilter.disabled = false;

        projectsContainer.replaceChildren();

        repositories.forEach((repo) => {
            const card = document.createElement("article");
            card.className = "project-card";
            card.dataset.language = repo.language || "Not specified";

            const title = document.createElement("h2");
            title.textContent = repo.name;

            const description = document.createElement("p");
            description.textContent =
                repo.description || "No description added yet.";

            const languageName = repo.language || "Not specified";

const language = document.createElement("span");
language.className = "language-badge";
language.textContent = languageName;
language.style.backgroundColor =
    languageColors[languageName] || "#475569";

language.style.color =
    languageName === "JavaScript" ? "#101827" : "#ffffff";
            const link = document.createElement("a");
            link.className = "project-link";
            link.href = repo.html_url;
            link.textContent = "View on GitHub";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            const details = document.createElement("div");
details.className = "project-info";
details.append(title, description, language);

card.append(details, link);
            projectsContainer.appendChild(card);
        });

        statusMessage.textContent = repositories.length
            ? `${repositories.length} public repositories`
            : "No public repositories found.";
    } catch (error) {
        statusMessage.textContent =
            "Couldn't load projects. Please try refreshing later.";
        console.error(error);
    }
}

loadProjects();