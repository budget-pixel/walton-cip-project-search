const app = document.getElementById("app");

const defaultVisibleCount = 9;
const loadMoreIncrement = 9;
const urlParams = new URLSearchParams(window.location.search);

const isFullView = urlParams.get("view") === "all";

const WC_CIP_BASE_URL = "https://budget-pixel.github.io/walton-cip-project-search/";

function buildProjectUrl(project){
  return `${WC_CIP_BASE_URL}project.html?project=${encodeURIComponent(project.slug || "")}`;
}


let visibleLimit = isFullView ? 9999 : defaultVisibleCount;

function resetVisibleLimit(){
  visibleLimit = isFullView ? 9999 : defaultVisibleCount;
}

const filters = {
  department: "all",
  year: "all",
  fund: "all",
  search: ""
};

function escapeHtml(value){
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFilteredProjects(){
  return wcProjects.filter(project => {
    const department = String(project.dept || project.department || "").toLowerCase();
    const target = String(project.target || "").toLowerCase();
    const funding = String(project.funding || "").toLowerCase();

    const content = [
      project.title,
      project.description,
      project.dept,
      project.category,
      project.category_label,
      project.budget,
      project.funding,
      project.target,
      project.district,
      project.status_text
    ].join(" ").toLowerCase();

    const matchesSearch =
      !filters.search ||
      content.includes(filters.search);

    const matchesDepartment =
      filters.department === "all" ||
      department.includes(filters.department);

    const matchesYear =
      filters.year === "all" ||
      target.includes(filters.year);

    const matchesFund =
      filters.fund === "all" ||
      funding.includes(filters.fund);

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesYear &&
      matchesFund
    );
  });
}

function renderProjectCard(project){
  const description = String(project.description || "");
  const statusClass = project.status_class || getStatusClass(project.status_text);
  const departmentLabel = project.dept || project.department || project.category_label || "Department";
  const staffDeliveryValue =
    project.in_house_engineering_value_formatted ||
    project.in_house_engineering_value ||
    "";

  return `
    <article class="wc-project-card" data-department="${escapeHtml(departmentLabel)}" data-target="${escapeHtml(String(project.target || "").toLowerCase())}" data-project-url="${escapeHtml(buildProjectUrl(project))}" tabindex="0" role="link" aria-label="View details for ${escapeHtml(project.title)}">

      <div class="wc-project-card-top">
        <h3>${escapeHtml(project.title)}</h3>
        <span class="wc-project-category">${escapeHtml(departmentLabel)}</span>
      </div>

      <div class="wc-project-description">
        ${escapeHtml(description)}
      </div>

      ${description.length > 180 ? `<button class="wc-project-read-more" type="button">Read More</button>` : ""}

      <div class="wc-project-metrics">

        <div class="wc-project-metric">
          <span>Project Budget</span>
          <strong>${escapeHtml(project.budget)}</strong>
        </div>

        <div class="wc-project-metric">
          <span>Funding Source</span>
          <strong>${escapeHtml(project.funding)}</strong>
        </div>

        <div class="wc-project-metric">
          <span>District</span>
          <strong>${escapeHtml(project.district)}</strong>
        </div>

        <div class="wc-project-metric">
          <span>Target Year</span>
          <strong>${escapeHtml(project.target)}</strong>
        </div>

      </div>

      <div class="wc-project-card-badges">

        <div class="wc-project-status ${escapeHtml(statusClass)}">
          ${escapeHtml(project.status_text)}
        </div>

        ${project.has_in_house_engineering ? `
          <div
            class="wc-project-card-badge"
            title="Estimated equivalent consultant engineering value delivered internally by County staff. Not included in total project budget."
            aria-label="In-house engineering savings${staffDeliveryValue ? `, ${escapeHtml(staffDeliveryValue)}` : ""}. Estimated equivalent consultant engineering value delivered internally by County staff. Not included in total project budget."
          >
            In-House Eng Savings${staffDeliveryValue ? ` · ${escapeHtml(staffDeliveryValue)}` : ""}
          </div>
        ` : ""}

      </div>

    </article>
  `;
}

function getStatusClass(statusText){
  const status = String(statusText || "").toLowerCase();

  if(status.includes("construction")){
    return "wc-status-construction";
  }

  if(status.includes("design")){
    return "wc-status-design";
  }

  if(status.includes("complete")){
    return "wc-status-complete";
  }

  return "wc-status-planning";
}

