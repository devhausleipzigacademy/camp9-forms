import "./style.css";
import axios from "axios";

// grabbing the form element
const form = document.getElementById("form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
	// default behaviour of the form is to refresh the page
	event.preventDefault();

	// formData is a built in class that allows us to get the data from the form
	const formData = new FormData(form);

	// this is an example of how to get the data from the form, and that it stores the information in a key value pair
	for (const pair of formData.entries()) {
		console.log(`${pair[0]}, ${pair[1]}`);
	}

	const formEntries = formData.entries();

	// saving the extracted data from the form into a variable
	// formData.entries() is unavoidable
	const data = Object.fromEntries(formData.entries()) as Record<
		string,
		string | string[]
	>;

	console.log("This is fromEntries", data);

	console.log([...formEntries]);

	// if you have multiple check boxes in the form, you can use the following code to get all the values

	//Task? create a type that accepts the age as a number, and stores to the database as a number
	data["clothes"] = [...formEntries]
		.filter((pair) => pair[0] == "clothes")
		.map((pair) => pair[1]) as string[];

	// this is an example of how to send data to the server
	//task? create a type for the user that includes the id as a number
	const user: Record<string, any> = await axios.post(
		"http://localhost:3000/users",
		data
	);

	console.log(user.data);

	alert(`Successfully registered! Your user id is: ${user.data.id}`);
});
