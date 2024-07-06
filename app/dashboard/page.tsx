import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BalanceDisplay from "@/components/Balance";
import TransactionsDisplay from "@/components/Transactions";
import TransactionsForm from "@/components/TransactionForm";
import { TransactionsContextProvider } from "@/utils/transactionsContext";

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

  return (
    <div className="w-full p-4">
      <TransactionsContextProvider>
        <BalanceDisplay />
        <div className="flex flex-col xl:flex-row gap-4">
          <div>
            <p className="text-2xl font-bold text-center mb-4">
              Recent Transactions
            </p>
            <TransactionsDisplay />
          </div>
          <TransactionsForm />
        </div>
      </TransactionsContextProvider>
    </div>
  );
}
