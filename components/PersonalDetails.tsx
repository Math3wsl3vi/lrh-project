'use client';

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";

const PersonalDetails = () => {
  // State for form data
  const [formData, setFormData] = useState({
    child: false,
    spouse: false,
    dob: null as string | null,
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    email: "",
    maritalStatus: "",
    unit: "",
    rank: "",
    bloodType: "",
    address: "",
    county: "",
    city: "",
    postalCode: "",
    phone: "",
    secondaryAddress: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
    emergencyContactTelephone: "",
    emergencyEmail: "",
    insuranceProvider: "",
    insuranceNumber: "",
  });

  const [date, setDate] = useState<Date>();
  const [ loading, setLoading ] = useState(false);
  const {toast} = useToast()

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckChange = (checked: boolean | string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: Boolean(checked),
    }));
  };

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormData((prevData) => ({
      ...prevData,
      dob: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
    }));
  };

  // Submit form data
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try {
      console.log("Submitting form data:", formData); // Debugging

      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
         toast({
          description: "Patient data saved successfully.",
        })
        console.log("Patient data saved successfully:", result);
      } else {
        toast({
          description: "Failed to save patient data.",
        })
        console.error("Failed to save patient data:", result);
      }
    } catch (error) {
      toast({
        description: "Error submitting form.",
      })
      console.error("Error submitting form:", error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-6">Personal Details</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-row gap-5 items-center">
          <div className="w-1/3">
            <label>Service Number</label>
            <Input name="serviceNumber" onChange={handleInputChange} className="mt-2" />
          </div>
          <div className="w-1/3">
            <label>Date of Registration</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left mt-2 font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-1/3 flex items-center gap-10 mt-7">
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={(checked) => handleCheckChange(checked, "spouse")}
                checked={formData.spouse}
                id="spouse"
              />
              <label htmlFor="spouse" className="text-sm font-medium leading-none">
                Spouse
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={(checked) => handleCheckChange(checked, "child")}
                checked={formData.child}
                id="child"
              />
              <label htmlFor="child" className="text-sm font-medium leading-none">
                Child
              </label>
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Personal Details Section */}
        <h1 className="text-xl">Personal Details</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">First Name</label>
              <Input name="firstName" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Middle Name</label>
              <Input name="middleName" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Last Name</label>
              <Input name="lastName" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Gender</label>
              <Input name="sex" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Date of Birth</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-2/3 justify-start text-left mt-2 font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Email</label>
              <Input name="email" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Marital Status</label>
              <Input name="maritalStatus" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Unit</label>
              <Input name="unit" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Rank</label>
              <Input name="rank" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Blood Type</label>
              <Input name="bloodType" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3 flex items-center justify-center gap-5">
            <h1>Upload Image</h1>
            <div className="border p-10 w-44 h-44 cursor-pointer flex items-center justify-center rounded-md">
              <Image src="/images/user.png" alt="user" width={50} height={50} />
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Home Address Section */}
        <h1 className="text-xl">Home Address</h1>
        <div className="flex flex-row gap-5 items-center">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Address</label>
              <Input name="address" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">County</label>
              <Input name="county" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">City</label>
              <Input name="city" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Postal Code</label>
              <Input name="postalCode" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Home Phone</label>
              <Input name="phone" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Secondary Address</label>
              <Input name="secondaryAddress" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Emergency Contact Section */}
        <h1 className="text-xl">Emergency Contact</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Full Name</label>
              <Input name="emergencyName" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Relation</label>
              <Input name="emergenceyRelation" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Phone Number</label>
              <Input name="emergencyPhone" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
            <div className="flex w-full items-center">
              <label className="w-1/3">Telephone</label>
              <Input name="emergencyPhone" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Email</label>
              <Input name="emergencyEmail" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
        </div>
        <hr className="mt-7" />

        {/* Insurance Section */}
        <h1 className="text-xl">Insurance Provider</h1>
        <div className="flex flex-row gap-5 items-start">
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Insurance Provider</label>
              <Input name="insuranceProvider" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex w-full items-center">
              <label className="w-1/3">Insurance Provider Number</label>
              <Input name="insuranceNumber" onChange={handleInputChange} className="mt-2 w-2/3" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" className="w-[200px] bg-green-1">
            {loading && <Loader/> || 'Save Patient' }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;