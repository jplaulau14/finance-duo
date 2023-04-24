import React, { useState } from "react";
import Select from "react-select";
import getSymbolFromCurrency from "currency-symbol-map";
import currencyCodes from "currency-codes";
import { ref, set, push } from "firebase/database";
import { auth, database } from "../firebase";

const accountTypes = [
  { value: "savings", label: "Savings" },
  { value: "business", label: "Business" },
  { value: "general", label: "General" },
  { value: "cash", label: "Cash" },
];

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

const AddAccountForm = () => {
  const [accountType, setAccountType] = useState("");
  const [accountName, setAccountName] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
      userId: user.uid,
    };

    console.log(newAccount);

    try {
      const accountsRef = ref(database, "accounts");
      const newAccountRef = push(accountsRef);
      await set(newAccountRef, newAccount);
      alert("Account added successfully.");
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Error adding account. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="accountType">Account Type</label>
        <Select
          id="accountType"
          value={accountTypes.find((option) => option.value === accountType)}
          onChange={(option) => setAccountType(option?.value || "")}
          options={accountTypes}
        />
      </div>
      <div>
        <label htmlFor="accountName">Account Name</label>
        <input
          id="accountName"
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="initialAmount">Initial Amount</label>
        <input
          id="initialAmount"
          type="number"
          step="0.01"
          value={initialAmount}
          onChange={(e) => setInitialAmount(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="currency">Currency</label>
        <Select
          id="currency"
          value={currencyOptions.find((option) => option.value === currency)}
          onChange={(option) => setCurrency(option?.value || "")}
          options={currencyOptions}
        />
      </div>
      <button type="submit">Add Account</button>
    </form>
  );
};

export default AddAccountForm;
