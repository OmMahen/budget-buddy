import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { categoryId, amount, description } = await request.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("transactions")
    .insert({ user_id: user?.id, category_id: categoryId, amount, description })
    .select("transaction_id, date, amount, description, categories(type)");

  if (error) {
    return NextResponse.json(
      { status: "Error", message: "Couldn't create transactions" },
      { status: 403 }
    );
  }

  return NextResponse.json(data);
}
