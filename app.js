const app = document.getElementById("app");

function escapeHtml(value){
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

app.innerHTML = `
  <section style="padding:40px;font-family:Arial, Helvetica, sans-serif;">
    <h1 style="color:#006231;">Walton County CIP Project Search</h1>
    <p>Loaded ${wcProjects.length} project(s) from projects.js.</p>

    <div>
      ${wcProjects.map(project => `
        <article style="margin:20px 0;padding:24px;border:1px solid #d1be78;border-radius:18px;">
          <h2>${escapeHtml(project.title)}</h2>
          <p>${escapeHtml(project.description)}</p>
          <strong>${escapeHtml(project.budget)}</strong>
        </article>
      `).join("")}
    </div>
  </section>
`;
