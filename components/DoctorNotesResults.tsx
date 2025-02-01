"use client";
import { useDocNotesStore } from "@/stores/MedicationStore";
import React from "react";

const DoctorNotesResults = () => {
  const { docNotes } = useDocNotesStore();
  return (
    <div className="flex gap-5 w-full">
      <div className="w-1/2">
        <label className="text-xl">Prescribed Medictation</label>
        <div className="mt-3 border rounded-md min-h-44 p-2">
          {docNotes.medication?.split(",").map((med, index) => (
            <div key={index}>{med.trim()}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorNotesResults;
