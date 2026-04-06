document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("pre > code")
    .forEach((block) => {
      const button = document.createElement("button");
      button.textContent = "Copy";
      button.classList.add("copy-code-button");
      button.type = "button";

      button.addEventListener("click", () => {
        navigator.clipboard
          .writeText(block.textContent)
          .then(() => {
            button.textContent = "Copied!";
            setTimeout(() => {
              button.textContent = "Copy";
            }, 2000);
          })
          .catch((err) => {
            console.error("Copy failed:", err);
          });
      });

      // Insert button at top‑right of the <pre>
      block.parentNode.style.position = "relative";
      block.parentNode.appendChild(button);
    });
});
