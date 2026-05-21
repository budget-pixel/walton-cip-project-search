(function(){

  const searchInput = document.getElementById('wcProjectSearch');
  const filters = document.querySelectorAll('.wc-project-filter');
  const grid = document.getElementById('wcProjectGrid');
  const emptyState = document.getElementById('wcProjectEmpty');
  const resultsCount = document.getElementById('wcProjectResultsCount');
  const loadMoreButton = document.getElementById('wcProjectLoadMore');

  const defaultVisibleCount = 9;
  const loadMoreIncrement = 9;

  let visibleLimit = defaultVisibleCount;

  let activeFilters = {
    category:'all',
    year:'all',
    fund:'all'
  };

  function escapeHtml(value){
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderProjectCard(project){

    return `
      <article class="wc-project-card">

        <div class="wc-project-card-top">
          <h3>${escapeHtml(project.title)}</h3>

          <span class="wc-project-category">
            ${escapeHtml(project.category_label)}
          </span>
        </div>

        <div class="wc-project-description">
          ${escapeHtml(project.description)}
        </div>

        ${String(project.description || '').length > 180
          ? '<button class="wc-project-read-more" type="button">Read More</button>'
          : ''
        }

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

        <div class="wc-project-status ${escapeHtml(project.status_class)}">
          ${escapeHtml(project.status_text)}
        </div>

      </article>
    `;
  }

  function renderProjects(projectList){

    const rows = [];

    for(let i = 0; i < projectList.length; i += 3){
      rows.push(projectList.slice(i, i + 3));
    }

    grid.innerHTML = rows.map(function(row){

      return `
        <div class="wc-project-row">
          ${row.map(renderProjectCard).join('')}
        </div>
      `;

    }).join('');
  }

  function filterProjects(){

    const searchTerm =
      (searchInput.value || '').toLowerCase().trim();

    const matchedProjects = wcProjects.filter(function(project){

      const category =
        String(project.category || '').toLowerCase();

      const target =
        String(project.target || '').toLowerCase();

      const funding =
        String(project.funding || '').toLowerCase();

      const content = [
        project.title,
        project.dept,
        project.category_label,
        project.description,
        project.budget,
        project.funding,
        project.district,
        project.target,
        project.status_text
      ].join(' ').toLowerCase();

      const matchesCategory =
        activeFilters.category === 'all'
        || category.includes(activeFilters.category);

      const matchesYear =
        activeFilters.year === 'all'
        || target.includes(activeFilters.year);

      const matchesFund =
        activeFilters.fund === 'all'
        || funding.includes(activeFilters.fund);

      const matchesSearch =
        !searchTerm || content.includes(searchTerm);

      return (
        matchesCategory
        && matchesYear
        && matchesFund
        && matchesSearch
      );
    });

    const visibleProjects =
      matchedProjects.slice(0, visibleLimit);

    renderProjects(visibleProjects);

    emptyState.style.display =
      matchedProjects.length ? 'none' : 'block';

    resultsCount.textContent =
      'Showing '
      + Math.min(visibleLimit, matchedProjects.length)
      + ' of '
      + matchedProjects.length
      + ' projects';

    loadMoreButton.style.display =
      matchedProjects.length > visibleLimit
      ? 'block'
      : 'none';
  }

  filters.forEach(function(filter){

    filter.addEventListener('click', function(){

      const filterType =
        filter.dataset.filterType || 'category';

      const filterValue =
        filter.dataset.filter || 'all';

      document
        .querySelectorAll(
          '.wc-project-filter[data-filter-type="' + filterType + '"]'
        )
        .forEach(function(btn){
          btn.classList.remove('active');
        });

      filter.classList.add('active');

      activeFilters[filterType] = filterValue;

      visibleLimit = defaultVisibleCount;

      filterProjects();
    });
  });

  searchInput.addEventListener('input', function(){

    visibleLimit = defaultVisibleCount;

    filterProjects();
  });

  loadMoreButton.addEventListener('click', function(){

    visibleLimit += loadMoreIncrement;

    filterProjects();
  });

  grid.addEventListener('click', function(e){

    const button =
      e.target.closest('.wc-project-read-more');

    if(!button){
      return;
    }

    const card =
      button.closest('.wc-project-card');

    if(!card){
      return;
    }

    card.classList.toggle('is-expanded');

    button.textContent =
      card.classList.contains('is-expanded')
      ? 'Show Less'
      : 'Read More';
  });

  filterProjects();

})();
