import { useEffect, useState } from "react";
import api from "../../../api/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import toast from "react-hot-toast";

const columns = {
  new: "New Leads",
  contacted: "Contacted",
  closed: "Closed",
};

export default function KanbanBoard() {
  const [data, setData] = useState({
    new: [],
    contacted: [],
    closed: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");

      const grouped = {
        new: [],
        contacted: [],
        closed: [],
      };

      res.data.forEach((c) => {
        const status = c.status || "new";
        if (grouped[status]) {
          grouped[status].push(c);
        }
      });

      setData(grouped);
    } catch {
      toast.error("Failed to load pipeline ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) return;

    const movedItem = data[sourceCol][source.index];

    const newData = { ...data };
    newData[sourceCol].splice(source.index, 1);
    newData[destCol].splice(destination.index, 0, movedItem);

    setData(newData);

    try {
      await api.put(`/contact/${movedItem._id}`, {
        status: destCol,
      });
      toast.success("Moved successfully ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  if (loading) {
    return <p className="text-gray-400 text-center">Loading pipeline...</p>;
  }

  return (
    <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-0">
      <DragDropContext onDragEnd={onDragEnd}>
        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-4 h-full">
          {Object.entries(columns).map(([key, title]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="
                  flex flex-col
                  h-full
                  max-h-[100%]
                  p-4 rounded-2xl
                  bg-gradient-to-b from-white/5 to-white/0
                  border border-white/10
                "
                >
                  {/* TITLE */}
                  <h3 className="text-sm text-gray-300 mb-3">{title}</h3>

                  {/* 🔥 SCROLL AREA (REAL FIX) */}
                  <div className="flex-1 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-white/20">
                    {data[key].map((item, index) => (
                      <Draggable
                        key={item._id}
                        draggableId={item._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="
                            p-3 rounded-xl
                            bg-white/10
                            border border-white/10
                            hover:bg-blue-500/20
                            transition
                          "
                          >
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-400">
                              {item.email}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
