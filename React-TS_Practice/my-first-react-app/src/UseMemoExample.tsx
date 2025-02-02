import React, { useState, useMemo } from "react";

export function FilterExample() {
  const [search, setSearch] = useState("");
  const [list] = useState(["apple", "banana", "cherry", "date", "grape"]);

  const filteredList = useMemo(() => {
    console.log("Filtering...");
    return list.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, list]);

  return (
    <div>
      <h1>------------UseMemo-----------</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
