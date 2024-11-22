// components/BusinessTable.tsx
interface businesses {
    id: number,
    name: string,
    user: {
        email: string,
    }
}

export default function BusinessTable({ businesses }: { businesses: businesses[] }) {
    return (
      <div className="overflow-hidden rounded-lg border bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Propietario</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {businesses.map((business) => (
              <tr key={business.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{business.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{business.user?.email}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-900">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  