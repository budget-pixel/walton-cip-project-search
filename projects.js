const wcProjects = [
  {
    title: "Hewett Bayou Connector (E Lamb Drive Extension)",
    dept: "Public Works",
    category: "drainage",
    category_label: "Drainage",
    description: "This project is for the construction of a new two (2) lane roadway from East Lamb Drive to East Hewett Rd. Scope of work includes the construction of an approximate 325 ft concrete bridge over Hewett Bayou, attached 6 ft sidewalk and associated drainage features. Roadway segment is one (1) mile.",
    budget: "$4.6M",
    funding: "Capital Projects Fund",
    district: "District 4",
    target: "FY2027",
    status_text: "Construction",
    status_class: "wc-status-construction"
  },

  {
    title: "CR 280 Bob Sikes Roadway Resurfacing Project Phase I",
    dept: "Public Works",
    category: "drainage",
    category_label: "Drainage",
    description: "This project scope is for Phase 1 construction of CR 280 Bob Sikes from US 331 to 900 ft west of Pleasant Ridge Rd.",
    budget: "$4.2M",
    funding: "Grant Funded- SCOP",
    district: "District 3",
    target: "FY2027",
    status_text: "Construction",
    status_class: "wc-status-construction"
  },

  {
    title: "Blue Gulf Resort Roadway & Drainage Improvements",
    dept: "Public Works",
    category: "drainage",
    category_label: "Drainage",
    description: "Blue Gulf Resort Roadway & Drainage Improvements is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$2.5M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Poinicana Blvd Roadway, Drainage & Pedestrian Improvements",
    dept: "Public Works",
    category: "drainage",
    category_label: "Drainage",
    description: "Poinicana Blvd Roadway, Drainage & Pedestrian Improvements is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$1.8M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Fox Lake Drainage Improvements",
    dept: "Public Works",
    category: "drainage",
    category_label: "Drainage",
    description: "Fox Lake Drainage Improvements is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$912K",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Tourism Visitor and Discovery Center",
    dept: "Tourism",
    category: "facilities",
    category_label: "Facilities",
    description: "Tourism Visitor and Discovery Center is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$9.5M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2029",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Baldwin Library/Learning Center",
    dept: "BCC",
    category: "facilities",
    category_label: "Facilities",
    description: "Baldwin Library/Learning Center is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$8M",
    funding: "Capital Projects Fund",
    district: "Countywide",
    target: "FY2030",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Coastal Branch Library Expansion",
    dept: "BCC",
    category: "facilities",
    category_label: "Facilities",
    description: "Coastal Branch Library Expansion is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$3M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2030",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Holiday Shores Drainage & Pedestrian Improvements Phase II",
    dept: "Public Works",
    category: "parks",
    category_label: "Parks",
    description: "The proposed project phase includes the construction of drainage improvements and pedestrian facilities in the Holiday Shores neighborhood area.",
    budget: "$7.6M",
    funding: "Capital Projects Fund",
    district: "District 4",
    target: "FY2027",
    status_text: "Construction",
    status_class: "wc-status-construction"
  },

  {
    title: "Miramar Beach Parking Facility",
    dept: "Tourism",
    category: "parks",
    category_label: "Parks",
    description: "Miramar Beach Parking Facility is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$6.5M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Santa Rosa Beach Performing Arts Park",
    dept: "Tourism",
    category: "parks",
    category_label: "Parks",
    description: "Santa Rosa Beach Performing Arts Park is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$6.5M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2029",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Radio Project",
    dept: "Sheriff",
    category: "public safety",
    category_label: "Public Safety",
    description: "Radio Project is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$10.1M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2027",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Freeport 3280/Bearcreek Fire Station",
    dept: "Sheriff",
    category: "public safety",
    category_label: "Public Safety",
    description: "Freeport 3280/Bearcreek Fire Station is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$7M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2027–FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Pleasant Ridge Fire Station",
    dept: "Sheriff",
    category: "public safety",
    category_label: "Public Safety",
    description: "Pleasant Ridge Fire Station is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$7M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2027–FY2028",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Boardwalk Dune Walkover Repair/Replacement",
    dept: "Tourism",
    category: "tourism",
    category_label: "Tourism",
    description: "Boardwalk Dune Walkover Repair/Replacement is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$1M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2027",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Transit Program Gulfview & Blue Mountain",
    dept: "Tourism",
    category: "tourism",
    category_label: "Tourism",
    description: "Transit Program Gulfview & Blue Mountain is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$1M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2027",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "Pavement Management (PCI)",
    dept: "Public Works",
    category: "transportation",
    category_label: "Transportation",
    description: "Pavement Management (PCI) is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$6.2M",
    funding: "Transportation Fund",
    district: "Countywide",
    target: "FY2027–FY2030",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "US 331 Bridge Lighting",
    dept: "BCC",
    category: "transportation",
    category_label: "Transportation",
    description: "The proposed project will incorporate bridge lighting across the US 331 Clyde B Wells Bridge in Walton County, FL.",
    budget: "$6M",
    funding: "Tourist Development Fund",
    district: "District 5",
    target: "FY2027",
    status_text: "Construction",
    status_class: "wc-status-construction"
  },

  {
    title: "Veterans Road Improvements & Extension",
    dept: "Public Works",
    category: "transportation",
    category_label: "Transportation",
    description: "Veterans Road Improvements & Extension is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$4.1M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028–FY2030",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "CR 393 N Roadway & Pedestrian Improvements Phase 2",
    dept: "Public Works",
    category: "transportation",
    category_label: "Transportation",
    description: "CR 393 N Roadway & Pedestrian Improvements Phase 2 is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$2.8M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2029–FY2031",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  },

  {
    title: "US 98 & Thompson Rd Intersection Signalization Project",
    dept: "Public Works",
    category: "transportation",
    category_label: "Transportation",
    description: "US 98 & Thompson Rd Intersection Signalization Project is included in Walton County’s five-year Capital Improvement Plan.",
    budget: "$1.5M",
    funding: "TBD",
    district: "Countywide",
    target: "FY2028–FY2029",
    status_text: "Planning Phase",
    status_class: "wc-status-planning"
  }
];
