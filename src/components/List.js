import React, { useState } from "react";

const List = React.memo(
  ({
    id,
    title,
    completed,
    todoData,
    setTodoData,
    provided,
    snapshot,
    handleClick,
  }) => {
    console.log("List Component");

    const handleCompleteChange = (id) => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handleEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = () => {
      let newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.title = editedTitle;
        }
        return data;
      });
      setTodoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditing(false);
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    if (isEditing) {
      return (
        <div className="flex items-center justify-between w-full px-4 py-1 border rounded">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 mr-4 text-gray-500"
              value={editedTitle}
              onChange={handleEditChange}
              autoFocus
            />
          </form>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right text-gray-400 border-2 border-gray-400 rounded hover:text-white hover:bg-gray-200"
              onClick={() => setIsEditing(false)}
              type="button"
            >
              취소
            </button>
            <button
              className="px-4 py-2 mr-2 float-right text-gray-400 border-2 border-gray-400 rounded hover:text-white hover:bg-gray-200"
              type="submit"
              onClick={handleSubmit}
            >
              저장
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              onChange={() => handleCompleteChange(id)}
              defaultChecked={false}
            />{" "}
            <span className={completed ? "line-through" : undefined}>
              {title}
            </span>
          </div>
          <div className="items-center">
            <button
              className="float-right px-4 py-2 text-gray-400 border-2 border-gray-400 rounded hover:text-white hover:bg-gray-200"
              onClick={() => handleClick(id)}
            >
              x
            </button>
            <button
              className="float-right px-4 py-2 mr-2 text-gray-400 border-2 border-gray-400 rounded hover:text-white hover:bg-gray-200"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
