"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(category)}
          className="transition-all duration-200"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
