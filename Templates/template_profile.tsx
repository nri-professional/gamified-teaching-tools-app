"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function UserProfile(): JSX.Element {
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const classes = [
    {
      id: 1,
      name: "Geometry - Unit 1: Angles & Proofs",
      fundamentals: 5,
      formulas: 8,
      sections: [
        "Basic Geometry Concepts",
        "Types of Angles",
        "Congruent Triangles",
        "Proof Structures",
        "Applications in Polygons",
      ],
    },
    {
      id: 2,
      name: "Algebra II - Quadratic Functions",
      fundamentals: 3,
      formulas: 5,
      sections: [
        "Understanding Parabolas",
        "Vertex Form & Transformations",
        "Factoring Quadratics",
        "Quadratic Formula",
        "Graphical Applications",
      ],
    },
  ];

  if (selectedClass) {
    const currentSectionIndex = 2; // Example: The user is currently in section 3

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-4">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-4 text-gray-700 hover:text-purple-700"
            onClick={() => setSelectedClass(null)}
          >
            <ArrowLeft size={18} /> Back to Profile
          </Button>

          <Card className="shadow-xl bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedClass.name}</h2>
              <p className="text-gray-600 mb-6">
                Fundamentals: {selectedClass.fundamentals} | Formulas: {selectedClass.formulas}
              </p>

              <h3 className="text-lg font-semibold text-gray-700 mb-3">Class Map</h3>
              <div className="relative flex flex-col items-start space-y-4 pl-6 border-l-4 border-purple-400">
                {selectedClass.sections.map((section: string, index: number) => (
                  <div key={index} className="relative">
                    <div
                      className={`absolute -left-3 top-1 w-4 h-4 rounded-full border-2 ${
                        index === currentSectionIndex
                          ? "bg-purple-600 border-purple-600"
                          : "bg-white border-purple-400"
                      }`}
                    ></div>
                    <p
                      className={`text-gray-700 ${
                        index === currentSectionIndex ? "font-bold text-purple-700" : ""
                      }`}
                    >
                      {index === currentSectionIndex ? `➡️ You Are Here: ${section}` : section}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center py-10 px-4">
      <motion.h1
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        StudyMate User Profile
      </motion.h1>

      <Card className="w-full max-w-md shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-purple-300 shadow-md"
            />

            <h2 className="text-xl font-semibold text-gray-700">Alex Johnson</h2>
            <p className="text-sm text-gray-500">Student | Geometry & Algebra Enthusiast</p>

            <div className="w-full mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Your Active Classes</h3>
              <div className="grid grid-cols-1 gap-3">
                {classes.map((cls) => (
                  <Card
                    key={cls.id}
                    className="p-4 border-l-4 border-purple-500 hover:bg-purple-50 cursor-pointer transition"
                    onClick={() => setSelectedClass(cls)}
                  >
                    <h4 className="font-medium text-gray-700">{cls.name}</h4>
                    <p className="text-sm text-gray-500">
                      {cls.fundamentals} connected fundamentals | {cls.formulas} formulas
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
