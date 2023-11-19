import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {

  try {
    const topPosts = await prisma.post.findMany({
        orderBy: {
          views: 'desc',
        },
        take: 5,
        include: { user: true },
      });

    return new NextResponse(JSON.stringify(topPosts, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// CREATE A POST
