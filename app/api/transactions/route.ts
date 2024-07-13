import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { categoryId, amount, description } = await request.json();

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const offset = (page - 1) * limit;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { count } = await supabase
    .from("transactions")
    .select("transaction_id", { count: "exact" })
    .eq("user_id", user?.id);

  const { data, error } = await supabase
    .from("transactions")
    .select("transaction_id, date, amount, description, categories(type)")
    .eq("user_id", user?.id)
    .order("date", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    return NextResponse.json({ message: "Error", error: error.message });
  }

  return NextResponse.json({
    message: "Success",
    total: count,
    transactions: data,
  });
}
