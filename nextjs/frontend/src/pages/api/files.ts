// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { pinata } from "@/utils/pinta-config"
// type Data = {
//   name: string;
// };

// export default function async handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   // res.status(200).json({ name: "John Doe" });

//   try {
//     const data = await req.formData();
//     const file: File | null = data.get("file") as unknown as File;
//     const { cid } = await pinata.upload.public.file(file)
//     const url = await pinata.gateways.public.convert(cid);
//     return NextResponse.json(url, { status: 200 });
//   } catch (e) {
//     console.log(e);
//     return NextApiResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "../../utils/pinta-config"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const { cid } = await pinata.upload.public.file(file)
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
