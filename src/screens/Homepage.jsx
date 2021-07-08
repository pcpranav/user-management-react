import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { removeUser, getUser } from "../actions/userActions";

//homepage logic
const Homepage = () => {
  //get users from localstorage and set it to state
  const users = useSelector((state) => state.users);
  const { userList } = users;

  const [state, setState] = useState([]);

  useEffect(() => {
    setState(userList);
  }, [userList]);

  const dispatch = useDispatch();

  const history = useHistory();

  //drag-function
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...state];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setState(items);
  };

  return (
    <div className="container p-1">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={() => history.push("/adduser")}
        >
          Add User
        </button>
      </div>

      <center>
        <h1 className="display-2 p-1">Users List</h1>
      </center>
      <br />
      {state ? (
        state.length === 0 ? (
          <h1 className="display-3 p-1">Add users to display...</h1>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="userList">
                {(provided) => (
                  <tbody {...provided.droppableProps} ref={provided.innerRef}>
                    {state &&
                      state.map((user, i) => (
                        <Draggable
                          key={user.id}
                          draggableId={user.id}
                          index={i}
                        >
                          {(provided) => (
                            <tr
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <td>{user.fullName}</td>
                              <td>{user.gender}</td>
                              <td>{user.email}</td>
                              <td>
                                <button
                                  className="btn btn-danger me-1"
                                  onClick={() => {
                                    dispatch(removeUser(user.id));
                                  }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-success"
                                  onClick={() => {
                                    dispatch(getUser(user.id));
                                    history.push(`/updateuser/${user.id}`);
                                  }}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </DragDropContext>
          </table>
        )
      ) : (
        <h1 className="display-3 p-1">Loading...</h1>
      )}
    </div>
  );
};

export default Homepage;
