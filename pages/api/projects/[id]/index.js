import dbConnect from "../db/connect";
import Project from "../db/models/morbidre_illustrations";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id || id === "undefined") {
    return;
  }

  if (request.method === "GET") {
    try {
      const project = await Project.findById(id);

      if (!project) {
        return response.status(404).json({ status: "Not found" });
      }

      response.status(200).json(project);
    } catch (error) {
      response.status(500).json({ status: "Internal Server Error" });
      console.log(error);
    }
  }

  if (request.method === "PATCH") {
    const projectToUpdate = await Project.findByIdAndUpdate(id, {
      $set: request.body,
    });
    if (!projectToUpdate) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(projectToUpdate);
  }
  if (request.method === "DELETE") {
    const projectToDelete = await Project.findByIdAndDelete(id);
    if (!projectToDelete) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(projectToDelete);
  }
}
