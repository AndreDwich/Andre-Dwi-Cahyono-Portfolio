import { portfolioData } from "./data.js";
import { initMotion } from "./motion.js";
import { initNavigation } from "./navigation.js";

function renderCommandPalette() {
  const commands = portfolioData.commands.map(command => `
    <button class="command-item" type="button" data-target="${command.action}">
      <span>${command.label}</span><kbd>${command.key}</kbd>
    </button>
  `).join("");

  document.body.insertAdjacentHTML("beforeend", `
    <div class="command-palette" aria-hidden="true">
      <div class="command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div class="command-search"><span>⌘</span><input type="search" placeholder="Jump to a section..." aria-label="Search sections"></div>
        <div class="command-list">${commands}</div>
        <div class="command-hint"><span>ESC</span> to close <span>⌘ K</span> to open</div>
      </div>
    </div>
  `);
}

function initCodeTabs() {
  const codeWindow = document.querySelector(".code-window");
  if (!codeWindow) return;
  const fileName = codeWindow.querySelector(".code-file-name");
  const code = codeWindow.querySelector("code");
  const tabs = codeWindow.querySelectorAll("[data-code-tab]");

  const highlight = value => value
    .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>')
    .replace(/\b(async|function|const|await|return|export|default|new)\b/g, '<span class="code-keyword">$1</span>')
    .replace(/("[^"\n]*")/g, '<span class="code-string">$1</span>');

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const selected = portfolioData.stackTabs[tab.dataset.codeTab];
      tabs.forEach(item => item.classList.toggle("active", item === tab));
      fileName.textContent = selected.file;
      code.innerHTML = highlight(selected.code);
    });
  });
}

function initProjectFilters() {
  const buttons = document.querySelectorAll("[data-project-filter]");
  const projects = document.querySelectorAll("[data-project-category]");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.projectFilter;
      buttons.forEach(item => item.classList.toggle("active", item === button));
      projects.forEach(project => {
        const visible = filter === "all" || project.dataset.projectCategory === filter;
        project.classList.toggle("is-hidden", !visible);
      });
    });
  });
}

renderCommandPalette();
initNavigation();
initMotion();
initCodeTabs();
initProjectFilters();
