import axios from "axios";
const baseUrl = "http://localhost:5000/api";

const getAllToDo = (setToDo) => {
  axios
    .get(`${baseUrl}/users/home`, { withCredentials: true })
    .then(({ data }) => {
      setToDo(data);
    })
    .catch((err) => console.log("Error: " + err));
};

const addToDo = (
  title: string,
  description: string,
  deadline: string,
  category: string,
  setToDo: any
) => {
  axios
    .post(
      `${baseUrl}/tasks/create`,
      { title, description, deadline, category },
      { withCredentials: true }
    )
    .then((data) => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = async (
  _id: any,
  title: string,
  description: string,
  deadline: string
  // setToDo: any
) => {
  let result = await axios.put(
    `${baseUrl}/tasks/update`,
    { _id, title, description, deadline },
    { withCredentials: true }
  );

  if(result){
    console.log(result);
  }else{
    console.log("Error");
  }

  return result;
};

const deleteToDo = (_id: string, setToDo: any) => {
  axios
    .post(`${baseUrl}/tasks/delete`, { _id }, { withCredentials: true })
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
