import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ message: "Forbidden" }, { status: 403 });

  const { data, error } = await supabase
    .from("balances")
    .select()
    .eq("user_id", user?.id);

  if (error) {
    return Response.json({ message: "Error", error: error.message });
  }

  return Response.json({ message: "Success", data });
}

export async function PUT(request: Request) {
  const supabase = createClient();
  const { updatedBalance } = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("balances")
    .update({ balance: updatedBalance, last_updated: new Date() })
    .eq("user_id", user?.id);

  if (error) {
    return Response.json(
      { status: "Error", message: "Couldn't update user's balance" },
      { status: 502 }
    );
  }

  return Response.json({
    status: "success",
    message: "User's balance has been updated",
  });
}
