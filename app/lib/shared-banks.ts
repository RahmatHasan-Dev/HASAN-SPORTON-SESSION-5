// Shared banks data - use this for both API and server components
export interface Bank {
  _id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export const banks: Bank[] = [
  {
    _id: "bank-1",
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "PT Sporton Indonesia",
    logo: "/images/logo-bca.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "bank-2",
    bankName: "Mandiri",
    accountNumber: "9876543210",
    accountName: "PT Sporton Indonesia",
    logo: "/images/logo-mandiri.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "bank-3",
    bankName: "BNI",
    accountNumber: "1122334455",
    accountName: "PT Sporton Indonesia",
    logo: "/images/logo-bni.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function getBanks(): Bank[] {
  return banks;
}

export function getBankById(id: string): Bank | undefined {
  return banks.find((b) => b._id === id);
}

export function createBank(data: Omit<Bank, "_id" | "createdAt" | "updatedAt">): Bank {
  const newBank: Bank = {
    _id: `bank-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  banks.push(newBank);
  return newBank;
}

export function updateBank(id: string, data: Partial<Omit<Bank, "_id" | "createdAt">>): Bank | null {
  const index = banks.findIndex((b) => b._id === id);
  if (index === -1) return null;
  
  banks[index] = {
    ...banks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return banks[index];
}

export function deleteBank(id: string): boolean {
  const index = banks.findIndex((b) => b._id === id);
  if (index === -1) return false;
  banks.splice(index, 1);
  return true;
}

