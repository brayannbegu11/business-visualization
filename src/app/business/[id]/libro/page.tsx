"use client";
import { useEffect, useState } from "react";
import { TransactionForm } from "@/components/business/TransactionForm";
import { TransactionsTable } from "@/components/business/TransactionTable";
import { useParams } from "next/navigation";
import { getTransactions, updateTransaction } from "@/services/transactions.service";
import { BookOpenIcon, CreditCardIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EditTransactionDialog from "@/components/business/EditTransactionDialog";

export default function Libro() {
    const [transactions, setTransactions] = useState([])
    const {id: businessId} = useParams()
    const [selectedTransaction, setSelectedTransaction] = useState(null)

    const menuItems = [
      { name: "Libro", href: `/business/${businessId}/libro`, icon: BookOpenIcon },
      { name: "Datafono", href: `/business/${businessId}/datafono`, icon: CreditCardIcon },
      { name: "Dashboard", href: "/dashboard", icon: ChartBarIcon },
    ];
    async function fetchTransactions() {
      const data = await getTransactions(businessId)
      console.log(data)
      setTransactions(data.data)
    }
    useEffect(() => {

      fetchTransactions()
    }, [businessId])
  
    const handleTransactionCreated = (newTransaction) => {
      setTransactions([...transactions, newTransaction])
    }
  
    const handleEditTransaction = async (updatedTransaction) => {
      try {
        await updateTransaction(updatedTransaction)
        await fetchTransactions()
        setSelectedTransaction(null)
        alert('Edit transaction')
        
      } catch (error) {
        console.log('Handel Edit', error)
      }
    }
  
    return (
      <ProtectedRoute>

      <div className="flex h-screen">
        <Sidebar menuItems={menuItems} />
        <div className="flex-1 flex flex-col bg-white shadow-lg rounded-l-xl">
          <Topbar businessName="Test"/>
        <main className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Libro de contabilidad</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TransactionForm 
              businessId={businessId} 
              onTransactionCreated={handleTransactionCreated} 
            />
            
            <TransactionsTable 
              transactions={transactions}
              onEditTransaction={setSelectedTransaction}
            />
          </div>
        </main>
        </div>
        {selectedTransaction && (
        <EditTransactionDialog
          transaction={selectedTransaction}
          onUpdate={handleEditTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
      </div>
      </ProtectedRoute>
    )
  }