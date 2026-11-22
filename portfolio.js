const projectLinks = document.querySelectorAll("[data-project]");
const projects = new Map(
  Array.from(document.querySelectorAll(".project-dialog"), (dialog) => [dialog.id, dialog]),
);

function openProject(dialog) {
  const currentDialog = document.querySelector(".project-dialog[open]");
  if (currentDialog === dialog) return;

  currentDialog?.close();
  dialog.showModal();
}

function showProjectFromHash() {
  const projectId = window.location.hash.slice(1);
  const project = projects.get(projectId === "pulso-arena" ? "prismaframe" : projectId);
  if (project) {
    openProject(project);
  } else {
    document.querySelector(".project-dialog[open]")?.close();
  }
}

function closeProject(dialog) {
  if (window.history.state?.portfolioProject === dialog.id) {
    window.history.back();
  } else {
    window.history.replaceState(null, "", "#projetos");
    dialog.close();
    document.getElementById("projetos").scrollIntoView();
  }
}

for (const link of projectLinks) {
  link.addEventListener("click", (event) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const project = projects.get(link.dataset.project);
    window.history.pushState({ portfolioProject: project.id }, "", link.hash);
    openProject(project);
  });
}

for (const dialog of projects.values()) {
  dialog.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    closeProject(dialog);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProject(dialog);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeProject(dialog);
  });
}

window.addEventListener("hashchange", showProjectFromHash);
showProjectFromHash();
