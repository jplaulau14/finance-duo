import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AddAccountForm from "./AddAccountForm";

const AccountOverview = () => {
  const [accounts, setAccounts] = useState<
    { id: string; name: string; amount: number; currencySymbol: string}[]
  >([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (auth.currentUser) {
        const accountsRef = collection(db, "accounts");
        const q = query(accountsRef, where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const formattedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          name: doc.data().accountName,
          amount: doc.data().initialAmount / 100,
          currencySymbol: doc.data().currencySymbol,
        }));
        setAccounts(formattedData);
      }
    };
    fetchAccounts();
  }, [auth.currentUser]);

  const handleAddAccount = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="flex space-x-4">
        {accounts.map((account) => (
          <div key={account.id} className="p-4 rounded shadow">
            <h3 className="text-lg font-bold">{account.name}</h3>
            <p>{account.currencySymbol ?? ""}{(account.amount ?? 0).toFixed(2)}</p>
          </div>
        ))}
        <button onClick={handleAddAccount} className="p-4 bg-midnight rounded shadow">+</button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-midnight p-4 rounded shadow">
            <button onClick={handleCancel} className="float-right">X</button>
            <AddAccountForm show={showForm} onClose={handleCancel} />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountOverview;
