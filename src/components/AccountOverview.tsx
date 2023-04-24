import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { ref, onValue, off } from "firebase/database";
import AddAccountForm from "./AddAccountForm";

const AccountOverview = () => {
  const [accounts, setAccounts] = useState<
    { id: string; name: string; amount: number; currencySymbol: string}[]
  >([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const accountsRef = ref(database, "accounts");
    const listener = onValue(accountsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
            name: data[key].accountName,
            amount: data[key].initialAmount / 100,
          }))
          .filter((account) => account.userId === auth.currentUser?.uid);
        setAccounts(formattedData);
      }
    });

    return () => {
      off(accountsRef, "value", listener);
    };
  }, []);

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
          <div key={account.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{account.name}</h3>
            <p>{account.currencySymbol ?? ""}{(account.amount ?? 0).toFixed(2)}</p>
          </div>
        ))}
        <button onClick={handleAddAccount} className="p-4 bg-white rounded shadow">+</button>
      </div>
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow">
            <button onClick={handleCancel} className="float-right">X</button>
            <AddAccountForm />
          </div>
        </div>
      )}
    </>
  );
};

export default AccountOverview;
