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

  // 🔥 Fetch from backend
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

  // 🔥 Drag handler
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) return;

    const movedItem = data[sourceCol][source.index];

    // UI update
    const newData = { ...data };
    newData[sourceCol].splice(source.index, 1);
    newData[destCol].splice(destination.index, 0, movedItem);

    setData(newData);

    // Backend update
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
    return <p className="text-gray-400">Loading pipeline...</p>;
  }

  return (
    <div>
      {/* <h2 className="text-lg font-semibold mb-6">Client Pipeline</h2> */}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([key, title]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="
                    min-h-[300px] p-4 rounded-xl
                    bg-black/40 border border-white/10
                  "
                >
                  {/* Column Title */}
                  <h3 className="text-sm text-gray-400 mb-3">{title}</h3>

                  {/* Items */}
                  {data[key].length === 0 && (
                    <p className="text-xs text-gray-500">No items</p>
                  )}

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
                            bg-white/10 p-3 mb-3 rounded-lg
                            hover:bg-blue-500/20
                            transition cursor-grab
                          "
                        >
                          <p className="font-medium text-sm">{item.name}</p>

                          <p className="text-xs text-gray-400">{item.email}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
