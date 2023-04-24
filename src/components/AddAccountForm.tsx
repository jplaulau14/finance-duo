import React, { useState, FormEvent } from "react";
import Select from "react-select";
import getSymbolFromCurrency from "currency-symbol-map";
import currencyCodes from "currency-codes";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

const accountTypes = [
  { value: "savings", label: "Savings" },
  { value: "business", label: "Business" },
  { value: "general", label: "General" },
  { value: "cash", label: "Cash" },
];

type AddAccountFormProps = {
  show: boolean;
  onClose: () => void;
};

const currencyOptions = currencyCodes
  .codes()
  .map((code) => {
    const currencyData = currencyCodes.code(code);
    return currencyData
      ? {
          value: code,
          label: `${code} (${getSymbolFromCurrency(code) || "?"})`,
        }
      : null;
  })
  .filter(
    (option): option is { value: string; label: string } => option !== null
  );

const AddAccountForm: React.FC<AddAccountFormProps> = ({ show, onClose }) => {
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in.");
      return;
    }

    const newAccount = {
      accountType,
      accountName,
      initialAmount: Math.round(parseFloat(initialAmount) * 100),
      currency,
      currencySymbol: getSymbolFromCurrency(currency) || "",
      userId: user.uid,
    };

    console.log(newAccount);

    try {
      const accountsRef = collection(db, "accounts");
      await addDoc(accountsRef, newAccount);
      alert("Account added successfully.");
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Error adding account. Please try again.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    show && (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
        onClick={handleClose}
      >
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl px-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-xl font-bold"
          >
            ×
          </button>
          <h1 className="text-3xl mb-4 text-center text-AppleGreen">
            Add Account
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col mb-4">
              <label htmlFor="accountType" className="mb-1 text-black">
                Account Type
              </label>
              <Select
                id="accountType"
                value={accountTypes.find(
                  (option) => option.value === accountType
                )}
                onChange={(option) => setAccountType(option?.value || "")}
                options={accountTypes}
                className="w-full text-black"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="accountName" className="mb-1 text-black">
                Account Name
              </label>
              <input
                id="accountName"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="initialAmount" className="mb-1 text-black">
                Initial Amount
              </label>
              <input
                id="initialAmount"
                type="number"
                step="0.01"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                className="border border-gray-300 p-2 rounded text-black"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="currency" className="mb-1 text-black">
                Currency
              </label>
              <Select
                id="currency"
                value={currencyOptions.find(
                  (option) => option.value === currency
                )}
                onChange={(option) => setCurrency(option?.value || "")}
                options={currencyOptions}
                className="w-full text-black"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-AppleGreen text-white py-2 px-4 rounded-md hover:bg-Pear transition-colors"
              >
                Add Account
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddAccountForm;
