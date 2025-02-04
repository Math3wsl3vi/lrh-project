"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Doctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization:"",
    phone:"",
    email:"",
    dob:"",
    homeAddress:"",
    })
  const [isOpen, setIsOpen] = useState(false);

  // input changes
  const handleInputChanges = (e:React.ChangeEvent<HTMLInputElement>) => {
    
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Doctors</h1>
      <div>
        <div className="grid grid-cols-3 mb-5">
          <div className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
            <h1>Doctor List</h1>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1"
          >
            <h1>Register a Doctor</h1>
          </div>
          <div className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
            <h1>Appointments</h1>
          </div>
        </div>
      </div>

      {/* Dialog is now outside to properly manage state */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <form>
            <h1 className="text-lg font-bold mb-3">Register a Doctor</h1>
            <div className="flex flex-row justify-between gap-10">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="doctorName">Name</label>
                  <Input name="name" />
                </div>
                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Input name="phone" />
                </div>
                <div>
                  <label htmlFor="specialization">Specialization</label>
                  <Input name="specialization" />
                </div>
                {/* <div>
                  <label htmlFor="hospitalName">Hospital Name</label>
                  <Input name="hospitalName" />
                </div> */}
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="nationalId">National Id</label>
                  <Input name="nationalId" />
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <Input name="email" />
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <Input name="homeAddress" />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <Input name="dob" />
                </div>
              </div>
            </div>
            <div className="w-full mt-5 flex items-center">
              <Button className="w-full bg-green-1" onClick={() => setIsOpen(false)}>
                Save Doctor
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Doctor;
