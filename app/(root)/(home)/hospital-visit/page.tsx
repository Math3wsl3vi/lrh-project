"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { userData } from "./../../../../lib/data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/UseStore";

interface User {
  id: number;
  name: string;
  unit: string;
  rank: string;
  phone: string;
  sex: string;
  dob: string;
}

const HospitalVisit = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<User[]>([]);
  const {selectedUser, setSelectedUser} = useUserStore()
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filter user data based on the query
    if (value.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = userData.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.id.toString().includes(value)
      );
      setFilteredResults(results);
    }
  };

  const handleSelect = (user: User) => {
    setQuery(user.name);
    setSelectedUser(user);
    setFilteredResults([]);
  };
  const handleContinue = () => {
    if (selectedUser) {
      setIsOpen(true);
    } else {
      alert("Please select a user before continuing.");
    }
  };

  return (
    <div className="h-screen w-full font-poppins flex justify-center p-2 overflow-scroll">
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl text-center">
          Welcome to Lanet Regional Hospital
        </h1>
        <p className="text-center text-gray-400 mt-3">
          Enter the patients Service Number/Name
        </p>
        <div className="mt-10 flex justify-center items-center gap-10 flex-col">
          <Input
            placeholder="Enter Service Number"
            value={query}
            onChange={handleSearch}
            className="font-poppins text-3xl focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
          />
          {filteredResults.length > 0 && (
            <div className="w-full md:w-3/4 bg-white border rounded-md overflow-y-auto">
              {filteredResults.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelect(user)}
                  className="p-2 cursor-pointer flex flex-row gap-2 items-center justify-between"
                >
                  <p>{user.name}</p>
                  <p>{user.id}</p>
                </div>
              ))}
            </div>
          )}
          <Button onClick={handleContinue} className="w-1/2 bg-green-1">
            Continue
          </Button>
        </div>
        <div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="font-poppins">
              <h1 className="font-poppins text-center mb-5 text-lg">
                welcome to Lanet Regional Hospital{" "}
                <span className="font-semibold">
                  {selectedUser?.rank} {selectedUser?.name}
                </span>
              </h1>
              <div className="flex flex-col gap-5">
                <div className="gap-2 flex flex-col">
                  <label htmlFor="service">Service Number</label>
                  <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
                    {selectedUser?.id}{" "}
                  </div>
                </div>
                <div className="flex flex-row gap-3 w-full">
                  <div className="gap-2 flex flex-col w-1/2">
                    <label htmlFor="service">Sex</label>
                    <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
                      {selectedUser?.sex}{" "}
                    </div>
                  </div>
                  <div className="gap-2 flex flex-col w-1/2">
                    <label htmlFor="service">Date of Birth</label>
                    <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
                      {selectedUser?.dob}{" "}
                    </div>
                  </div>
                </div>
                <div className="gap-2 flex flex-col">
                  <label htmlFor="service">Rank</label>
                  <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
                    {selectedUser?.rank}{" "}
                  </div>
                </div>
                <div className="gap-2 flex flex-col">
                  <label htmlFor="service">Unit</label>
                  <div className="focus-visible:ring-0 focus-visible:ring-offset-0 border p-2 rounded-md">
                    {selectedUser?.unit}{" "}
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Button
                  onClick={() =>
                    router.push(
                      `/triage?user=${encodeURIComponent(
                        JSON.stringify(selectedUser)
                      )}`
                    )
                  }
                  className="bg-green-1"
                >
                  Continue to Triage
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HospitalVisit;
