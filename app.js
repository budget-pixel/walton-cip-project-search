const app = document.getElementById("app");

app.innerHTML = `
  <section style="padding:40px;font-family:Arial, Helvetica, sans-serif;">
    <h1 style="color:#006231;">Walton County CIP Project Search</h1>
    <p>Loaded ${wcProjects.length} project(s) from projects.js.</p>
  </section>
`;