function renderProjects(){
  const filtered = getFilteredProjects();
  const visibleProjects = filtered.slice(0, visibleLimit);
  const rows = [];

  for(let i = 0; i < visibleProjects.length; i += 3){
    rows.push(visibleProjects.slice(i, i + 3));
  }

  app.innerHTML = `
    <style>

      *{
        box-sizing:border-box;
      }

      body{
        margin:0;
        background:#ffffff;
        font-family:Arial, Helvetica, sans-serif;
      }

      .wc-project-index-section{
        position:relative;
        width:100vw;
        max-width:100vw;
        left:50%;
        margin-left:-50vw;
        margin-right:-50vw;
        padding:54px 34px;
        background:#ffffff;
        font-family:Arial, Helvetica, sans-serif;
        box-sizing:border-box;
      }

      .wc-project-index-inner{
        width:100%;
        max-width:1600px;
        margin:0 auto;
      }

      .wc-project-index-header{
        text-align:center;
        margin-bottom:34px;
      }

      .wc-project-index-header span{
        display:block;
        margin-bottom:10px;
        color:#006231;
        font-size:13px;
        font-weight:700;
        letter-spacing:.14em;
        text-transform:uppercase;
      }

      .wc-project-index-header h2{
        margin:0;
        color:#172033;
        font-size:42px;
        line-height:1.08;
        font-weight:700;
      }

      .wc-project-index-header h2::after{
        content:"";
        display:block;
        width:82px;
        height:4px;
        margin:14px auto 0 auto;
        border-radius:999px;
        background:linear-gradient(90deg,#006231 0%,#0b7d45 100%);
      }

      .wc-project-index-header p{
        max-width:980px;
        margin:18px auto 0 auto;
        color:#475467;
        font-size:16px;
        line-height:1.7;
      }

      .wc-project-toolbar{
        display:flex;
        flex-wrap:wrap;
        gap:16px;
        align-items:center;
        justify-content:space-between;
        margin-bottom:24px;
        padding:22px;
        background:#ffffff;
        border-radius:24px;
        border:1px solid rgba(209,190,120,0.34);
        box-shadow:
          0 12px 28px rgba(0,98,49,0.08),
          0 4px 10px rgba(36,52,77,0.05);
      }

      .wc-project-search-wrap{
        position:relative;
        flex:1 1 420px;
        min-width:280px;
      }

      .wc-project-search{
        width:100% !important;
        height:58px !important;
        padding:0 18px 0 72px !important;
        text-indent:0 !important;
        border-radius:16px;
        border:1px solid rgba(0,98,49,0.16);
        background:#f8faf8;
        font-size:15px;
        color:#172033;
        outline:none;
        box-sizing:border-box;
        transition:
          border-color .22s ease,
          box-shadow .22s ease,
          background .22s ease;
      }

      .wc-project-search::placeholder{
        color:#98a2b3;
        opacity:1;
      }

      .wc-project-search:focus{
        border-color:#006231;
        background:#ffffff;
        box-shadow:0 0 0 4px rgba(0,98,49,0.08);
      }

      .wc-project-search-icon{
        position:absolute !important;
        left:24px !important;
        top:50% !important;
        transform:translateY(-50%) !important;
        width:18px !important;
        height:18px !important;
        opacity:.55 !important;
        pointer-events:none !important;
        z-index:2 !important;
      }

      .wc-project-filter-group{
        display:flex;
        flex-wrap:wrap;
        gap:12px;
        width:100%;
      }

      .wc-project-filter-set{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        align-items:center;
        width:100%;
      }

      .wc-project-filter-label{
        color:#475467;
        font-size:12px;
        font-weight:800;
        letter-spacing:.12em;
        text-transform:uppercase;
        margin-right:2px;
      }

      .wc-project-filter{
        height:46px;
        padding:0 18px;
        border-radius:999px;
        border:1px solid rgba(0,98,49,0.14);
        background:#ffffff;
        color:#172033;
        font-size:14px;
        font-weight:600;
        cursor:pointer;
        transition:
          background .22s ease,
          color .22s ease,
          border-color .22s ease,
          transform .22s ease;
      }

      .wc-project-filter:hover{
        transform:translateY(-1px);
      }

      .wc-project-filter.active{
        background:linear-gradient(135deg,#006231 0%,#0b7d45 100%);
        color:#ffffff;
        border-color:#006231;
      }

      .wc-project-results-row{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:18px;
        margin:0 0 12px 0;
        color:#475467;
        font-size:14px;
        font-weight:700;
      }

      .wc-project-grid{
        display:flex !important;
        flex-direction:column !important;
        gap:24px !important;
        width:100% !important;
        max-width:100% !important;
        margin:0 !important;
        padding:0 !important;
        box-sizing:border-box !important;
      }

      .wc-project-row{
        display:flex !important;
        flex-direction:row !important;
        align-items:stretch !important;
        justify-content:flex-start !important;
        gap:24px !important;
        width:100% !important;
        max-width:100% !important;
        margin:0 !important;
        padding:0 !important;
        box-sizing:border-box !important;
      }

      .wc-project-card{
        cursor:pointer;
        flex:1 1 0 !important;
        width:calc((100% - 48px) / 3) !important;
        max-width:calc((100% - 48px) / 3) !important;
        min-width:0 !important;
        box-sizing:border-box !important;
        position:relative;
        display:flex;
        flex-direction:column;
        align-self:stretch !important;
        gap:16px;
        padding:28px;
        background:#ffffff;
        border-radius:26px;
        border:1px solid rgba(209,190,120,0.34);
        box-shadow:
          0 14px 34px rgba(0,98,49,0.08),
          0 4px 12px rgba(36,52,77,0.06);
        transition:
          transform .24s ease,
          box-shadow .24s ease,
          border-color .24s ease;
      }

      .wc-project-card:hover{
        transform:translateY(-4px);
        border-color:rgba(0,98,49,0.28);
        box-shadow:
          0 22px 44px rgba(0,98,49,0.12),
          0 8px 18px rgba(36,52,77,0.08);
      }

      .wc-project-card-top{
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:12px;
      }

      .wc-project-card h3{
        margin:0;
        color:#172033;
        font-size:24px;
        line-height:1.2;
        font-weight:700;
      }

      .wc-project-category{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        padding:8px 14px;
        border-radius:999px;
        background:rgba(0,98,49,0.08);
        color:#006231;
        font-size:12px;
        font-weight:700;
        letter-spacing:.08em;
        text-transform:uppercase;
        white-space:nowrap;
      }

      .wc-project-description{
        color:#475467;
        font-size:15px;
        line-height:1.72;
        position:relative;
      }

      .wc-project-card.has-overflow .wc-project-description{
        max-height:78px;
        overflow:hidden;
      }

      .wc-project-card.is-expanded .wc-project-description{
        max-height:none;
        overflow:visible;
      }

      .wc-project-card.has-overflow .wc-project-description::after{
        content:"";
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        height:34px;
        background:linear-gradient(
          180deg,
          rgba(255,255,255,0) 0%,
          #ffffff 85%
        );
        pointer-events:none;
      }

      .wc-project-card.is-expanded .wc-project-description::after{
        display:none;
      }

      .wc-project-read-more{
        align-self:flex-start;
        margin-top:-6px;
        padding:0;
        border:0;
        background:transparent;
        color:#006231;
        font-family:Arial, Helvetica, sans-serif;
        font-size:13px;
        font-weight:800;
        letter-spacing:.06em;
        text-transform:uppercase;
        cursor:pointer;
      }

      .wc-project-read-more:hover{
        text-decoration:underline;
      }

      .wc-project-metrics{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:14px;
        margin-top:auto;
        align-items:stretch;
      }

      .wc-project-metric{
        min-height:92px;
        padding:14px 16px;
        border-radius:16px;
        background:#f8faf8;
        border:1px solid rgba(0,98,49,0.08);
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        box-sizing:border-box;
      }

      .wc-project-metric span{
        display:block;
        margin-bottom:6px;
        color:#667085;
        font-size:11px;
        font-weight:700;
        letter-spacing:.10em;
        text-transform:uppercase;
      }

      .wc-project-metric strong{
        display:block;
        color:#172033;
        font-size:18px;
        line-height:1.25;
        font-weight:700;
        word-break:break-word;
        overflow-wrap:anywhere;
      }

      .wc-project-metric:first-child strong{
        white-space:nowrap;
      }

      .wc-project-status{
        display:inline-flex;
        align-items:center;
        gap:8px;
        width:max-content;
        padding:10px 16px;
        border-radius:999px;
        font-size:13px;
        font-weight:700;
        letter-spacing:.06em;
        text-transform:uppercase;
      }

      .wc-project-status::before{
        content:"";
        width:10px;
        height:10px;
        border-radius:999px;
        background:currentColor;
      }

      .wc-project-card-badges{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        margin-top:-2px;
      }

      .wc-project-card-badge{
        display:inline-flex;
        align-items:center;
        gap:7px;
        width:max-content;
        padding:9px 13px;
        border-radius:999px;
        background:rgba(52,64,84,0.08);
        color:#344054;
        border:1px solid rgba(52,64,84,0.16);
        font-size:12px;
        font-weight:800;
        letter-spacing:.04em;
        text-transform:uppercase;
      }

      .wc-status-planning{ background:rgba(209,190,120,0.18); color:#8b6d12; }
      .wc-status-design{ background:rgba(9,127,187,0.12); color:#0b5f8a; }
      .wc-status-construction{ background:rgba(0,98,49,0.12); color:#006231; }
      .wc-status-complete{ background:rgba(52,64,84,0.10); color:#344054; }

      .wc-project-empty{
        display:none;
        padding:42px 24px;
        text-align:center;
        color:#667085;
        font-size:16px;
      }

      .wc-project-load-more{
        display:none;
        margin:30px auto 0 auto;
        padding:15px 26px;
        border:0;
        border-radius:999px;
        background:linear-gradient(135deg,#006231 0%,#0b7d45 100%);
        color:#ffffff;
        font-family:Arial, Helvetica, sans-serif;
        font-size:14px;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
        cursor:pointer;
        box-shadow:0 10px 24px rgba(0,98,49,0.16);
        transition:transform .22s ease, box-shadow .22s ease;
      }

      .wc-project-load-more:hover{
        transform:translateY(-2px);
        box-shadow:0 14px 28px rgba(0,98,49,0.20);
      }

      @media(max-width:1100px){
        .wc-project-row{
          flex-wrap:wrap !important;
        }

        .wc-project-card{
          flex:0 1 calc((100% - 24px) / 2) !important;
          width:calc((100% - 24px) / 2) !important;
          max-width:calc((100% - 24px) / 2) !important;
        }
      }

      @media(max-width:760px){
        .wc-project-index-section{
          width:100% !important;
          max-width:100% !important;
          left:auto !important;
          margin-left:0 !important;
          margin-right:0 !important;
          padding:32px 14px !important;
          overflow-x:hidden !important;
        }

        .wc-project-index-inner{
          width:100% !important;
          max-width:100% !important;
        }

        .wc-project-index-header{
          margin-bottom:24px;
          padding:0 4px;
        }

        .wc-project-index-header span{
          font-size:11px;
          letter-spacing:.12em;
        }

        .wc-project-index-header h2{
          font-size:30px;
          line-height:1.12;
        }

        .wc-project-index-header p{
          font-size:15px;
          line-height:1.6;
          margin-top:14px;
        }

        .wc-project-toolbar{
          padding:16px !important;
          border-radius:20px;
          gap:14px;
        }

        .wc-project-search-wrap{
          flex:1 1 100%;
          min-width:0;
          width:100%;
        }

        .wc-project-search{
          height:54px !important;
          padding-left:62px !important;
          font-size:14px !important;
          border-radius:15px;
        }

        .wc-project-search-icon{
          left:22px !important;
          width:17px !important;
          height:17px !important;
        }

        .wc-project-filter-group{
          gap:14px;
        }

        .wc-project-filter-set{
          width:100%;
          gap:8px;
        }

        .wc-project-filter-label{
          width:100%;
          margin-bottom:2px;
          font-size:11px;
        }

        .wc-project-filter{
          height:42px;
          padding:0 14px;
          font-size:13px;
          flex:0 1 auto;
        }

        .wc-project-results-row{
          flex-direction:column;
          align-items:flex-start;
          gap:6px;
          margin-bottom:16px;
          font-size:13px;
        }

        .wc-project-grid{
          gap:18px !important;
        }

        .wc-project-row{
          flex-direction:column !important;
          gap:18px !important;
          width:100% !important;
        }

        .wc-project-card{
          flex:1 1 auto !important;
          width:100% !important;
          max-width:100% !important;
          min-width:0 !important;
          align-self:auto !important;
          padding:22px !important;
          border-radius:22px;
          gap:14px;
        }

        .wc-project-card:hover{
          transform:none;
        }

        .wc-project-card-top{
          flex-direction:column;
          gap:10px;
        }

        .wc-project-card h3{
          font-size:21px;
          line-height:1.22;
        }

        .wc-project-category{
          align-self:flex-start;
          white-space:normal;
          text-align:left;
          line-height:1.25;
        }

        .wc-project-description{
          font-size:14px;
          line-height:1.65;
        }

        .wc-project-card.has-overflow .wc-project-description{
          max-height:96px;
        }

        .wc-project-metrics{
          grid-template-columns:1fr;
          gap:10px;
        }

        .wc-project-metric{
          min-height:auto;
          padding:13px 14px;
        }

        .wc-project-metric strong{
          font-size:16px;
          line-height:1.3;
        }

        .wc-project-status{
          width:100%;
          justify-content:center;
          text-align:center;
          padding:11px 14px;
          font-size:12px;
        }

        .wc-project-card-badge{
          width:100%;
          justify-content:center;
          text-align:center;
        }

        .wc-project-load-more{
          width:100%;
          padding:15px 18px;
          font-size:13px;
        }
      }

      @media(max-width:420px){
        .wc-project-index-section{
          padding:28px 10px !important;
        }

        .wc-project-index-header h2{
          font-size:27px;
        }

        .wc-project-toolbar{
          padding:14px !important;
        }

        .wc-project-filter{
          flex:1 1 calc(50% - 8px);
          padding:0 10px;
          font-size:12px;
        }

        .wc-project-card{
          padding:20px !important;
        }

        .wc-project-card h3{
          font-size:20px;
        }
      }

    </style>

    <section class="wc-project-index-section">
      <div class="wc-project-index-inner">

        <div class="wc-project-index-header">
          <span>Capital Project Search</span>
          <h2>Searchable Project Index</h2>
          <p>
            Browse, search, and filter Walton County capital improvement projects by department, category, funding source, and implementation phase. This project index is populated from the CIP export and is designed to help residents quickly locate projects relevant to their community.
          </p>
        </div>

        <div class="wc-project-toolbar">

          <div class="wc-project-search-wrap">
            <svg class="wc-project-search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <input
              type="text"
              class="wc-project-search"
              placeholder="Search projects, departments, locations, or funding sources..."
              value="${escapeHtml(filters.search)}"
            >
          </div>

          <div class="wc-project-filter-group">

            <div class="wc-project-filter-set" data-filter-type="department">
              <span class="wc-project-filter-label">Department</span>
              <button class="wc-project-filter ${filters.department === "all" ? "active" : ""}" data-filter-type="department" data-filter="all">All</button>
              <button class="wc-project-filter ${filters.department === "public works" ? "active" : ""}" data-filter-type="department" data-filter="public works">Public Works/Engineering</button>
              <button class="wc-project-filter ${filters.department === "beach operations" ? "active" : ""}" data-filter-type="department" data-filter="beach operations">Beach Operations</button>
              <button class="wc-project-filter ${filters.department === "sheriff" ? "active" : ""}" data-filter-type="department" data-filter="sheriff">Sheriff</button>
              <button class="wc-project-filter ${filters.department === "administration" ? "active" : ""}" data-filter-type="department" data-filter="administration">Administration</button>
              <button class="wc-project-filter ${filters.department === "building construction" ? "active" : ""}" data-filter-type="department" data-filter="building construction">Building Construction & Maintenance</button>
            </div>

            <div class="wc-project-filter-set" data-filter-type="year">
              <span class="wc-project-filter-label">Year</span>
              <button class="wc-project-filter ${filters.year === "all" ? "active" : ""}" data-filter-type="year" data-filter="all">All</button>
              <button class="wc-project-filter ${filters.year === "fy2027" ? "active" : ""}" data-filter-type="year" data-filter="fy2027">FY2027</button>
              <button class="wc-project-filter ${filters.year === "fy2028" ? "active" : ""}" data-filter-type="year" data-filter="fy2028">FY2028</button>
              <button class="wc-project-filter ${filters.year === "fy2029" ? "active" : ""}" data-filter-type="year" data-filter="fy2029">FY2029</button>
              <button class="wc-project-filter ${filters.year === "fy2030" ? "active" : ""}" data-filter-type="year" data-filter="fy2030">FY2030</button>
              <button class="wc-project-filter ${filters.year === "fy2031" ? "active" : ""}" data-filter-type="year" data-filter="fy2031">FY2031</button>
            </div>

            <div class="wc-project-filter-set" data-filter-type="fund">
              <span class="wc-project-filter-label">Fund</span>
              <button class="wc-project-filter ${filters.fund === "all" ? "active" : ""}" data-filter-type="fund" data-filter="all">All</button>
              <button class="wc-project-filter ${filters.fund === "capital projects fund" ? "active" : ""}" data-filter-type="fund" data-filter="capital projects fund">Capital Projects</button>
              <button class="wc-project-filter ${filters.fund === "transportation fund" ? "active" : ""}" data-filter-type="fund" data-filter="transportation fund">Transportation</button>
              <button class="wc-project-filter ${filters.fund === "tourist development fund" ? "active" : ""}" data-filter-type="fund" data-filter="tourist development fund">Tourist Development</button>
              <button class="wc-project-filter ${filters.fund === "grant" ? "active" : ""}" data-filter-type="fund" data-filter="grant">Grant Funded</button>
              <button class="wc-project-filter ${filters.fund === "public works capital" ? "active" : ""}" data-filter-type="fund" data-filter="public works capital">Public Works Capital</button>
              <button class="wc-project-filter ${filters.fund === "tbd" ? "active" : ""}" data-filter-type="fund" data-filter="tbd">TBD</button>
            </div>

          </div>

        </div>

        <div class="wc-project-results-row">
          <div class="wc-project-results-count">Showing ${visibleProjects.length} of ${filtered.length} projects</div>
          <div>Use search and filters to narrow the list.</div>
        </div>

        <div class="wc-project-grid">
          ${rows.map(row => `<div class="wc-project-row">${row.map(renderProjectCard).join("")}</div>`).join("")}
        </div>

        <div class="wc-project-empty" style="display:${filtered.length ? "none" : "block"};">
          No projects match your search criteria.
        </div>

        ${!isFullView && filtered.length > visibleLimit ? `<button class="wc-project-load-more" type="button" style="display:block;">Open Full Project Search</button>` : ""}

      </div>
    </section>
  `;

  const searchField = document.querySelector(".wc-project-search");

  if(searchField){
    searchField.addEventListener("input", e => {
      filters.search = e.target.value.toLowerCase();
      resetVisibleLimit();

      clearTimeout(window.wcProjectSearchTimer);

      window.wcProjectSearchTimer = setTimeout(() => {
        renderProjects();

        const refreshedSearchField = document.querySelector(".wc-project-search");

        if(refreshedSearchField){
          refreshedSearchField.focus();
          refreshedSearchField.value = filters.search;
          refreshedSearchField.setSelectionRange(filters.search.length, filters.search.length);
        }
      }, 120);
    });
  }

  document.querySelectorAll(".wc-project-filter")
    .forEach(button => {
      button.addEventListener("click", () => {
        const filterType = button.dataset.filterType;
        const filterValue = button.dataset.filter;

        filters[filterType] = filterValue;
        resetVisibleLimit();
        renderProjects();
      });
    });

  const loadMore = document.querySelector(".wc-project-load-more");

  if(loadMore){
    loadMore.addEventListener("click", () => {
      window.open(
        "https://budget-pixel.github.io/walton-cip-project-search/?view=all&v=6",
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  document.querySelectorAll(".wc-project-card").forEach(card => {
    const description = card.querySelector(".wc-project-description");

    if(!description){
      return;
    }

    description.style.maxHeight = "none";
    const fullDescriptionHeight = description.scrollHeight;
    description.style.maxHeight = "";

    if(fullDescriptionHeight > 78){
      card.classList.add("has-overflow");
    }else{
      card.classList.remove("has-overflow");
    }
  });

  document.querySelectorAll(".wc-project-card").forEach(card => {
    card.addEventListener("click", event => {
      if(event.target.closest(".wc-project-read-more")){
        return;
      }

      const projectUrl = card.dataset.projectUrl;

      if(projectUrl){
        window.open(projectUrl, "_blank", "noopener,noreferrer");
      }
    });

    card.addEventListener("keydown", event => {
      if(event.key !== "Enter" && event.key !== " "){
        return;
      }

      if(event.target.closest(".wc-project-read-more")){
        return;
      }

      event.preventDefault();

      const projectUrl = card.dataset.projectUrl;

      if(projectUrl){
        window.open(projectUrl, "_blank", "noopener,noreferrer");
      }
    });
  });

  document.querySelectorAll(".wc-project-read-more").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();

      const card = button.closest(".wc-project-card");

      if(!card){
        return;
      }

      card.classList.toggle("is-expanded");
      button.textContent = card.classList.contains("is-expanded") ? "Show Less" : "Read More";
    });
  });
}

renderProjects();
