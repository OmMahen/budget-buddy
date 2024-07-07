"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Label,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { createClient } from "@/utils/supabase/client";
import { useTransactionsContext } from "@/utils/transactionsContext";

export default function TransactionsForm() {
  const supabase = createClient();
  const { transactions, setTransactions } = useTransactionsContext();

  const [categories, setCategories] = useState<any>([]);
  const [filteredCategories, setFilteredCategories] = useState<any>([]);
  const [selectedType, setSelectedType] = useState<any>("income");

  const [categoryId, setCategoryId] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  const [isLoading, setLoading] = useState<Boolean>(false);

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

  useEffect(() => {
    setCategoryId(filteredCategories[0]?.category_id);
  }, [filteredCategories]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId, amount, description }),
    });
    if (response.ok) {
      const newTransaction = (await response.json())[0];
      setTransactions([...transactions, newTransaction]);
    }
    setLoading(false);
  };

  return (
    <Card className="xl:flex-1">
      <form onSubmit={handleSubmit}>
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
            <Select
              id="category"
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              {filteredCategories.map((category: any) => (
                <option key={category.category_id} value={category.category_id}>
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
          <TextInput
            id="amount"
            type="number"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="description" value="Transaction Description" />
          </div>
          <Textarea
            id="description"
            placeholder="Leave a description..."
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>
        <div>
          {isLoading ? (
            <Button className="w-full" color="gray" type="submit" disabled>
              <div className="flex gap-2 items-center justify-center">
                <Spinner size="md" />
                <p>Adding Transaction...</p>
              </div>
            </Button>
          ) : (
            <Button className="w-full" color="gray" type="submit">
              Add Transaction
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
