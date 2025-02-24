import React, { useState } from "react";
import { useSelector } from "react-redux";

// Icons
import { Ellipsis, Search, Square } from "lucide-react";
import no_result from "/icons/no_result.svg";
import editIcon from "/icons/edit.svg";
import deleteIcon from "/icons/delete.svg";

function SearchPage() {
  const tasksData = useSelector((state) => state.tasks.tasksData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasksData.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" pt-9">
      <div className="relative bg-background-secondary rounded-xl">
        <label
          htmlFor="search"
          className="absolute top-1/2 -translate-y-1/2 left-3"
        >
          <Search size={18} color="#007FFF" className="" />
        </label>
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Find your tasks"
          className="focus:outline-textColor-accent bg-transparent rounded-xl w-full pl-10 pr-3 py-3 "
        />
      </div>

      <section
        className={`${
          filteredTasks.length === 0 && "justify-center items-center"
        } mt-7 flex flex-col rounded-xl gap-4 h-[calc(76vh-90px)] b-yellow-400 overflow-y-auto`}
      >
        {filteredTasks.length === 0 ? (
          <div className="text-gray-500 flex flex-col gap-3">
            <img src={no_result} alt="" className="w-20" />
            <p className="text-textColor-secondary">No result found.</p>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            return (
              <div
                key={index}
                className="bg-background-secondary rounded-2xl p-4 grid grid-cols-[0.5fr_4fr_1fr] gap-5"
              >
                <button type="button" className="self-start">
                  <Square size={26} className="text-textColor-secondary" />
                </button>

                <div className="flex flex-col gap-3">
                  <h1 className="font-medium">{task.title}</h1>
                  <p className="text-sm hyphens-auto text-textColor-secondary">
                    {task.note}
                  </p>
                </div>

                <div className="flex flex-col justify-center items-center self-start justify-self-end gap-3">
                  <button
                    onClick={() => toggleOption(index)}
                    type="button"
                    className="self-start "
                  >
                    <Ellipsis size={26} className="text-textColor-secondary" />
                  </button>

                  {/* {selectedTask === index && (
                    <div className="flex flex-col gap-5">
                      <button
                        type="button"
                        onClick={() => dispatch(toggleModalEdit())}
                      >
                        <img src={editIcon} alt="Edit" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteTask(index)}
                      >
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                    </div>
                  )} */}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default SearchPage;
