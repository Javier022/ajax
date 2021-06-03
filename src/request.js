// requests AJAX
// como se ejecutan las acciones

const path = "todos";
const endpoint = "https://jsonplaceholder.typicode.com/";

const Performer = (action) => {
  let options = {
    method: getMethod(action),
  };

  return fetch(`${endpoint}${getPath(action)}`, options)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getMethod = (action) => {
  if (action.type == "create") return "POST";
  if (action.type == "update") return "PUT";
  if (action.type == "destroy") return "DELETE";
  if (action.type == "list" || "listAll") return "GET";
  // if (action.type == "listAll") return "GET";
};

const getPath = (action) => {
  if (action.type == "create") return `${path}`;
  if (action.type == "update") return `${path}/${action.payload.id}`;
  if (action.type == "destroy") return `${path}/${action.payload.id}`;
  if (action.type == "list") return `${path}/${action.payload.id}`;
  if (action.type == "listAll") return `${path}?_limit=${action.payload.limit}`;
};

export default Performer;
