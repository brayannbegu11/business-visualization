"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Business } from "@/utils/interfaces";
import { getBusinesses } from "@/services/business.service";
import CreateBusinessModal from "@/components/CreateBusiness";

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBusinesses = async() => {
      try {
        const data = await getBusinesses()
        setBusinesses(data)
        console.log(data)
      }catch(error) {
        console.log('Error obteniendo negocios', error)
      }finally {
        setLoading(false)
      }
    }
    fetchBusinesses()
  }, [])

  const handleEnterBusiness = (id) => {
    // Función para ingresar al negocio
  };

  const handleDeleteBusiness = (id) => {
    // Función para eliminar el negocio
  };

  return (
    <ProtectedRoute>

    
    <div className="flex h-screen bg-primary">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white shadow-lg rounded-l-xl">
        <Topbar />
        {loading ? <div>Loading..</div>
        :

        <main className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Lista de Negocios</h2>
            <CreateBusinessModal/>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-2xl p-4">
            <table className="w-full table-auto text-gray-700 border-black">
              <thead className="bg-gray-600 text-white rounded-md">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Teléfono</th>
                  <th className="px-4 py-3 text-left">Ubicación</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-100">
                    <td className="px-4 py-3">{business.name}</td>
                    <td className="px-4 py-3">{business.phoneNumber}</td>
                    <td className="px-4 py-3">{business.location}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          onClick={() => console.log('Ingresar')}
                          className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
                          >
                          Ingresar
                        </Button>
                        <Button
                          onClick={() => console.log('Eliminar')}
                          className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                          >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      }
        {/* Body */}
      </div>
    </div>
    </ProtectedRoute>
  );
}
