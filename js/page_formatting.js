/* Global variables */
const t_student_list = document.querySelector("ul.student-list");
const t_student_items = document.querySelectorAll("li.student-item");
const t_student_names = document.querySelectorAll("li.student-item h3");
const t_student_emails = document.querySelectorAll("li.student-item span.email");

let t_student_object;
let t_student_objects = [];

let t_num_of_searches = 0;


/*
Parameter:
   Takes in <div class="pagination"> and list of <li> elements.
Purpose of Function:
   This method is what makes the 6 links appear at the bottom of the page.
   Using a for-loop, attaches each li element to the pagination container.
*/
function attach_links_to_container(container, links) {
   for (let i = 0; i < links.length; i++) {
      container.appendChild(links[i]);
   }
}

/* Called from the make_li_and_a_tags() function */
function attach_attribute_to_element(element, attribute_name, attribute_value) {
   let attribute = document.createAttribute(attribute_name);
   attribute.value = attribute_value;

   // https://www.w3schools.com/jsref/met_element_setattributenode.asp
   element.setAttributeNode(attribute);
   return element;
}

/* Called from the make_pages() function.*/
function make_li_and_a_tags(num) {
   let li = document.createElement("li");

   let a = document.createElement("a");
   a.textContent = String(num);

   attach_attribute_to_element(a, "href", "#");
   li.appendChild(a);
   return li;
}

/*
Parameter:
   Takes in the search_bar (div element that contains the input tag and button).
Purpose of Function:
   This function is what makes the entire search bar (including the input tag
   and the button) appear at the top of the screen.
*/
function display_search_div(search_bar) {
   // Select the appropriate div element from index.html file
   const page_header = document.querySelector("div.page-header");
   // Attach the newly created <div class="student-search"> to it.
   page_header.appendChild(search_bar);
}

/*
Parameter:
   The newly created search button and input tag.
Purpose of Function:
   1.) Creates the <div class="student-search">
   2.) Attaches the button and input tags to it.
Returns:
   The newly created div element.
Extra Information:
   Called & stored inside the variable search_bar.
*/
function make_search_div(the_input, the_button) {
   const searchBar = document.createElement("div");
   searchBar.className = "student-search";

   searchBar.appendChild(the_input);
   searchBar.appendChild(the_button);

   return searchBar;
}

/*
Purpose of Function:
   Creates the <button id="search_button"> tag. Adds "search" as its textcontent.
Returns:
   The newly created and (properly formatted) button.
Extra Information:
   Called & stored inside the variable search_button.
*/
function make_button() {
   let button = document.createElement("button");
   button.setAttribute("id", "search_button");
   button.textContent = "Search";

   return button;
}

/*
Purpose of Function:
   Creates the <input class="user_input"> tag and attaches attributes to it.
Returns:
   The newly created and (properly formatted) input tag.
Extra Information:
   Called & stored inside the variable input_tag.
*/
function make_input_tag() {
   let input = document.createElement("input");
   input.className = "user_input";
   // attach_attribute_to_element() method is from pages_format.js
   attach_attribute_to_element(input, "type", "text");
   attach_attribute_to_element(input, "placeholder", "Search for students...");
   return input;
}

/*
Parameter:
   Takes in a number representing the total number of students/student sections.
Purpose of Function:
   Calculate the total number of pages needed in order to have 10 students
   per page. Creates a list of <li> elements with anchor tags attached by
   calling the make_li_and_a_tags method in a for-loop.
Returns:
   A list containing the correct number of <li> elements (with <a>
   elements attached to them).
Extra Information:
   Called from and stored in the variable div_pagination_links.
*/
function make_pages(num_of_student_sections) {
   const links_list = [];
   const total_num_of_pages = Math.ceil(num_of_student_sections / 10); // 5.4 = 6 pages

   for (let i = 0; i < total_num_of_pages; i++) {
      const current_link = make_li_and_a_tags(i+1);
      links_list.push(current_link);
   }

   return links_list;
}

/*
Parameters:
   1.) A string representing the class name for the new div element.
   2.) div element selected from the index.html file.
Purpose of Function:
   Creates a new div with the class name from the parameter. Appends the new
   div to a div already present in the index.html file.
Returns:
   The newly created div element.
*/
function make_div_element(class_name, div_to_append_to) {
   const new_div = document.createElement("div");
   new_div.className = class_name;

   div_to_append_to.appendChild(new_div);

   return new_div;
}

function set_default_settings(div_pagination_links) {
   div_pagination_links[0].firstElementChild.className = "active";
   // Set every student section to not display (by default)
   for (let i = 0; i < t_student_list.children.length; i++) {
      t_student_list.children[i].style.display = "none";
   }
   // Then, display only the first 10 student sections
   for (let i = 0; i < 10; i++) {
      t_student_list.children[i].style.display = "";
   }
}

/*
Start
*/

for (let i = 0; i < t_student_items.length; i++) {
   t_student_objects.push(t_student_items[i]);
}

// Responsible for creating the six links at the bottom of the page
const page = document.querySelector("div.page");
const div_pagination = make_div_element("pagination", page);
const div_pagination_links = make_pages(t_student_objects.length);
attach_links_to_container(div_pagination, div_pagination_links);


// Responsible for creating the search bar at the top of the page
const input_tag = make_input_tag();
const search_button = make_button();
const search_bar = make_search_div(input_tag, search_button);
display_search_div(search_bar);

// Set the default settings
set_default_settings(div_pagination_links);
