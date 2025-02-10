export async function GET() {
    return Response.json({
      sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    });
  }
  