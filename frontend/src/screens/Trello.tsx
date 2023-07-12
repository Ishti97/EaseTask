import React from "react";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import Button from "./Button";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { categories, headerClass } from "../utils/categories";
import { getAllToDo, deleteToDo } from "../utils/handleAPI";

interface obj {
  id: number;
  title: string;
  description: string;
  category: string;
  created_at: string;
  deadline: string;
}

const Trello = () => {
  const [toDo, setToDo] = useState<any[]>([]);
  const [isSmall, setIsSmall] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalSelectedCategory, setModalSelectedCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalID, setModalID] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [modalDeadline, setModalDeadline] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setIsSmall(e.matches));
  }, []);

  const handleClick = (cat: any) => {
    setModalSelectedCategory(cat);
    setVisible(true);
  };

  const handleUpdate = (
    ID: string,
    category: string,
    title: string,
    description: string,
    deadline: string
  ) => {
    setModalSelectedCategory(category);
    setModalID(ID);
    setModalTitle(title);
    setModalDesc(description);
    setModalDeadline(deadline);
  };

  return (
    <>
      <div className="d-flex gap-3 w-100 contentContainer">
          {categories.map((category, index) => {
            return (
              <div className="list-group w-100" style={{ minWidth: 250 }}>
                <h1
                  className={`p-1 mb-2 ${headerClass[index]} text-white rounded text-center `}
                >
                  {category}
                </h1>
                <div className="list-group-item list-group-item-action flex-column align-items-start w-100">
                  {toDo.map(
                    (e) =>
                    
                      e.category === category && (
                        <div className="flex w-100 mt-2 pt-2 border-top border-greynpm ">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-2 text-wrap w-100 text-center">{e.title} </h5>
                            <BiEdit
                              className="icon"
                              onClick={() => {
                                setModalVisible(true);
                                handleUpdate(
                                  e._id,
                                  category,
                                  e.title,
                                  e.description,
                                  e.deadline
                                );
                              }}
                            />
                            <AiFillDelete
                              className="icon"
                              onClick={() => deleteToDo(e._id, setToDo)}
                            />
                          </div>
                          <div
                            className="flex flex-column w-100 mb-2"
                            style={{
                              whiteSpace: "pre-wrap",
                              overflowWrap: "break-word",
                            }}
                          >
                            {" "}
                            <b>{e.description}</b>
                          </div>
                          <small className=""><b>Deadline :</b> {e.deadline.split("T")[0]} : {e.deadline.split("T")[1]}</small>
                        </div>
                      )
                          )}{" "}
                </div>
                <Button
                  color="warning" 
                  onClick={() => {
                    handleClick(category);
                  }}
                >
                  Add Task
                </Button>
              </div>
            );
          })}
    
      </div>
      {visible && (
        <AddModal
          show={visible}
          toDo={toDo}
          setToDo={setToDo}
          selectedCategory={modalSelectedCategory}
          onClick={() => setVisible(false)}
        />
      )}

      {modalVisible && (
        <UpdateModal
          visible={modalVisible}
          toDo={toDo}
          setToDo={setToDo}
          ID={modalID}
          selectedCategory={modalSelectedCategory}
          title={modalTitle}
          desc={modalDesc}
          deadline={modalDeadline}
          onUpdate={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

export default Trello;
