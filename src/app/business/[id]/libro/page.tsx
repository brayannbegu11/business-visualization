"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Libro() {
  const [records, setRecords] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");

  const handleAddRecord = () => {
    if (!description || !category || !value) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const newRecord = {
      description,
      category,
      value: parseFloat(value),
      date: new Date().toLocaleDateString(),
    };
    setRecords([...records, newRecord]);
    setDescription("");
    setCategory("");
    setValue("");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Agregar Registro al Libro</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddRecord();
        }}
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Descripción
          </label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción del registro"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Categoría
          </label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría (VENTA, GASTO, etc.)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="value">
            Valor
          </label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor"
          />
        </div>
        <Button type="submit" className="bg-blue-500 text-white">
          Agregar Registro
        </Button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Registros del Libro</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Fecha</th>
            <th className="border border-gray-200 p-2">Descripción</th>
            <th className="border border-gray-200 p-2">Categoría</th>
            <th className="border border-gray-200 p-2">Valor</th>
            <th className="border border-gray-200 p-2">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td className="border border-gray-200 p-2">{record.date}</td>
              <td className="border border-gray-200 p-2">{record.description}</td>
              <td className="border border-gray-200 p-2">{record.category}</td>
              <td className="border border-gray-200 p-2">${record.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}