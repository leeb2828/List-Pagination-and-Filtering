/*
Purpose of Function:
   Called from the find_student_section() function. Assigns an active class
   to the first anchor tag. Displays the correct number of student sections
   on each page. Page 1 will display by default.
*/
function new_default_settings(links) {
   links[0].firstElementChild.className = "active";
   // Set every student section to not display (by default)
   for (let i = 0; i < t_student_items.length; i++) {
      t_student_items[i].style.display = "none";
   }
   // Then, display only the first 10 student sections
   for (let i = 0; i < 10; i++) {
      t_student_objects[i].style.display = "";
   }

}

/*
Parameter:
   A number representing the number of times a match has been found from the
   student search.
Purpose of Function:
   A "No Students found" message will display on the page if there are no
   matches from the search result.
*/
function check_result(result) {
   if (result < 1) {
      for (let i = 0; i < t_student_items.length; i++) {
         t_student_items[i].style.display = "none";
      }
      let message = "No Students found!";

      let div = document.createElement("div");
      div.style.textAlign = "center";
      div.innerHTML = '<h3>' + message + '</h3>';
      t_student_list.insertAdjacentElement("afterend", div);
   }
}

/*
Parameter:
   A string representing the value the user entered into the <input> box.
Purpose of Function:
   Called from the addEventListener() for the search button. This function uses
   the user input, student name, & email address to determine which student
   sections to display on the page. Every time a student name or email address
   matches the user input, it adds that student section to the
   sections_to_display array.
*/
function find_student_section(user_input) {
   const sections_to_display = [];

   // "let found" keeps track of the number of times a student match is found.
   let found = 0;
   for (let i = 0; i < t_student_objects.length; i++) {
      let the_student = t_student_names[i].textContent.toLowerCase();
      let student_email = t_student_emails[i].textContent.toLowerCase();
      let user_input_lc = user_input.toLowerCase();

      if (the_student.includes(user_input_lc)) {
         sections_to_display.push(t_student_objects[i]);
         document.body.style.backgroundColor = "aqua";
         found += 1;
      }
      else if (student_email.includes(user_input_lc)) {
         sections_to_display.push(t_student_objects[i]);
         document.body.style.backgroundColor = "aqua";
         found += 1;
      }
   }

   check_result(found);

   // remove old links at the bottom of the page
   var pag_div = document.querySelector("div.pagination");
   while (pag_div.firstChild) {
      pag_div.removeChild(pag_div.firstChild);
   }

   // removes current values in the t_student_objects array
   t_student_objects.splice(0, t_student_objects.length);

   // adds values from sections_to_display to the t_student_objects
   for (let i = 0; i < sections_to_display.length; i++) {
      t_student_objects.push(sections_to_display[i]);
   }

   // This will display the new correct number of links on the page
   const new_pagination_links = make_pages(t_student_objects.length);
   attach_links_to_container(div_pagination, new_pagination_links);
   new_default_settings(new_pagination_links);

}

/*
Parameter:
   A number representing the page number the user clicked on.
Purpose of Function:
   Called from when_link_is_clicked method.
   1.) Initially sets all student sections to not display on the page.
   2.) Determines which student sections get displayed on the page using
      a.) The number given in the parameter.
      b.) The total number of items required per page (10).
      c.) Since there are 54 students, the last page will contain 4 students.
*/
function display_page_and_its_ten_elements(page_to_display) {
   let items_per_page = 10;
   let page = page_to_display;
   let end_index = (page * items_per_page) - 1;

   // Select all student sections (by default) to NOT display on the page
   for (let i = 0; i < t_student_objects.length; i++) {
      t_student_objects[i].style.display = "none";
   }

   // if the end index is too big (out of range)
   // This code will only run for page 6
   if (end_index > t_student_objects.length - 1) {
      // students at indexes 50 - 53 will print out
      let out_of_range_end_index = (page * items_per_page) - 1;
      end_index = t_student_objects.length - 1; // 53
      let start_index = (out_of_range_end_index - items_per_page) + 1; // 50
      for (let i = start_index; i <= end_index; i++) {
         // Display the student sections
         t_student_objects[i].style.display = "";
      }
   }

   // if the end index is within range
   // This code will run for pages 1 - 5
   if (end_index < t_student_objects.length - 1) {
      let start_index = (end_index - items_per_page) + 1;

      for (let i = start_index; i <= end_index; i++) {
         t_student_objects[i].style.display = "";
      }
   }

}

/*
Parameter:
   The anchor tag the user clicked.
Purpose of Function:
   Called from the AddEventListener at the bottom of the page.
   1.) Assigns link_number from the textContent of the <a> tag, uses that as
   a parameter when calling the display_page_and_its_ten_elements function.
*/
function when_link_is_clicked(clicked_link) {
   const link_number = clicked_link.textContent;

   display_page_and_its_ten_elements(link_number);
}

/*
Purpose of Function:
   When the user clicks one of the pages (anchor tags) at the bottom of the
   page:
   1. It removes the "active" class from the old anchor tag and reassigns it to
   the anchor tag the user clicked.
   2. It calls the when_link_is_clicked() function in order to display the
   correct students on the page.
*/
document.querySelector("div.pagination").addEventListener("click", (event) => {
   if (event.target.tagName === "A") {
     let current_active_link = document.querySelector("a.active");
     current_active_link.classList.remove("active");
     // Give the new link an "active" class
     event.target.className = "active";
     when_link_is_clicked(event.target);
   }
});

/*
Purpose of Function:
   When the user clicks the search button, the value the user entered into
   the <input> box is used to find the correct student section/sections. The
   text in the input box is also reset to "Search for Students".
*/
document.querySelector("button#search_button").addEventListener("click", () => {
   let input = document.querySelector("input.user_input");
   let the_value = input.value;
   input.value = "";
   input.placeholder = "Search for Students";
   // If the input box is not equal to "empty"
   if(the_value != "") {
      t_num_of_searches += 1;
      find_student_section(the_value);

   }

});

/*
Purpose of Function:
   When the user clicks the text box for the input tag, the page will reload
   if the user completed one search already.
*/
document.querySelector("input.user_input").addEventListener("click", () => {
   // if it is not the first time the <input> box is clicked, refresh the page.
   if (t_num_of_searches != 0) {
      location.reload();
   }

})
