import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "products.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const products = await request.json();
    const filePath = path.join(process.cwd(), "src", "data", "products.json");
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, message: "Products updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
