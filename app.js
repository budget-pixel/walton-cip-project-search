const app = document.getElementById("app");

let visibleLimit = 9;

const filters = {
  category: "all",
  year: "all",
  fund: "all",
  search: ""
};

function escapeHtml(value){
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFilteredProjects(){

  return wcProjects.filter(project => {

    const content = [
      project.title,
      project.description,
      project.dept,
      project.category,
      project.category_label,
      project.funding,
      project.target,
      project.district,
      project.status_text
    ].join(" ").toLowerCase();

    const matchesSearch =
      !filters.search ||
      content.includes(filters.search);

    const matchesCategory =
      filters.category === "all" ||
      project.category.toLowerCase().includes(filters.category);

    const matchesYear =
      filters.year === "all" ||
      project.target.toLowerCase().includes(filters.year);

    const matchesFund =
      filters.fund === "all" ||
      project.funding.toLowerCase().includes(filters.fund);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesYear &&
      matchesFund
    );

  });

}

function renderProjects(){

  const filtered = getFilteredProjects();

  const visibleProjects = filtered.slice(0, visibleLimit);

  app.innerHTML = `
    <style>

      *{
        box-sizing:border-box;
      }

      body{
        margin:0;
        background:#f5f7fb;
        font-family:Arial, Helvetica, sans-serif;
      }

      .wc-wrapper{
        width:100%;
        max-width:1600px;
        margin:0 auto;
        padding:50px 24px;
      }

      .wc-header{
        text-align:center;
        margin-bottom:36px;
      }

      .wc-header span{
        display:block;
        color:#006231;
        font-size:13px;
        font-weight:700;
        letter-spacing:.14em;
        text-transform:uppercase;
        margin-bottom:12px;
      }

      .wc-header h1{
        margin:0;
        font-size:44px;
        line-height:1.1;
        color:#172033;
      }

      .wc-header p{
        max-width:950px;
        margin:20px auto 0 auto;
        color:#475467;
        line-height:1.7;
        font-size:16px;
      }

      .wc-toolbar{
        background:#ffffff;
        border-radius:24px;
        padding:24px;
        margin-bottom:28px;
        border:1px solid rgba(0,98,49,.12);
        box-shadow:
          0 12px 28px rgba(0,98,49,.06),
          0 4px 12px rgba(0,0,0,.04);
      }

      .wc-search{
        width:100%;
        height:58px;
        border-radius:16px;
        border:1px solid rgba(0,98,49,.14);
        padding:0 18px;
        font-size:15px;
        outline:none;
        margin-bottom:18px;
      }

      .wc-search:focus{
        border-color:#006231;
      }

      .wc-filter-group{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
      }

      .wc-filter{
        border:none;
        padding:12px 18px;
        border-radius:999px;
        background:#eef2f6;
        cursor:pointer;
        font-size:14px;
        font-weight:700;
        transition:.2s ease;
      }

      .wc-filter.active{
        background:#006231;
        color:#ffffff;
      }

      .wc-results{
        margin-bottom:22px;
        font-size:14px;
        color:#475467;
        font-weight:700;
      }

      .wc-grid{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:24px;
      }

      .wc-card{
        background:#ffffff;
        border-radius:24px;
        padding:28px;
        border:1px solid rgba(0,98,49,.12);
        box-shadow:
          0 12px 24px rgba(0,98,49,.05),
          0 4px 10px rgba(0,0,0,.04);
      }

      .wc-card-top{
        display:flex;
        justify-content:space-between;
        gap:12px;
        margin-bottom:16px;
      }

      .wc-card h2{
        margin:0;
        font-size:24px;
        line-height:1.2;
        color:#172033;
      }

      .wc-category{
        background:rgba(0,98,49,.08);
        color:#006231;
        padding:8px 14px;
        border-radius:999px;
        font-size:11px;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
        white-space:nowrap;
      }

      .wc-description{
        color:#475467;
        line-height:1.7;
        font-size:15px;
        margin-bottom:22px;
      }

      .wc-metrics{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:14px;
      }

      .wc-metric{
        background:#f8faf8;
        border-radius:16px;
        padding:14px;
      }

      .wc-metric span{
        display:block;
        font-size:11px;
        font-weight:700;
        letter-spacing:.08em;
        text-transform:uppercase;
        color:#667085;
        margin-bottom:6px;
      }

      .wc-metric strong{
        color:#172033;
        font-size:16px;
      }

      .wc-status{
        margin-top:20px;
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:10px 16px;
        border-radius:999px;
        background:#eef8f1;
        color:#006231;
        font-size:12px;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
      }

      .wc-load-more{
        display:block;
        margin:40px auto 0 auto;
        border:none;
        background:#006231;
        color:#ffffff;
        border-radius:999px;
        padding:16px 28px;
        cursor:pointer;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
      }

      @media(max-width:1100px){

        .wc-grid{
          grid-template-columns:repeat(2,minmax(0,1fr));
        }

      }

      @media(max-width:760px){

        .wc-grid{
          grid-template-columns:1fr;
        }

        .wc-card-top{
          flex-direction:column;
        }

        .wc-metrics{
          grid-template-columns:1fr;
        }

        .wc-header h1{
          font-size:34px;
        }

      }

    </style>

    <div class="wc-wrapper">

      <div class="wc-header">
        <span>Capital Project Search</span>

        <h1>Searchable Project Index</h1>

        <p>
          Browse, search, and filter Walton County capital improvement projects by category, funding source, and implementation phase.
        </p>
      </div>

      <div class="wc-toolbar">

        <input
          type="text"
          class="wc-search"
          placeholder="Search projects..."
          value="${escapeHtml(filters.search)}"
        >

        <div class="wc-filter-group">

          <button class="wc-filter ${filters.category === "all" ? "active" : ""}" data-category="all">
            All
          </button>

          <button class="wc-filter ${filters.category === "transportation" ? "active" : ""}" data-category="transportation">
            Transportation
          </button>

          <button class="wc-filter ${filters.category === "public safety" ? "active" : ""}" data-category="public safety">
            Public Safety
          </button>

          <button class="wc-filter ${filters.category === "drainage" ? "active" : ""}" data-category="drainage">
            Drainage
          </button>

          <button class="wc-filter ${filters.category === "parks" ? "active" : ""}" data-category="parks">
            Parks
          </button>

          <button class="wc-filter ${filters.category === "facilities" ? "active" : ""}" data-category="facilities">
            Facilities
          </button>

        </div>

      </div>

      <div class="wc-results">
        Showing ${visibleProjects.length} of ${filtered.length} projects
      </div>

      <div class="wc-grid">

        ${visibleProjects.map(project => `

          <article class="wc-card">

            <div class="wc-card-top">

              <h2>${escapeHtml(project.title)}</h2>

              <div class="wc-category">
                ${escapeHtml(project.category_label)}
              </div>

            </div>

            <div class="wc-description">
              ${escapeHtml(project.description)}
            </div>

            <div class="wc-metrics">

              <div class="wc-metric">
                <span>Budget</span>
                <strong>${escapeHtml(project.budget)}</strong>
              </div>

              <div class="wc-metric">
                <span>Funding</span>
                <strong>${escapeHtml(project.funding)}</strong>
              </div>

              <div class="wc-metric">
                <span>District</span>
                <strong>${escapeHtml(project.district)}</strong>
              </div>

              <div class="wc-metric">
                <span>Target</span>
                <strong>${escapeHtml(project.target)}</strong>
              </div>

            </div>

            <div class="wc-status">
              ${escapeHtml(project.status_text)}
            </div>

          </article>

        `).join("")}

      </div>

      ${
        filtered.length > visibleLimit
        ? `<button class="wc-load-more">Show More Projects</button>`
        : ""
      }

    </div>
  `;

  document.querySelector(".wc-search")
    .addEventListener("input", e => {

      filters.search = e.target.value.toLowerCase();

      visibleLimit = 9;

      renderProjects();

    });

  document.querySelectorAll("[data-category]")
    .forEach(button => {

      button.addEventListener("click", () => {

        filters.category = button.dataset.category;

        visibleLimit = 9;

        renderProjects();

      });

    });

  const loadMore = document.querySelector(".wc-load-more");

  if(loadMore){

    loadMore.addEventListener("click", () => {

      visibleLimit += 9;

      renderProjects();

    });

  }

}

renderProjects();
