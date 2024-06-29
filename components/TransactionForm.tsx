"use client";
import { useState, useEffect } from "react";
import { Card, Label, Select, TextInput, Textarea } from "flowbite-react";
import { createClient } from "@/utils/supabase/client";

export default function TransactionsForm() {
  const supabase = createClient();
  const [categories, setCategories] = useState<any>([]);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<any>("income");

  useEffect(() => {
    async function fetchCategories() {
      const { data: categories } = await supabase.from("categories").select();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedType) {
      setFilteredCategories(
        categories.filter((category: any) => category.type === selectedType)
      );
    } else {
      setFilteredCategories([]);
    }
  }, [selectedType, categories]);

  const handleTypeChange = (event: any) => {
    setSelectedType(event.target.value);
  };

  return (
    <Card className="xl:flex-1">
      <form action="">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Type" />
            </div>
            <Select id="type" required onChange={handleTypeChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <Select id="category" required>
              {filteredCategories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="amount" value="Transaction Amount" />
          </div>
          <TextInput id="amount" type="number" required />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Transaction Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Leave a description..."
            required
            rows={4}
          />
        </div>
      </form>
    </Card>
  );
}
