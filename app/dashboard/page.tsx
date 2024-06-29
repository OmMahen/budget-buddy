import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BalanceDisplay from "@/components/Balance";
import TransactionsDisplay from "@/components/Transactions";
import TransactionsForm from "@/components/TransactionForm";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data } = await supabase
    .from("transactions")
    .select("date, amount, description, categories(type)")
    .eq("user_id", user.id);

  let balance = 0;
  data?.forEach((transaction: any) => {
    if (transaction.categories.type === "income") {
      balance += transaction.amount;
    } else {
      balance -= transaction.amount;
    }
  });

  return (
    <div className="w-full p-4">
      <BalanceDisplay balance={balance} />
      <div className="flex flex-col xl:flex-row gap-4">
        <TransactionsDisplay transactions={data} />
        <TransactionsForm />
      </div>
    </div>
  );
}
