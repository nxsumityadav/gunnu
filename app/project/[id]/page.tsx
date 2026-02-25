import { redirect } from "next/navigation";
import { getProject } from "@/lib/db-helpers";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    redirect("/");
  }

  if (project.status === "INTERVIEWING") {
    redirect(`/project/${id}/interview`);
  }

  if (project.status === "RESEARCHING") {
    redirect(`/project/${id}/research`);
  }

  redirect(`/project/${id}/report`);
}
